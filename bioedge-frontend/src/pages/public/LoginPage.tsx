import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { VerifyEmailForm } from '../../components/common/VerifyEmailForm';
import { 
  Lock, 
  Mail, 
  LogIn, 
  Sparkles, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight,
  User as UserIcon,
  Phone,
  Building2,
  AlertCircle
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const redirectParam = searchParams.get('redirect') || searchParams.get('from');
  const defaultRole = (searchParams.get('role') === 'teacher' ? 'teacher' : 'student') as 'student' | 'teacher';
  const defaultTab = searchParams.get('tab') === 'register' ? 'register' : 'login';

  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'verify'>(defaultTab);
  const [activeRole, setActiveRole] = useState<'student' | 'teacher'>(defaultRole);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Form states
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  const [regData, setRegData] = useState({
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

  const { login, register, loginWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();

  const handlePostAuthRedirect = (role: 'student' | 'teacher') => {
    if (redirectParam) {
      navigate(redirectParam);
    } else if (role === 'teacher') {
      navigate('/teacher/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const res = await login(loginEmail, loginPassword, activeRole);
    if (res.success) {
      handlePostAuthRedirect(activeRole);
    } else if (res.requiresVerification && res.email) {
      setVerifyEmailTarget(res.email);
      setInitialOtpCode(res.verificationCode || '');
      setActiveTab('verify');
    } else {
      setErrorMessage(res.message || 'Invalid email or password.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (regData.password !== regData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const res = await register({
      name: regData.name,
      email: regData.email,
      password: regData.password,
      confirmPassword: regData.confirmPassword,
      phone: regData.phone,
      institution: regData.institution,
      examYear: regData.examYear
    });

    if (res.success && res.requiresVerification) {
      setVerifyEmailTarget(res.email || regData.email);
      setInitialOtpCode(res.verificationCode || '');
      setActiveTab('verify');
    } else if (res.success && res.user) {
      handlePostAuthRedirect('student');
    } else {
      setErrorMessage(res.message || 'Registration failed.');
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    const res = await loginWithGoogle();
    if (res.success) {
      handlePostAuthRedirect('student');
    } else {
      setErrorMessage(res.message || 'Google sign-in failed');
    }
  };

  const handleQuickDemoLogin = async (role: 'student' | 'teacher') => {
    const res = await login(
      role === 'teacher' ? 'afroza.tahmina@bioedge.edu' : 'tariqul@gmail.com',
      role === 'teacher' ? 'teacher123' : 'student123',
      role
    );
    if (res.success) {
      handlePostAuthRedirect(role);
    }
  };

  return (
    <div className="login-page-wrapper section-padding">
      <div className="container">
        <div className="login-card-container bio-card">
          {/* Top Logo */}
          <div className="login-header text-center">
            <div className="login-logo-circle">
              <Sparkles size={24} />
            </div>
            <h1 className="login-brand-title">Bio Edz</h1>
            <p className="login-brand-subtitle">by Afroza Tahmina</p>
          </div>

          {activeTab !== 'verify' && (
            <>
              {/* Login vs Register Mode Tabs */}
              <div className="main-auth-tabs">
                <button
                  type="button"
                  onClick={() => { setActiveTab('login'); setErrorMessage(''); }}
                  className={`main-auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('register'); setErrorMessage(''); }}
                  className={`main-auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                >
                  Create Account
                </button>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="auth-alert error">
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="btn-google-auth-full"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                  <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="auth-divider">
                <span>Or Continue with Email</span>
              </div>
            </>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <div>
              {/* Role Tabs for Login */}
              <div className="role-tabs-row">
                <button
                  type="button"
                  onClick={() => setActiveRole('student')}
                  className={`role-tab-btn ${activeRole === 'student' ? 'active' : ''}`}
                >
                  <GraduationCap size={18} />
                  <span>Student Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRole('teacher')}
                  className={`role-tab-btn ${activeRole === 'teacher' ? 'active' : ''}`}
                >
                  <ShieldCheck size={18} />
                  <span>Teacher Login</span>
                </button>
              </div>

              <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                  <label className="form-label">
                    {activeRole === 'teacher' ? 'Faculty Email' : 'Student Email / ID'}
                  </label>
                  <div className="input-with-icon">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      required
                      placeholder={activeRole === 'teacher' ? 'afroza.tahmina@bioedge.edu' : 'tariqul@gmail.com'}
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="form-input with-icon"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-with-icon">
                    <Lock size={18} className="input-icon" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="form-input with-icon"
                    />
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="btn btn-primary btn-block btn-lg mt-3">
                  <LogIn size={18} /> {isLoading ? 'Signing In...' : `Sign In to ${activeRole === 'teacher' ? 'Teacher Management' : 'Student Portal'}`}
                </button>
              </form>

              {/* Quick Demo Login Switcher */}
              <div className="quick-demo-section">
                <div className="demo-divider">
                  <span>Instant Quick Sign-In</span>
                </div>

                <div className="demo-buttons-grid">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('student')}
                    className="btn btn-secondary btn-sm"
                  >
                    <GraduationCap size={16} /> Enter as Student (Tariqul)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('teacher')}
                    className="btn btn-outline btn-sm"
                  >
                    <ShieldCheck size={16} /> Enter as Teacher (Afroza)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="register-form">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <div className="input-with-icon">
                  <UserIcon size={18} className="input-icon" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahir Faisal"
                    value={regData.name}
                    onChange={e => setRegData({ ...regData, name: e.target.value })}
                    className="form-input with-icon"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    required
                    placeholder="student@gmail.com"
                    value={regData.email}
                    onChange={e => setRegData({ ...regData, email: e.target.value })}
                    className="form-input with-icon"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number (WhatsApp) *</label>
                <div className="input-with-icon">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={regData.phone}
                    onChange={e => setRegData({ ...regData, phone: e.target.value })}
                    className="form-input with-icon"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">School / College Name *</label>
                <div className="input-with-icon">
                  <Building2 size={18} className="input-icon" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Notre Dame College"
                    value={regData.institution}
                    onChange={e => setRegData({ ...regData, institution: e.target.value })}
                    className="form-input with-icon"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password * (Minimum 6 characters)</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={regData.password}
                    onChange={e => setRegData({ ...regData, password: e.target.value })}
                    className="form-input with-icon"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={regData.confirmPassword}
                    onChange={e => setRegData({ ...regData, confirmPassword: e.target.value })}
                    className="form-input with-icon"
                  />
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="btn btn-primary btn-block btn-lg mt-3">
                {isLoading ? 'Creating Account...' : 'Continue to Email Verification'} <ArrowRight size={18} />
              </button>
            </form>
          )}

          {/* OTP Verification Screen */}
          {activeTab === 'verify' && (
            <VerifyEmailForm
              email={verifyEmailTarget}
              initialCode={initialOtpCode}
              onSuccess={() => handlePostAuthRedirect('student')}
              onCancel={() => setActiveTab('register')}
              redirectNotice={redirectParam ? 'Your enrollment selection will be preserved.' : undefined}
            />
          )}

          {activeTab !== 'verify' && (
            <div className="login-footer-links text-center">
              <p>
                Interested in enrolling? <Link to="/enroll">View Course Enrollment & Pricing</Link>
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .login-card-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 2.5rem 2.25rem;
        }
        .login-header {
          margin-bottom: 1.5rem;
        }
        .login-logo-circle {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.75rem;
        }
        .login-brand-title {
          font-size: 1.75rem;
          color: var(--dark-green);
          font-family: var(--font-heading);
          line-height: 1.1;
        }
        .login-brand-subtitle {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .main-auth-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.35rem;
          background: var(--light-green-subtle);
          padding: 0.35rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
          border: 1px solid var(--border-color);
        }
        .main-auth-tab {
          padding: 0.65rem;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          border: none;
          background: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .main-auth-tab.active {
          background: #FFFFFF;
          color: var(--dark-green);
          box-shadow: var(--shadow-sm);
        }

        .btn-google-auth-full {
          width: 100%;
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
          margin-bottom: 1.25rem;
        }
        .btn-google-auth-full:hover {
          background: #F9FAFB;
          border-color: #D1D5DB;
        }

        .auth-divider {
          text-align: center;
          position: relative;
          margin-bottom: 1.25rem;
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

        .role-tabs-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          background: #F8FAF9;
          padding: 0.3rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1.25rem;
          border: 1px solid var(--border-color);
        }
        .role-tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.55rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          border: none;
          background: none;
          cursor: pointer;
        }
        .role-tab-btn.active {
          background: var(--light-green);
          color: var(--dark-green);
        }

        .input-with-icon {
          position: relative;
        }
        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        .form-input.with-icon {
          padding-left: 2.75rem;
        }

        .quick-demo-section {
          margin-top: 1.75rem;
          padding-top: 1.25rem;
        }
        .demo-divider {
          text-align: center;
          position: relative;
          margin-bottom: 1rem;
        }
        .demo-divider::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
          background: var(--border-color);
        }
        .demo-divider span {
          position: relative;
          background: #FFFFFF;
          padding: 0 0.75rem;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.03em;
        }
        .demo-buttons-grid {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .login-footer-links {
          margin-top: 1.5rem;
          font-size: 0.88rem;
          color: var(--text-muted);
        }
        .login-footer-links a {
          color: var(--dark-green);
          font-weight: 600;
        }
        .login-footer-links a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
