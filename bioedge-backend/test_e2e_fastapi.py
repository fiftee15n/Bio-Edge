import urllib.request
import json
import time

BASE_URL = "http://127.0.0.1:5000/api"

def make_req(endpoint, method="GET", data=None, token=None):
    url = f"{BASE_URL}{endpoint}"
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    body = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode("utf-8"))

print("Testing HTTP server connection...")
status, health = make_req("/courses")
print(f"GET /api/courses -> Status: {status}, Courses count: {health.get('count')}")

# Test Register
reg_email = f"live_test_{int(time.time())}@bioedge.edu"
status, reg = make_req("/auth/register", method="POST", data={
    "name": "Live Student Test",
    "email": reg_email,
    "password": "Password123"
})
print(f"POST /api/auth/register -> Status: {status}, Verification code: {reg.get('verificationCode')}")

# Test Verify
status, verify = make_req("/auth/verify-email", method="POST", data={
    "email": reg_email,
    "code": reg.get("verificationCode")
})
print(f"POST /api/auth/verify-email -> Status: {status}, Token received: {bool(verify.get('token'))}")

# Test Login
status, login = make_req("/auth/login", method="POST", data={
    "email": reg_email,
    "password": "Password123"
})
print(f"POST /api/auth/login -> Status: {status}, User: {login.get('user', {}).get('name')}")

# Test Google Sign-in
status, google = make_req("/auth/google", method="POST", data={
    "email": f"google_live_{int(time.time())}@gmail.com",
    "name": "Google Live User"
})
print(f"POST /api/auth/google -> Status: {status}, Token received: {bool(google.get('token'))}")
