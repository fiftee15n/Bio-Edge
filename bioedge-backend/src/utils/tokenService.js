import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'bioedge_secret_jwt_key_2026_super_secure';
const JWT_EXPIRES_IN = '7d';

export const TokenService = {
  generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        studentId: user.student_id || user.studentId
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  },

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
};
