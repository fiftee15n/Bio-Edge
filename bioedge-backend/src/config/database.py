import sqlite3
import os
import sys
from pathlib import Path

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

# Paths
BASE_DIR = Path(__file__).resolve().parent.parent.parent
DATA_DIR = BASE_DIR / "data"
DB_PATH = DATA_DIR / "bioedge.db"

def get_db_connection():
    """Create a new SQLite connection with row factory returning dict-like rows."""
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(DB_PATH), check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode = WAL;")
    return conn

def init_db():
    """Initialize database tables."""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.executescript("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT,
        role TEXT NOT NULL DEFAULT 'student',
        phone TEXT,
        institution TEXT,
        exam_year TEXT,
        student_id TEXT,
        batch TEXT,
        avatar TEXT,
        is_verified INTEGER NOT NULL DEFAULT 0,
        google_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS verification_codes (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL,
        code TEXT NOT NULL,
        expires_at INTEGER NOT NULL,
        attempts INTEGER NOT NULL DEFAULT 0,
        created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS courses (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        subtitle TEXT,
        description TEXT,
        duration TEXT NOT NULL,
        total_classes INTEGER NOT NULL,
        seat_limit INTEGER NOT NULL DEFAULT 20,
        enrolled_count INTEGER NOT NULL DEFAULT 0,
        full_fee INTEGER NOT NULL,
        monthly_fee INTEGER NOT NULL,
        discount_amount INTEGER NOT NULL DEFAULT 0,
        curriculum_json TEXT,
        metadata_json TEXT,
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS enrollments (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        course_id TEXT NOT NULL,
        course_slug TEXT NOT NULL,
        plan TEXT NOT NULL,
        authoritative_amount INTEGER NOT NULL,
        payment_method TEXT NOT NULL,
        payment_status TEXT NOT NULL DEFAULT 'Approved',
        enrollment_status TEXT NOT NULL DEFAULT 'Active',
        transaction_id TEXT,
        student_name TEXT,
        student_email TEXT,
        student_phone TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (course_id) REFERENCES courses(id)
    );

    CREATE TABLE IF NOT EXISTS teachers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        designation TEXT NOT NULL,
        institution TEXT NOT NULL,
        experience TEXT NOT NULL,
        specialization TEXT NOT NULL,
        bio TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        avatar TEXT
    );
    """)
    conn.commit()
    conn.close()
    print(f"✅ SQLite Database initialized at: {DB_PATH}")

if __name__ == "__main__":
    init_db()
