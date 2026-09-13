import uuid
import secrets
from typing import Optional, Dict, Any, List
from src.config.database import get_db_connection

class UserModel:
    @staticmethod
    def _row_to_dict(row) -> Optional[Dict[str, Any]]:
        if row is None:
            return None
        return dict(row)

    @classmethod
    def find_by_id(cls, user_id: str) -> Optional[Dict[str, Any]]:
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
            row = cursor.fetchone()
            return cls._row_to_dict(row)
        finally:
            conn.close()

    @classmethod
    def find_by_email(cls, email: str) -> Optional[Dict[str, Any]]:
        if not email:
            return None
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE LOWER(email) = LOWER(?)", (email.strip(),))
            row = cursor.fetchone()
            return cls._row_to_dict(row)
        finally:
            conn.close()

    @classmethod
    def find_by_google_id(cls, google_id: str) -> Optional[Dict[str, Any]]:
        if not google_id:
            return None
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE google_id = ?", (google_id,))
            row = cursor.fetchone()
            return cls._row_to_dict(row)
        finally:
            conn.close()

    @classmethod
    def create(
        cls,
        name: str,
        email: str,
        password_hash: Optional[str] = None,
        role: str = "student",
        phone: str = "",
        institution: str = "",
        exam_year: str = "",
        is_verified: int = 0,
        google_id: Optional[str] = None,
        student_id: Optional[str] = None,
        batch: str = "Alpha Cohort",
        avatar: Optional[str] = None
    ) -> Dict[str, Any]:
        user_id = f"usr_{secrets.token_hex(8)}"
        assigned_student_id = student_id or f"BE-2026-{secrets.randbelow(900) + 100}"
        normalized_email = email.strip().lower()

        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO users (
                    id, name, email, password_hash, role, phone,
                    institution, exam_year, student_id, batch, is_verified, google_id, avatar
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                user_id,
                name.strip(),
                normalized_email,
                password_hash,
                role,
                phone.strip() if phone else "",
                institution.strip() if institution else "",
                exam_year.strip() if exam_year else "",
                assigned_student_id,
                batch,
                1 if is_verified else 0,
                google_id,
                avatar
            ))
            conn.commit()
            return cls.find_by_id(user_id)
        finally:
            conn.close()

    @classmethod
    def update_verification(cls, email: str, is_verified: int = 1) -> Optional[Dict[str, Any]]:
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute(
                "UPDATE users SET is_verified = ?, updated_at = CURRENT_TIMESTAMP WHERE LOWER(email) = LOWER(?)",
                (1 if is_verified else 0, email.strip())
            )
            conn.commit()
            return cls.find_by_email(email)
        finally:
            conn.close()

    @classmethod
    def update_profile(cls, user_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        allowed = {"name", "phone", "institution", "exam_year", "batch", "avatar"}
        fields = []
        values = []
        for key in allowed:
            if key in updates and updates[key] is not None:
                fields.append(f"{key} = ?")
                values.append(updates[key])

        if not fields:
            return cls.find_by_id(user_id)

        values.append(user_id)
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute(f"UPDATE users SET {', '.join(fields)}, updated_at = CURRENT_TIMESTAMP WHERE id = ?", tuple(values))
            conn.commit()
            return cls.find_by_id(user_id)
        finally:
            conn.close()

    @classmethod
    def get_all_students(cls) -> List[Dict[str, Any]]:
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute(
                "SELECT id, name, email, phone, institution, exam_year, student_id, batch, is_verified, created_at FROM users WHERE role = 'student' ORDER BY created_at DESC"
            )
            rows = cursor.fetchall()
            return [dict(r) for r in rows]
        finally:
            conn.close()

    @staticmethod
    def sanitize(user: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
        if not user:
            return None
        return {
            "id": user.get("id"),
            "name": user.get("name"),
            "email": user.get("email"),
            "role": user.get("role", "student"),
            "phone": user.get("phone") or "",
            "institution": user.get("institution") or "",
            "examYear": user.get("exam_year") or "",
            "studentId": user.get("student_id") or "",
            "batch": user.get("batch") or "Alpha Cohort",
            "avatar": user.get("avatar"),
            "designation": "Senior Faculty & Biology Specialist" if user.get("role") == "teacher" else None,
            "isVerified": bool(user.get("is_verified", 0))
        }
