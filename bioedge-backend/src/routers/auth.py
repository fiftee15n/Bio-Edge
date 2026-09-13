import re
import random
import time
from typing import Optional
from fastapi import APIRouter, Header, Response, status
from pydantic import BaseModel, EmailStr

from src.models.user_model import UserModel
from src.models.verification_model import VerificationModel
from src.utils.security import hash_password, verify_password, create_access_token, verify_access_token
from src.utils.email_service import EmailService

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

EMAIL_REGEX = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")

# Pydantic Request Schemas
class RegisterRequest(BaseModel):
    name: str
    email: str
    password: Optional[str] = None
    confirmPassword: Optional[str] = None
    phone: Optional[str] = ""
    institution: Optional[str] = ""
    examYear: Optional[str] = ""
    targetCourse: Optional[str] = ""

class VerifyEmailRequest(BaseModel):
    email: str
    code: str

class ResendCodeRequest(BaseModel):
    email: str

class LoginRequest(BaseModel):
    email: str
    password: Optional[str] = None
    role: Optional[str] = None

class GoogleAuthRequest(BaseModel):
    email: str
    name: Optional[str] = None
    googleId: Optional[str] = None
    avatar: Optional[str] = None


@router.post("/register")
def register(payload: RegisterRequest, response: Response):
    """
    Register a new student user. Hashes password with bcrypt and sends 6-digit email OTP.
    """
    name = (payload.name or "").strip()
    email = (payload.email or "").strip().lower()
    password = payload.password or ""
    confirm_password = payload.confirmPassword

    if not name:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"success": False, "message": "Full name is required."}

    if not email or not EMAIL_REGEX.match(email):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"success": False, "message": "Please provide a valid email address."}

    if not password or len(password) < 6:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"success": False, "message": "Password must be at least 6 characters long."}

    if confirm_password and password != confirm_password:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"success": False, "message": "Password confirmation does not match."}

    # Check if user exists
    existing_user = UserModel.find_by_email(email)
    if existing_user:
        if existing_user.get("is_verified", 0):
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {
                "success": False,
                "message": "An account with this email address already exists. Please sign in instead."
            }
        else:
            # User exists but is unverified: issue fresh 6-digit OTP code
            code = f"{random.randint(100000, 999999)}"
            VerificationModel.save_code(email, code, expires_in_minutes=10)
            EmailService.send_verification_code(email, code, existing_user.get("name", "Student"))
            
            response.status_code = status.HTTP_200_OK
            return {
                "success": True,
                "isNewUser": False,
                "requiresVerification": True,
                "email": email,
                "verificationCode": code,
                "message": "Your account is pending verification. A new 6-digit verification code has been sent to your email."
            }

    # Securely hash password with bcrypt
    pw_hash = hash_password(password)

    # Exam year determination fallback
    exam_year = payload.examYear
    if not exam_year:
        exam_year = "SSC 2027" if payload.targetCourse == "ssc-2027" else "HSC 2026"

    # Create unverified student in database
    new_user = UserModel.create(
        name=name,
        email=email,
        password_hash=pw_hash,
        role="student",
        phone=payload.phone or "",
        institution=payload.institution or "",
        exam_year=exam_year,
        is_verified=0
    )

    # Generate 6-digit OTP code (10 min expiry)
    code = f"{random.randint(100000, 999999)}"
    VerificationModel.save_code(email, code, expires_in_minutes=10)
    EmailService.send_verification_code(email, code, new_user["name"])

    response.status_code = status.HTTP_201_CREATED
    return {
        "success": True,
        "isNewUser": True,
        "requiresVerification": True,
        "email": email,
        "verificationCode": code,
        "message": "Account created! Please enter the 6-digit verification code sent to your email."
    }


@router.post("/verify-email")
def verify_email(payload: VerifyEmailRequest, response: Response):
    """
    Verify 6-digit OTP code, activate account, and issue JWT access token.
    """
    email = (payload.email or "").strip().lower()
    code = str(payload.code or "").strip()

    if not email or not code:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"success": False, "message": "Email and 6-digit verification code are required."}

    record = VerificationModel.get_active_code(email)
    if not record:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "success": False,
            "message": "No active verification code found for this email. Please request a new code."
        }

    now_ms = int(time.time() * 1000)

    # Check expiration
    if now_ms > record["expires_at"]:
        VerificationModel.delete_code(email)
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "success": False,
            "message": "Verification code has expired. Please click 'Resend Code' to get a new code."
        }

    # Abuse protection: max 5 attempts
    if record["attempts"] >= 5:
        VerificationModel.delete_code(email)
        response.status_code = status.HTTP_429_TOO_MANY_REQUESTS
        return {
            "success": False,
            "message": "Too many incorrect attempts. For your security, this code was invalidated. Please request a new code."
        }

    # Verify code match
    if record["code"] != code:
        updated = VerificationModel.increment_attempts(email)
        attempts = updated["attempts"] if updated else 5
        remaining_attempts = max(0, 5 - attempts)

        if attempts >= 5:
            VerificationModel.delete_code(email)
            response.status_code = status.HTTP_429_TOO_MANY_REQUESTS
            return {
                "success": False,
                "message": "Maximum verification attempts (5) exceeded. This code has been invalidated. Please click 'Resend code' to get a new code."
            }

        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "success": False,
            "message": f"Incorrect verification code. {remaining_attempts} attempts remaining."
        }

    # Code is valid! Mark user verified and delete code
    user = UserModel.update_verification(email, is_verified=1)
    VerificationModel.delete_code(email)

    if not user:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"success": False, "message": "User not found."}

    sanitized = UserModel.sanitize(user)
    token = create_access_token({
        "id": user["id"],
        "email": user["email"],
        "role": user.get("role", "student"),
        "name": user["name"]
    })

    return {
        "success": True,
        "message": "Email verified successfully! Welcome to Bio Edge.",
        "token": token,
        "user": sanitized
    }


