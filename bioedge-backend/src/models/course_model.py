import json
from typing import Optional, Dict, Any, List
from src.config.database import get_db_connection

class CourseModel:
    @staticmethod
    def _format_course(row) -> Optional[Dict[str, Any]]:
        if not row:
            return None
        d = dict(row)
        if d.get("curriculum_json"):
            try:
                d["curriculum"] = json.loads(d["curriculum_json"])
            except Exception:
                d["curriculum"] = {}
        else:
            d["curriculum"] = {}

        if d.get("metadata_json"):
            try:
                d["metadata"] = json.loads(d["metadata_json"])
            except Exception:
                d["metadata"] = {}
        else:
            d["metadata"] = {}
        return d

    @classmethod
    def find_all(cls) -> List[Dict[str, Any]]:
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM courses WHERE is_active = 1 ORDER BY created_at ASC")
            rows = cursor.fetchall()
            return [cls._format_course(r) for r in rows]
        finally:
            conn.close()

    @classmethod
    def find_by_slug(cls, slug: str) -> Optional[Dict[str, Any]]:
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM courses WHERE slug = ? AND is_active = 1", (slug,))
            row = cursor.fetchone()
            return cls._format_course(row)
        finally:
            conn.close()

    @classmethod
    def find_by_id(cls, course_id: str) -> Optional[Dict[str, Any]]:
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM courses WHERE id = ?", (course_id,))
            row = cursor.fetchone()
            return cls._format_course(row)
        finally:
            conn.close()

    @classmethod
    def upsert_course(cls, data: Dict[str, Any]) -> Dict[str, Any]:
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            curriculum_str = json.dumps(data.get("curriculum", {}))
            metadata_str = json.dumps(data.get("metadata", {}))

            cursor.execute("""
                INSERT INTO courses (
                    id, slug, title, subtitle, description, duration,
                    total_classes, seat_limit, enrolled_count, full_fee,
                    monthly_fee, discount_amount, curriculum_json, metadata_json, is_active
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(slug) DO UPDATE SET
                    title=excluded.title,
                    subtitle=excluded.subtitle,
                    description=excluded.description,
                    duration=excluded.duration,
                    total_classes=excluded.total_classes,
                    seat_limit=excluded.seat_limit,
                    enrolled_count=excluded.enrolled_count,
                    full_fee=excluded.full_fee,
                    monthly_fee=excluded.monthly_fee,
                    discount_amount=excluded.discount_amount,
                    curriculum_json=excluded.curriculum_json,
                    metadata_json=excluded.metadata_json,
                    is_active=excluded.is_active
            """, (
                data["id"],
                data["slug"],
                data["title"],
                data.get("subtitle", ""),
                data.get("description", ""),
                data["duration"],
                data["total_classes"],
                data.get("seat_limit", 20),
                data.get("enrolled_count", 0),
                data["full_fee"],
                data["monthly_fee"],
                data.get("discount_amount", 0),
                curriculum_str,
                metadata_str,
                data.get("is_active", 1)
            ))
            conn.commit()
            return cls.find_by_slug(data["slug"])
        finally:
            conn.close()


class TeacherModel:
    @classmethod
    def get_profile(cls) -> Optional[Dict[str, Any]]:
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM teachers LIMIT 1")
            row = cursor.fetchone()
            return dict(row) if row else None
        finally:
            conn.close()

    @classmethod
    def upsert_profile(cls, data: Dict[str, Any]) -> Dict[str, Any]:
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO teachers (
                    id, name, designation, institution, experience,
                    specialization, bio, phone, email, avatar
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    name=excluded.name,
                    designation=excluded.designation,
                    institution=excluded.institution,
                    experience=excluded.experience,
                    specialization=excluded.specialization,
                    bio=excluded.bio,
                    phone=excluded.phone,
                    email=excluded.email,
                    avatar=excluded.avatar
            """, (
                data.get("id", "teacher_afroza"),
                data["name"],
                data["designation"],
                data["institution"],
                data["experience"],
                data["specialization"],
                data["bio"],
                data.get("phone", ""),
                data.get("email", ""),
                data.get("avatar", "")
            ))
            conn.commit()
            return cls.get_profile()
        finally:
            conn.close()
