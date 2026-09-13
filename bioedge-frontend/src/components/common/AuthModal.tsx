import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { VerifyEmailForm } from './VerifyEmailForm';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Phone, 
  Building2, 
  Sparkles, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
  redirectUrl?: string;
  courseTitle?: string;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
  redirectUrl,
  courseTitle,
  onSuccess
}) => {
  const { login, register, loginWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'register' | 'verify'>(defaultMode);
  const [activeRole, setActiveRole] = useState<'student' | 'teacher'>('student');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    institution: '',
    examYear: 'HSC 2026'
  });

  // Verification state
  const [verifyEmailTarget, setVerifyEmailTarget] = useState<string>('');
  const [initialOtpCode, setInitialOtpCode] = useState<string>('');

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setErrorMessage('');
    const res = await loginWithGoogle();
    if (res.success) {
      if (onSuccess) onSuccess();
      if (redirectUrl) navigate(redirectUrl);
      onClose();
    } else {
      setErrorMessage(res.message || 'Google sign-in failed');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const res = await login(formData.email, formData.password, activeRole);
    if (res.success) {
      if (onSuccess) onSuccess();
      if (redirectUrl) {
        navigate(redirectUrl);
      } else if (activeRole === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }
      onClose();
    } else if (res.requiresVerification && res.email) {
      setVerifyEmailTarget(res.email);
      setInitialOtpCode(res.verificationCode || '');
      setMode('verify');
    } else {
      setErrorMessage(res.message || 'Invalid email or password');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const res = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phone: formData.phone,
      institution: formData.institution,
      examYear: formData.examYear
    });

    if (res.success && res.requiresVerification) {
      setVerifyEmailTarget(res.email || formData.email);
      setInitialOtpCode(res.verificationCode || '');
      setMode('verify');
    } else if (res.success && res.user) {
      if (onSuccess) onSuccess();
      if (redirectUrl) navigate(redirectUrl);
      onClose();
    } else {
      setErrorMessage(res.message || 'Registration failed.');
    }
  };

  const handleVerificationSuccess = () => {
    if (onSuccess) onSuccess();
    if (redirectUrl) {
      navigate(redirectUrl);
    } else {
      navigate('/student/dashboard');
    }
    onClose();
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-backdrop" onClick={onClose}></div>
      <div className="auth-modal-card bio-card">
        {/* Close Button */}
        <button type="button" className="auth-modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Modal Header */}
        {mode !== 'verify' && (
          <div className="auth-modal-header text-center">
            <div className="auth-logo-badge">
              <Sparkles size={20} />
            </div>
            <h2 className="auth-modal-title">
              {mode === 'login' ? 'Sign In to Bio Edge' : 'Create Student Account'}
            </h2>
            <p className="auth-modal-subtitle">
              {courseTitle 
                ? `Sign in or register to complete your enrollment in ${courseTitle}`
                : 'Access your premium Biology coursework, live classes, and assessments'
              }
            </p>

            {/* Mode Switcher Tabs */}
            <div className="auth-mode-tabs">
              <button
                type="button"
                className={`auth-mode-tab ${mode === 'login' ? 'active' : ''}`}
                onClick={() => { setMode('login'); setErrorMessage(''); }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`auth-mode-tab ${mode === 'register' ? 'active' : ''}`}
                onClick={() => { setMode('register'); setErrorMessage(''); }}
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && mode !== 'verify' && (
          <div className="auth-alert error">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}



        {/* Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="modal-auth-form">
            {/* Student vs Teacher Switcher for Login */}
            <div className="mini-role-row">
              <button
                type="button"
                className={`mini-role-btn ${activeRole === 'student' ? 'active' : ''}`}
                onClick={() => setActiveRole('student')}
              >
                <GraduationCap size={15} /> Student
              </button>
              <button
                type="button"
                className={`mini-role-btn ${activeRole === 'teacher' ? 'active' : ''}`}
                onClick={() => setActiveRole('teacher')}
              >
                <ShieldCheck size={15} /> Teacher
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">
                {activeRole === 'teacher' ? 'Faculty Email' : 'Student Email'}
              </label>
              <div className="input-with-icon">
                <Mail size={17} className="input-icon" />
                <input
                  type="email"
                  required
                  placeholder={activeRole === 'teacher' ? 'afroza.tahmina@bioedge.edu' : 'tariqul@gmail.com'}
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="form-input with-icon"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon">
                <Lock size={17} className="input-icon" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="form-input with-icon"
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn btn-primary btn-block btn-lg mt-3">
              {isLoading ? 'Signing In...' : 'Sign In'} <ArrowRight size={18} />
            </button>
          </form>
        )}

        {/* Register Form */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="modal-auth-form">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <div className="input-with-icon">
                <UserIcon size={17} className="input-icon" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahir Faisal"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="form-input with-icon"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <div className="input-with-icon">
                  <Mail size={17} className="input-icon" />
                  <input
                    type="email"
                    required
                    placeholder="student@gmail.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="form-input with-icon"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone (WhatsApp) *</label>
                <div className="input-with-icon">
                  <Phone size={17} className="input-icon" />
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input with-icon"
                  />
                </div>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">College / School Name *</label>
                <div className="input-with-icon">
                  <Building2 size={17} className="input-icon" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Notre Dame College"
                    value={formData.institution}
                    onChange={e => setFormData({ ...formData, institution: e.target.value })}
                    className="form-input with-icon"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Target Exam</label>
                <select
                  value={formData.examYear}
                  onChange={e => setFormData({ ...formData, examYear: e.target.value })}
                  className="form-select"
                >
                  <option value="HSC 2026">HSC Examination 2026</option>
                  <option value="HSC 2027">HSC Examination 2027</option>
                  <option value="SSC 2027">SSC Examination 2027</option>
                </select>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Password * (Min 6 chars)</label>
                <div className="input-with-icon">
                  <Lock size={17} className="input-icon" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="form-input with-icon"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <div className="input-with-icon">
                  <Lock size={17} className="input-icon" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="form-input with-icon"
                  />
                </div>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn btn-primary btn-block btn-lg mt-3">
              {isLoading ? 'Creating Account...' : 'Continue to Email Verification'} <ArrowRight size={18} />
            </button>
          </form>
        )}

        {/* Google Authentication Button (After Form) */}
        {mode !== 'verify' && activeRole === 'student' && (
          <div className="social-auth-section">
            <div className="auth-divider">
              <span>Or continue with</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="btn btn-google-auth btn-block"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        )}

        {/* Verification Step */}
        {mode === 'verify' && (
          <VerifyEmailForm
            email={verifyEmailTarget}
            initialCode={initialOtpCode}
            onSuccess={handleVerificationSuccess}
            onCancel={() => setMode('register')}
            redirectNotice={courseTitle ? `You will be redirected back to enroll in ${courseTitle}` : undefined}
          />
        )}
      </div>

      <style>{`
        .auth-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }
        .auth-modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(18, 53, 36, 0.45);
          backdrop-filter: blur(4px);
        }
        .auth-modal-card {
          position: relative;
          z-index: 1001;
          width: 100%;
          max-width: 520px;
          background: #FFFFFF;
          padding: 2.5rem 2rem;
          border-radius: var(--radius-lg);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          max-height: 90vh;
          overflow-y: auto;
        }
        .auth-modal-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: #F3F4F6;
          border: none;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .auth-modal-close:hover {
          background: #E5E7EB;
          color: var(--text-primary);
        }

        .auth-modal-header {
          margin-bottom: 1.5rem;
        }
        .auth-logo-badge {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--light-green);
          color: var(--dark-green);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.75rem;
        }
        .auth-modal-title {
          font-size: 1.5rem;
          color: var(--dark-green);
          font-family: var(--font-heading);
          margin-bottom: 0.35rem;
        }
        .auth-modal-subtitle {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin-bottom: 1.25rem;
        }

        .auth-mode-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.35rem;
          background: var(--light-green-subtle);
          padding: 0.3rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }
        .auth-mode-tab {
          padding: 0.6rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          border: none;
          background: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .auth-mode-tab.active {
          background: #FFFFFF;
          color: var(--dark-green);
          box-shadow: var(--shadow-sm);
        }

        .btn-google-auth {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: #FFFFFF;
          color: #374151;
          border: 1.5px solid var(--border-color);
          font-weight: 600;
          font-size: 0.92rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-google-auth:hover {
          background: #F9FAFB;
          border-color: #D1D5DB;
        }

        .auth-divider {
          text-align: center;
          position: relative;
          margin: 1.25rem 0 1.25rem;
        }
        .auth-divider::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
          background: var(--border-color);
        }
        .auth-divider span {
          position: relative;
          background: #FFFFFF;
          padding: 0 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.03em;
        }

        .mini-role-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .mini-role-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.45rem;
          font-size: 0.8rem;
          font-weight: 600;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background: #FAFAFA;
          color: var(--text-muted);
          cursor: pointer;
        }
        .mini-role-btn.active {
          background: var(--light-green);
          border-color: var(--soft-green);
          color: var(--dark-green);
        }

        @media (max-width: 480px) {
          .auth-modal-overlay {
            padding: 0.75rem;
          }
          .auth-modal-card {
            padding: 1.75rem 1.15rem;
            max-height: 94vh;
          }
          .auth-modal-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};
