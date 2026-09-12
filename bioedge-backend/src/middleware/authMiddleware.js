import { TokenService } from '../utils/tokenService.js';
import { UserModel } from '../models/userModel.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please sign in.'
    });
  }

  const decoded = TokenService.verifyToken(token);
  if (!decoded) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired session token. Please sign in again.'
    });
  }

  const user = UserModel.findById(decoded.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User account no longer exists.'
    });
  }

  req.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    phone: user.phone,
    institution: user.institution,
    examYear: user.exam_year,
    studentId: user.student_id,
    batch: user.batch,
    isVerified: Boolean(user.is_verified)
  };

  next();
};

export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (token) {
    const decoded = TokenService.verifyToken(token);
    if (decoded) {
      const user = UserModel.findById(decoded.id);
      if (user) {
        req.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          phone: user.phone,
          institution: user.institution,
          examYear: user.exam_year,
          studentId: user.student_id,
          batch: user.batch,
          isVerified: Boolean(user.is_verified)
        };
      }
    }
  }

  next();
};

export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Requires ${role} privileges.`
      });
    }
    next();
  };
};