@router.post("/resend-code")
def resend_code(payload: ResendCodeRequest, response: Response):
    """
    Resend a 6-digit OTP code with 60-second cooldown protection.
    """
    email = (payload.email or "").strip().lower()

    if not email:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"success": False, "message": "Email address is required."}

    user = UserModel.find_by_email(email)
    if not user:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"success": False, "message": "No registered user found with this email."}

    if user.get("is_verified", 0):
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"success": False, "message": "This email is already verified. Please sign in."}

    existing_record = VerificationModel.get_active_code(email)
    if existing_record and existing_record["attempts"] < 5:
        now_ms = int(time.time() * 1000)
        time_since_created = now_ms - existing_record["created_at"]
        cooldown_ms = 60 * 1000  # 60s cooldown

        if time_since_created < cooldown_ms:
            wait_seconds = int((cooldown_ms - time_since_created) / 1000) + 1
            response.status_code = status.HTTP_429_TOO_MANY_REQUESTS
            return {
                "success": False,
                "message": f"Please wait {wait_seconds} seconds before requesting a new code."
            }

    # Generate fresh 6-digit code with 10-minute expiry
    new_code = f"{random.randint(100000, 999999)}"
    VerificationModel.save_code(email, new_code, expires_in_minutes=10)
    EmailService.send_verification_code(email, new_code, user.get("name", "Student"))

    return {
        "success": True,
        "verificationCode": new_code,
        "message": "A new 6-digit verification code has been sent to your email."
    }


@router.post("/login")
def login(payload: LoginRequest, response: Response):
    """
    Authenticate user using email & password, verifying password hash and email verification status.
    """
    email = (payload.email or "").strip().lower()
    password = payload.password or ""
    requested_role = payload.role

    if not email or not password:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"success": False, "message": "Please provide both email and password."}

    user = UserModel.find_by_email(email)
    if not user:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"success": False, "message": "Invalid email address or password."}

    # Verify role if requested
    if requested_role and user.get("role") != requested_role:
        response.status_code = status.HTTP_403_FORBIDDEN
        return {"success": False, "message": f"This account does not have {requested_role} privileges."}

    # Check password
    if not verify_password(password, user.get("password_hash") or ""):
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"success": False, "message": "Invalid email address or password."}

    # Check verification status
    if not user.get("is_verified", 0):
        code = f"{random.randint(100000, 999999)}"
        VerificationModel.save_code(email, code, expires_in_minutes=10)
        EmailService.send_verification_code(email, code, user.get("name", "Student"))

        response.status_code = status.HTTP_403_FORBIDDEN
        return {
            "success": False,
            "requiresVerification": True,
            "email": email,
            "verificationCode": code,
            "message": "Your email is not verified yet. A 6-digit verification code was sent to your email."
        }

    # User authenticated! Issue JWT token
    sanitized = UserModel.sanitize(user)
    token = create_access_token({
        "id": user["id"],
        "email": user["email"],
        "role": user.get("role", "student"),
        "name": user["name"]
    })

    return {
        "success": True,
        "message": "Sign in successful!",
        "token": token,
        "user": sanitized
    }


@router.post("/google")
def google_auth(payload: GoogleAuthRequest, response: Response):
    """
    Authenticate or auto-register user via Google OAuth (pre-verified).
    """
    email = (payload.email or "").strip().lower()

    if not email:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"success": False, "message": "Google authentication payload missing email."}

    user = UserModel.find_by_email(email)
    if user:
        if not user.get("is_verified", 0):
            user = UserModel.update_verification(email, is_verified=1)
    else:
        google_id = payload.googleId or f"google_{int(time.time() * 1000)}"
        user = UserModel.create(
            name=payload.name or "Google Student",
            email=email,
            password_hash=None,
            role="student",
            is_verified=1,
            google_id=google_id,
            avatar=payload.avatar
        )

    sanitized = UserModel.sanitize(user)
    token = create_access_token({
        "id": user["id"],
        "email": user["email"],
        "role": user.get("role", "student"),
        "name": user["name"]
    })

    return {
        "success": True,
        "message": "Successfully authenticated with Google!",
        "token": token,
        "user": sanitized
    }


@router.get("/me")
def get_current_user(authorization: Optional[str] = Header(None), response: Response = None):
    """
    Retrieve currently authenticated user profile using Bearer JWT token.
    """
    if not authorization or not authorization.startswith("Bearer "):
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"success": False, "message": "Authentication token required."}

    token = authorization.split("Bearer ")[1].strip()
    decoded = verify_access_token(token)
    if not decoded or "email" not in decoded:
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"success": False, "message": "Invalid or expired authentication token."}

    user = UserModel.find_by_email(decoded["email"])
    if not user:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"success": False, "message": "User profile not found."}

    return {
        "success": True,
        "user": UserModel.sanitize(user)
    }
