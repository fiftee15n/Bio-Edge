import time
import sys
from contextlib import asynccontextmanager

# Ensure UTF-8 output on Windows consoles
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
if sys.stderr and hasattr(sys.stderr, "reconfigure"):
    try:
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from src.config.database import init_db
from src.routers import auth, courses

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite database and tables on startup
    init_db()
    # Auto-seed if database is freshly created
    try:
        from seed import seed_database
        seed_database()
    except Exception as e:
        print(f"Seed note: {e}")
    yield

app = FastAPI(
    title="Bio Edge by Afroza Tahmina — API",
    description="High-performance backend for Bio Edge Biology Learning Platform",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://localhost:5000",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration_ms = int((time.time() - start_time) * 1000)
    print(f"[{request.method}] {request.url.path} -> {response.status_code} ({duration_ms}ms)")
    return response

# Include Routers
app.include_router(auth.router)
app.include_router(courses.router)

@app.get("/")
def root():
    return {
        "name": "Bio Edge by Afroza Tahmina API",
        "status": "Online",
        "framework": "FastAPI (Python)",
        "docs": "/docs"
    }

@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "timestamp": int(time.time()),
        "service": "bioedge-fastapi-backend"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
