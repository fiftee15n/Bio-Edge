import time
import secrets
from typing import Optional, Dict, Any
from src.config.database import get_db_connection

class VerificationModel:
    @classmethod
    def save_code(cls, email: str, code: str, expires_in_minutes: int = 10) -> Dict[str, Any]:
        """Save a new 6-digit OTP code, clearing any previous code for this email."""
        normalized_email = email.strip().lower()
        now_ms = int(time.time() * 1000)
        expires_at_ms = now_ms + (expires_in_minutes * 60 * 1000)
        record_id = f"vcode_{secrets.token_hex(8)}"

        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            # Clear previous codes
            cursor.execute("DELETE FROM verification_codes WHERE LOWER(email) = LOWER(?)", (normalized_email,))
            
            cursor.execute("""
                INSERT INTO verification_codes (id, email, code, expires_at, attempts, created_at)
                VALUES (?, ?, ?, ?, 0, ?)
            """, (record_id, normalized_email, str(code).strip(), expires_at_ms, now_ms))
            conn.commit()
            
            return {
                "id": record_id,
                "email": normalized_email,
                "code": str(code).strip(),
                "expires_at": expires_at_ms,
                "attempts": 0,
                "created_at": now_ms
            }
        finally:
            conn.close()

    @classmethod
    def get_active_code(cls, email: str) -> Optional[Dict[str, Any]]:
        """Retrieve the most recent code for an email."""
        if not email:
            return None
        normalized_email = email.strip().lower()
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT * FROM verification_codes WHERE LOWER(email) = LOWER(?) ORDER BY created_at DESC LIMIT 1",
                (normalized_email,)
            )
            row = cursor.fetchone()
            return dict(row) if row else None
        finally:
            conn.close()

    @classmethod
    def increment_attempts(cls, email: str) -> Optional[Dict[str, Any]]:
        """Increment incorrect attempt count for abuse protection."""
        normalized_email = email.strip().lower()
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute(
                "UPDATE verification_codes SET attempts = attempts + 1 WHERE LOWER(email) = LOWER(?)",
                (normalized_email,)
            )
            conn.commit()
            return cls.get_active_code(normalized_email)
        finally:
            conn.close()

    @classmethod
    def delete_code(cls, email: str) -> None:
        """Invalidate code after successful verification or exceeding attempts."""
        normalized_email = email.strip().lower()
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM verification_codes WHERE LOWER(email) = LOWER(?)", (normalized_email,))
            conn.commit()
        finally:
            conn.close()
