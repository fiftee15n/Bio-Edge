import { Router } from 'express';
import { EnrollmentController } from '../controllers/enrollmentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

// Create enrollment (Protected - Requires JWT)
router.post('/', authenticateToken, EnrollmentController.createEnrollment);

// Get student's enrollments (Protected)
router.get('/my', authenticateToken, EnrollmentController.getMyEnrollments);

export default router;
