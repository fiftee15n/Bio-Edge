import { Router } from 'express';
import { CourseController } from '../controllers/courseController.js';

const router = Router();

// Public: Get all available courses
router.get('/', CourseController.getAllCourses);

// Public: Get course details by slug (alpha-cohort, ssc-2027)
router.get('/:slugOrId', CourseController.getCourseBySlug);

// Public: Teacher profile
router.get('/public/teacher', CourseController.getTeacherProfile);

export default router;
