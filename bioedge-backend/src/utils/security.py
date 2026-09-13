import os
import time
import jwt
import bcrypt

JWT_SECRET = os.getenv("JWT_SECRET", "bioedge_super_secret_jwt_key_2026_biology_mastery")
JWT_ALGORITHM = "HS256"
DEFAULT_EXPIRY_SECONDS = 7 * 24 * 3600  # 7 days

def hash_password(password: str) -> str:
    """Hash password securely using standard bcrypt salt."""
    salt = bcrypt.gensalt(rounds=10)
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify plain password against hashed password."""
    try:
        if not hashed_password or not plain_password:
            return False
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except Exception:
        return False

def create_access_token(payload: dict, expires_delta: int = DEFAULT_EXPIRY_SECONDS) -> str:
    """Create a signed JWT access token."""
    to_encode = payload.copy()
    expire_timestamp = int(time.time()) + expires_delta
    to_encode.update({"exp": expire_timestamp, "iat": int(time.time())})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_access_token(token: str) -> dict:
    """Verify and decode JWT access token."""
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded
    except jwt.PyJWTError:
        return None
