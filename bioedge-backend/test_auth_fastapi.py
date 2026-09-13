import time
import sys
from fastapi.testclient import TestClient
from main import app

# Ensure UTF-8 output on Windows consoles
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

client = TestClient(app)

def run_tests():
    print("\n========================================================")
    print("🧪 STARTING FASTAPI AUTHENTICATION TEST SUITE")
    print("========================================================\n")

    # 1. Health check
    res = client.get("/api/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print(" [PASS] 1. Health check endpoint OK")

    # 2. Public Courses & Teacher
    res = client.get("/api/courses")
    assert res.status_code == 200
    assert len(res.json()["courses"]) >= 2
    print(" [PASS] 2. Public courses catalog API OK")

    # 3. Registration Flow
    test_email = f"fastapi_student_{int(time.time())}@bioedge.edu"
    reg_payload = {
        "name": "Nafis Fuad",
        "email": test_email,
        "password": "SecurePassword123",
        "confirmPassword": "SecurePassword123",
        "phone": "01811223344",
        "institution": "Dhaka Residential Model College",
        "examYear": "HSC 2026",
        "targetCourse": "alpha-cohort"
    }
    res = client.post("/api/auth/register", json=reg_payload)
    assert res.status_code == 201, f"Registration failed: {res.text}"
    reg_data = res.json()
    assert reg_data["success"] is True
    assert reg_data["requiresVerification"] is True
    verification_code = reg_data["verificationCode"]
    assert len(verification_code) == 6
    print(f" [PASS] 3. Registration created pending user with 6-digit OTP [{verification_code}]")

    # 4. Duplicate Registration while unverified returns fresh OTP
    res_dup = client.post("/api/auth/register", json=reg_payload)
    assert res_dup.status_code == 200
    assert res_dup.json()["requiresVerification"] is True
    print(" [PASS] 4. Re-registering unverified user refreshed OTP code")

    # 5. Invalid OTP attempt test
    res_bad_otp = client.post("/api/auth/verify-email", json={
        "email": test_email,
        "code": "000000"
    })
    assert res_bad_otp.status_code == 400
    assert "Incorrect verification code" in res_bad_otp.json()["message"]
    print(" [PASS] 5. Invalid OTP code rejected with attempt counter decrement")

    # 6. Valid OTP Verification
    # Fetch active code
    active_code = res_dup.json()["verificationCode"]
    res_verify = client.post("/api/auth/verify-email", json={
        "email": test_email,
        "code": active_code
    })
    assert res_verify.status_code == 200, f"Verification failed: {res_verify.text}"
    verify_data = res_verify.json()
    assert verify_data["success"] is True
    assert "token" in verify_data
    assert verify_data["user"]["isVerified"] is True
    jwt_token = verify_data["token"]
    print(" [PASS] 6. Email verified successfully, JWT token and verified profile returned")

    # 7. Login with Verified Account
    res_login = client.post("/api/auth/login", json={
        "email": test_email,
        "password": "SecurePassword123"
    })
    assert res_login.status_code == 200, f"Login failed: {res_login.text}"
    login_data = res_login.json()
    assert login_data["success"] is True
    assert "token" in login_data
    assert login_data["user"]["email"] == test_email
    print(" [PASS] 7. Standard email/password login authenticated successfully")

    # 8. Login with Invalid Password
    res_bad_pw = client.post("/api/auth/login", json={
        "email": test_email,
        "password": "WrongPassword999"
    })
    assert res_bad_pw.status_code == 401
    print(" [PASS] 8. Incorrect password rejected with 401")

    # 9. Protected /api/auth/me endpoint with Bearer token
    res_me = client.get("/api/auth/me", headers={"Authorization": f"Bearer {jwt_token}"})
    assert res_me.status_code == 200, f"/me failed: {res_me.text}"
    me_data = res_me.json()
    assert me_data["success"] is True
    assert me_data["user"]["email"] == test_email
    print(" [PASS] 9. Protected /api/auth/me returned authenticated user profile")

    # 10. Protected /api/auth/me without token fails
    res_no_token = client.get("/api/auth/me")
    assert res_no_token.status_code == 401
    print(" [PASS] 10. Missing token rejected with 401")

    # 11. Google OAuth Sign-in Flow
    google_email = f"google_student_{int(time.time())}@gmail.com"
    res_google = client.post("/api/auth/google", json={
        "email": google_email,
        "name": "Afroza Star Student",
        "googleId": f"g_{int(time.time())}",
        "avatar": "https://lh3.googleusercontent.com/a/default-user"
    })
    assert res_google.status_code == 200, f"Google auth failed: {res_google.text}"
    google_data = res_google.json()
    assert google_data["success"] is True
    assert google_data["user"]["isVerified"] is True
    assert "token" in google_data
    print(" [PASS] 11. Google Sign-in auto-registered and returned verified JWT")

    # 12. Pre-seeded Demo Teacher and Student login
    res_seed_student = client.post("/api/auth/login", json={
        "email": "tariqul@gmail.com",
        "password": "student123"
    })
    assert res_seed_student.status_code == 200
    assert res_seed_student.json()["user"]["name"] == "Tariqul Islam"
    print(" [PASS] 12. Seeded student account (tariqul@gmail.com) login OK")

    res_seed_teacher = client.post("/api/auth/login", json={
        "email": "afroza.tahmina@bioedge.edu",
        "password": "teacher123",
        "role": "teacher"
    })
    assert res_seed_teacher.status_code == 200
    assert res_seed_teacher.json()["user"]["role"] == "teacher"
    print(" [PASS] 13. Seeded teacher account (afroza.tahmina@bioedge.edu) login OK")

    print("\n========================================================")
    print("🎉 ALL FASTAPI AUTHENTICATION TESTS PASSED SUCCESSFULLY!")
    print("========================================================\n")

if __name__ == "__main__":
    run_tests()
