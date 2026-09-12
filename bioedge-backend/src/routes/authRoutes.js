import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

// Registration with Email & Password
router.post('/register', AuthController.register);

// Verify Email with 6-digit OTP code
router.post('/verify-email', AuthController.verifyEmail);

// Resend Verification Code (with 60s cooldown)
router.post('/resend-code', AuthController.resendVerificationCode);

// Email & Password Login
router.post('/login', AuthController.login);

// Continue with Google Authentication
router.post('/google', AuthController.googleAuth);

// Get current authenticated user profile
router.get('/me', authenticateToken, AuthController.getMe);

export default router;
