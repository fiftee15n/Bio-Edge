from fastapi import APIRouter, Response, status
from src.models.course_model import CourseModel, TeacherModel

router = APIRouter(prefix="/api/courses", tags=["Courses"])

@router.get("")
def get_courses():
    """Get all active published courses."""
    courses = CourseModel.find_all()
    return {
        "success": True,
        "count": len(courses),
        "courses": courses
    }

@router.get("/public/teacher")
def get_teacher():
    """Get teacher Afroza Tahmina public profile."""
    teacher = TeacherModel.get_profile()
    if not teacher:
        return {
            "success": True,
            "teacher": {
                "name": "Afroza Tahmina",
                "designation": "Senior Faculty & HEC Biology Specialist",
                "institution": "Premier Academic Institutions",
                "experience": "8+ Years Teaching Excellence",
                "specialization": "HEC Biology 1st & 2nd Paper, Medical Admission Foundation",
                "bio": "Dedicated to cultivating analytical clarity and conceptual depth in Biology."
            }
        }
    return {
        "success": True,
        "teacher": teacher
    }

@router.get("/{slug}")
def get_course_by_slug(slug: str, response: Response):
    """Get single course by slug."""
    course = CourseModel.find_by_slug(slug)
    if not course:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"success": False, "message": f"Course '{slug}' not found."}
    return {
        "success": True,
        "course": course
    }
