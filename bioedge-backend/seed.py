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

# Ensure root directory is in sys.path
BASE_DIR = Path(__file__).resolve().parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from src.config.database import init_db
from src.models.course_model import CourseModel, TeacherModel
from src.models.user_model import UserModel
from src.utils.security import hash_password

def seed_database():
    init_db()
    print("🌱 Seeding database initial records...")

    # 1. Seed Teacher Profile
    TeacherModel.upsert_profile({
        "id": "teacher_afroza",
        "name": "Afroza Tahmina",
        "designation": "Senior Faculty & HEC Biology Specialist",
        "institution": "Former Senior Faculty at Premier Academic Institutions",
        "experience": "8+ Years Teaching Excellence",
        "specialization": "HEC Biology 1st & 2nd Paper, Medical Admission Foundation, Diagram Mastery",
        "bio": "Dedicated to cultivating analytical clarity, conceptual depth, and disciplined written exam performance in Biology students.",
        "phone": "+880 1712-345678",
        "email": "afroza.tahmina@bioedge.edu",
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
    })

    # 2. Seed Courses
    CourseModel.upsert_course({
        "id": "crs_alpha_cohort",
        "slug": "alpha-cohort",
        "title": "Alpha Cohort — 4-Month Crash Course",
        "subtitle": "Premium HSC Biology Intensive Program (1st & 2nd Paper)",
        "description": "A structured, focused and result-oriented Biology preparation program designed to build strong concepts, improve exam performance and prepare students for HSC Biology First and Second Paper.",
        "duration": "4 Months",
        "total_classes": 48,
        "seat_limit": 20,
        "enrolled_count": 14,
        "full_fee": 12500,
        "monthly_fee": 3500,
        "discount_amount": 1500,
        "metadata": {
            "papers": ["Biology First Paper", "Biology Second Paper"],
            "batchType": "Small Group Intensive (Max 20 Students)",
            "classSchedule": "3 Days / Week (Thu, Fri, Sat @ 7:00 PM)",
            "assessmentsCount": "24 Chapter Tests + 8 Full Model Tests",
            "features": [
                "48 Live Intensive Conceptual Masterclasses",
                "Biology 1st & 2nd Paper Complete Syllabus Coverage",
                "Structured CQ / SQ Written Answer Script Evaluation",
                "24 Chapter-wise Speed & Accuracy MCQ Tests",
                "8 Full Syllabus Board Standard Model Tests",
                "Direct 1-on-1 Academic Feedback from Afroza Tahmina",
                "Complete Hand-drawn Biology Diagram Guides",
                "Exclusive Small Batch of Only 15–20 Students"
            ]
        },
        "curriculum": {
            "firstPaper": [
                {
                    "chapterNo": 1,
                    "title": "Cell & Its Structure",
                    "topics": ["Cell Wall & Plasma Membrane", "Cytoplasmic Organelles", "Nucleus & Chromosomes", "DNA & RNA Structure"],
                    "classes": 5
                },
                {
                    "chapterNo": 2,
                    "title": "Cell Division",
                    "topics": ["Amitosis & Mitosis Stages", "Meiosis & Crossing Over", "Significance of Cell Division"],
                    "classes": 4
                },
                {
                    "chapterNo": 3,
                    "title": "Cell Chemistry",
                    "topics": ["Carbohydrates & Lipids", "Proteins & Amino Acids", "Enzyme Kinetics & Action"],
                    "classes": 4
                },
                {
                    "chapterNo": 4,
                    "title": "Microorganisms",
                    "topics": ["Virus Structure & Life Cycle", "Bacteria Classification & Economic Importance", "Malaria Parasite"],
                    "classes": 4
                },
                {
                    "chapterNo": 5,
                    "title": "Plant Physiology",
                    "topics": ["Mineral Absorption", "Photosynthesis (C3 & C4)", "Respiration & Glycolysis"],
                    "classes": 5
                },
                {
                    "chapterNo": 6,
                    "title": "Genetics & Biotechnology",
                    "topics": ["Mendelian Genetics & Deviations", "Recombinant DNA & Genetic Engineering", "Tissue Culture"],
                    "classes": 4
                }
            ],
            "secondPaper": [
                {
                    "chapterNo": 1,
                    "title": "Animal Diversity & Classification",
                    "topics": ["Basis of Classification", "Non-Chordata Phyla Characteristics", "Chordata Classes & Examples"],
                    "classes": 5
                },
                {
                    "chapterNo": 2,
                    "title": "Animal Identity (Hydra & Grasshopper)",
                    "topics": ["Hydra Structure, Nematocysts & Locomotion", "Grasshopper Mouthparts & Digestive System"],
                    "classes": 4
                },
                {
                    "chapterNo": 3,
                    "title": "Human Physiology: Digestion & Absorption",
                    "topics": ["Digestive Tract & Enzymes", "Absorption & Assimilation of Nutrients"],
                    "classes": 4
                },
                {
                    "chapterNo": 4,
                    "title": "Human Physiology: Circulation & Heart",
                    "topics": ["Cardiac Cycle & Blood Pressure", "ECG, Angioplasty & Coronary Bypass"],
                    "classes": 5
                },
                {
                    "chapterNo": 5,
                    "title": "Human Physiology: Respiration & Breathing",
                    "topics": ["Respiratory Tract & Alveoli Mechanism", "Gas Exchange (O2 and CO2 Transport)"],
                    "classes": 4
                },
                {
                    "chapterNo": 6,
                    "title": "Human Physiology: Excretion & Osmoregulation",
                    "topics": ["Nephron Structure & Urine Formation", "Renal Dialysis & Kidney Function"],
                    "classes": 4
                }
            ]
        }
    })

    CourseModel.upsert_course({
        "id": "crs_ssc_2027",
        "slug": "ssc-2027",
        "title": "SSC 2027 Biology Foundation & Model Test",
        "subtitle": "Complete Board Syllabus Mastery & Exam Strategy",
        "description": "Comprehensive foundation and extensive model testing program for SSC candidates aiming for Golden A+ in Biology.",
        "duration": "3 Months",
        "total_classes": 32,
        "seat_limit": 25,
        "enrolled_count": 18,
        "full_fee": 2200,
        "monthly_fee": 2200,
        "discount_amount": 800,
        "metadata": {
            "papers": ["SSC Biology (Class 9-10 Complete Textbook)"],
            "batchType": "Model Test & Board Preparation Batch",
            "classSchedule": "2 Tests / Week + Weekly Solution Live Class",
            "assessmentsCount": "20 Board Standard Full Model Tests",
            "features": [
                "20 Board Standard Full Length Biology Model Tests",
                "Line-by-line Handwritten CQ Answer Script Checking",
                "8 Live Zoom Doubt Clearing & Question Analysis Sessions",
                "35+ Essential High-Yield Biology Diagram Sheets",
                "Top 10 Cadet & Leading Dhaka College Question Analysis",
                "Personalized Performance Analytics & Rank Leaderboard"
            ]
        },
        "curriculum": {
            "tests": [
                { "testNo": 1, "title": "Chapter 1 & 2: Lessons of Life & Cells/Tissues", "type": "CQ + MCQ", "marks": 50 },
                { "testNo": 2, "title": "Chapter 3 & 4: Cell Division & Bioenergetics", "type": "CQ + MCQ", "marks": 50 },
                { "testNo": 3, "title": "Chapter 5 & 6: Food, Nutrition & Transport in Organisms", "type": "CQ + MCQ", "marks": 50 },
                { "testNo": 4, "title": "Chapter 7 & 8: Gaseous Exchange & Excretion", "type": "CQ + MCQ", "marks": 50 },
                { "testNo": 5, "title": "Paper 1 Half-Syllabus Model Test", "type": "Full Board Standard", "marks": 75 },
                { "testNo": 6, "title": "Full Syllabus Grand Board Model Test 01", "type": "Full Board Standard", "marks": 75 },
                { "testNo": 7, "title": "Full Syllabus Grand Board Model Test 02", "type": "Full Board Standard", "marks": 75 }
            ]
        }
    })

    # 3. Seed Demo Users
    student_pw_hash = hash_password("student123")
    teacher_pw_hash = hash_password("teacher123")

    # Student: Tariqul
    if not UserModel.find_by_email("tariqul@gmail.com"):
        UserModel.create(
            name="Tariqul Islam",
            email="tariqul@gmail.com",
            password_hash=student_pw_hash,
            role="student",
            phone="01711223344",
            institution="Notre Dame College, Dhaka",
            exam_year="HSC 2026",
            student_id="BE-2026-001",
            batch="Alpha Cohort",
            is_verified=1
        )

    # Teacher: Afroza Tahmina
    if not UserModel.find_by_email("afroza.tahmina@bioedge.edu"):
        UserModel.create(
            name="Afroza Tahmina",
            email="afroza.tahmina@bioedge.edu",
            password_hash=teacher_pw_hash,
            role="teacher",
            phone="+880 1712-345678",
            institution="Bio Edge Academic Faculty",
            exam_year="",
            student_id="BE-FAC-001",
            batch="Faculty",
            is_verified=1
        )

    print("✅ Seed data successfully populated in database.")

if __name__ == "__main__":
    seed_database()
