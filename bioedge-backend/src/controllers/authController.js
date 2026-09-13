import bcrypt from 'bcryptjs';
import { UserModel } from '../models/userModel.js';
import { VerificationModel } from '../models/verificationModel.js';
import { EmailService } from '../utils/emailService.js';
import { TokenService } from '../utils/tokenService.js';

export const AuthController = {
  /**
   * Register a new student with Email & Password
   */
  async register(req, res) {
    try {
      const { name, email, password, confirmPassword, phone, institution, examYear, targetCourse } = req.body;

      // Basic field validation
      if (!name || !name.trim()) {
        return res.status(400).json({ success: false, message: 'Full name is required.' });
      }

      if (!email || !email.trim()) {
        return res.status(400).json({ success: false, message: 'Email address is required.' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
      }

      if (!password || password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
      }

      if (confirmPassword && password !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'Password confirmation does not match.' });
      }

      const normalizedEmail = email.trim().toLowerCase();

      // Check if user already exists
      const existingUser = UserModel.findByEmail(normalizedEmail);
      if (existingUser) {
        if (existingUser.is_verified) {
          return res.status(400).json({
            success: false,
            message: 'An account with this email address already exists. Please sign in instead.'
          });
        } else {
          // User exists but unverified: generate new OTP code
          const code = Math.floor(100000 + Math.random() * 900000).toString();
          VerificationModel.saveCode(normalizedEmail, code, 10);
          await EmailService.sendVerificationCode(normalizedEmail, code, name.trim());

          return res.status(200).json({
            success: true,
            isNewUser: false,
            requiresVerification: true,
            email: normalizedEmail,
            verificationCode: code, // Included for instant sandbox testing
            message: 'Your account is pending verification. A new 6-digit verification code has been sent to your email.'
          });
        }
      }

      // Hash password securely (Plaintext password is NEVER stored)
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Create new student user with unverified status (is_verified = 0)
      const newUser = UserModel.create({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: 'student',
        phone: phone ? phone.trim() : '',
        institution: institution ? institution.trim() : '',
        examYear: examYear || (targetCourse === 'ssc-2027' ? 'SSC 2027' : 'HSC 2026'),
        isVerified: 0
      });

      // Generate 6-digit verification code (10-minute expiry)
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      VerificationModel.saveCode(normalizedEmail, code, 10);
      await EmailService.sendVerificationCode(normalizedEmail, code, newUser.name);

      return res.status(201).json({
        success: true,
        isNewUser: true,
        requiresVerification: true,
        email: normalizedEmail,
        verificationCode: code, // Included for developer testing convenience
        message: 'Account created! Please enter the 6-digit verification code sent to your email.'
      });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({
        success: false,
        message: 'Something went wrong while creating your account. Please try again.'
      });
    }
  },

  /**
   * Verify Email using 6-digit OTP code
   */
  async verifyEmail(req, res) {
    try {
      const { email, code } = req.body;

      if (!email || !code) {
        return res.status(400).json({
          success: false,
          message: 'Email and 6-digit verification code are required.'
        });
      }

      const normalizedEmail = email.trim().toLowerCase();
      const cleanCode = code.toString().trim();

      const record = VerificationModel.getActiveCode(normalizedEmail);
      if (!record) {
        return res.status(400).json({
          success: false,
          message: 'No active verification code found for this email. Please request a new code.'
        });
      }

      // Check code expiration
      if (Date.now() > record.expires_at) {
        VerificationModel.deleteCode(normalizedEmail);
        return res.status(400).json({
          success: false,
          message: 'Verification code has expired. Please click "Resend Code" to get a new code.'
        });
      }

      // Check attempt/abuse protection (Max 5 attempts)
      if (record.attempts >= 5) {
        VerificationModel.deleteCode(normalizedEmail);
        return res.status(429).json({
          success: false,
          message: 'Too many incorrect attempts. For your security, this code was invalidated. Please request a new code.'
        });
      }

      // Check if code matches
      if (record.code !== cleanCode) {
        const updated = VerificationModel.incrementAttempts(normalizedEmail);
        const remainingAttempts = Math.max(0, 5 - (updated ? updated.attempts : 5));
        
        // If max attempts reached, invalidate the code immediately
        if (updated && updated.attempts >= 5) {
          VerificationModel.deleteCode(normalizedEmail);
          return res.status(429).json({
            success: false,
            message: 'Maximum verification attempts (5) exceeded. This code has been invalidated. Please click "Resend code" to get a new code.'
          });
        }

        return res.status(400).json({
          success: false,
          message: `Incorrect verification code. ${remainingAttempts} attempts remaining.`
        });
      }

      // Valid code! Mark user as verified
      const updatedUser = UserModel.updateVerification(normalizedEmail, 1);
      VerificationModel.deleteCode(normalizedEmail);

      // Generate JWT Token
      const token = TokenService.generateToken(updatedUser);

      const sanitizedUser = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        institution: updatedUser.institution,
        examYear: updatedUser.exam_year,
        studentId: updatedUser.student_id,
        batch: updatedUser.batch,
        isVerified: true
      };

      return res.status(200).json({
        success: true,
        message: 'Email verified successfully! Welcome to Bio Edge.',
        token,
        user: sanitizedUser
      });
    } catch (error) {
      console.error('Email verification error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error during verification. Please try again.'
      });
    }
  },

  /**
   * Resend Verification Code with 60s cooldown & anti-abuse protection
   */
  async resendVerificationCode(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ success: false, message: 'Email address is required.' });
      }

      const normalizedEmail = email.trim().toLowerCase();
      const user = UserModel.findByEmail(normalizedEmail);

      if (!user) {
        return res.status(404).json({ success: false, message: 'No registered user found with this email.' });
      }

      if (user.is_verified) {
        return res.status(400).json({ success: false, message: 'This email is already verified. Please sign in.' });
      }

      const existingRecord = VerificationModel.getActiveCode(normalizedEmail);
      if (existingRecord && existingRecord.attempts < 5) {
        const timeSinceCreated = Date.now() - existingRecord.created_at;
        const cooldownMs = 60 * 1000; // 60 seconds cooldown
        if (timeSinceCreated < cooldownMs) {
          const waitSeconds = Math.ceil((cooldownMs - timeSinceCreated) / 1000);
          return res.status(429).json({
            success: false,
            message: `Please wait ${waitSeconds} seconds before requesting a new code.`
          });
        }
      }

      // Generate fresh 6-digit code with 10-minute expiry
      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
      VerificationModel.saveCode(normalizedEmail, newCode, 10);
      await EmailService.sendVerificationCode(normalizedEmail, newCode, user.name);

      return res.status(200).json({
        success: true,
        verificationCode: newCode, // Included for instant sandbox testing
        message: 'A new 6-digit verification code has been sent to your email.'
      });
    } catch (error) {
      console.error('Resend verification error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to resend verification code. Please try again.'
      });
    }
  },

  /**
   * Email & Password Login
   */
  async login(req, res) {
    try {
      const { email, password, role } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide both email and password.'
        });
      }

      const normalizedEmail = email.trim().toLowerCase();
      const user = UserModel.findByEmail(normalizedEmail);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email address or password.'
        });
      }

      // Check role constraint if specific role requested
      if (role && user.role !== role) {
        return res.status(403).json({
          success: false,
          message: `This account does not have ${role} privileges.`
        });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email address or password.'
        });
      }

      // Check email verification status
      if (!user.is_verified) {
        // Send a fresh code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        VerificationModel.saveCode(normalizedEmail, code, 10);
        await EmailService.sendVerificationCode(normalizedEmail, code, user.name);

        return res.status(403).json({
          success: false,
          requiresVerification: true,
          email: normalizedEmail,
          verificationCode: code,
          message: 'Your email is not verified yet. A 6-digit verification code was sent to your email.'
        });
      }

      // Generate JWT Token
      const token = TokenService.generateToken(user);

      const sanitizedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        institution: user.institution,
        examYear: user.exam_year,
        studentId: user.student_id,
        batch: user.batch,
        designation: user.role === 'teacher' ? 'Senior Faculty & Biology Specialist' : undefined,
        isVerified: true
      };

      return res.status(200).json({
        success: true,
        message: 'Sign in successful!',
        token,
        user: sanitizedUser
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error during sign in. Please try again.'
      });
    }
  },

  /**
   * Continue with Google Authentication
   */
  async googleAuth(req, res) {
    try {
      const { email, name, googleId, avatar } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Google authentication payload missing email.'
        });
      }

      const normalizedEmail = email.trim().toLowerCase();
      let user = UserModel.findByEmail(normalizedEmail);

      if (user) {
        // If user exists, mark verified if not already (Google accounts are pre-verified)
        if (!user.is_verified) {
          user = UserModel.updateVerification(normalizedEmail, 1);
        }
      } else {
        // Create new user automatically with Google info (Pre-verified)
        user = UserModel.create({
          name: name ? name.trim() : 'Google Student',
          email: normalizedEmail,
          passwordHash: null,
          role: 'student',
          isVerified: 1,
          googleId: googleId || `google_${Date.now()}`
        });
      }

      // Generate JWT token
      const token = TokenService.generateToken(user);

      const sanitizedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        institution: user.institution,
        examYear: user.exam_year,
        studentId: user.student_id,
        batch: user.batch,
        avatar: avatar || user.avatar,
        isVerified: true
      };

      return res.status(200).json({
        success: true,
        message: 'Successfully authenticated with Google!',
        token,
        user: sanitizedUser
      });
    } catch (error) {
      console.error('Google auth error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to authenticate with Google. Please try again.'
      });
    }
  },

  /**
   * Get Current Authenticated User profile
   */
  async getMe(req, res) {
    try {
      return res.status(200).json({
        success: true,
        user: req.user
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve user profile.'
      });
    }
  }
};
