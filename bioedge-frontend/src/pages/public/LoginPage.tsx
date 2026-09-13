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
  AlertCircle
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const redirectParam = searchParams.get('redirect') || searchParams.get('from');
  const defaultRole = (searchParams.get('role') === 'teacher' ? 'teacher' : 'student') as 'student' | 'teacher';

  const [activeRole, setActiveRole] = useState<'student' | 'teacher'>(defaultRole);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  // If unverified account attempts login, switch to verification screen
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifyEmailTarget, setVerifyEmailTarget] = useState<string>('');
  const [initialOtpCode, setInitialOtpCode] = useState<string>('');

  const { login, loginWithGoogle, isLoading } = useAuth();
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
      setIsVerifying(true);
    } else {
      setErrorMessage(res.message || 'Invalid email or password.');
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

  return (
    <div className="login-page-wrapper section-padding">
      <div className="container">
        <div className="login-card-container bio-card">
          {/* Top Logo */}
          <div className="login-header text-center">
            <div className="login-logo-circle">
              <Sparkles size={24} />
            </div>
            <h1 className="login-brand-title">Bio Edge</h1>
            <p className="login-brand-subtitle">by Afroza Tahmina</p>
          </div>

          {!isVerifying ? (
            <div>
              {/* Role Switcher Tabs */}
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

              {/* Error Alert */}
              {errorMessage && (
                <div className="auth-alert error">
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Google Sign In */}
              {activeRole === 'student' && (
                <>
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
                    <span>Or with Email & Password</span>
                  </div>
                </>
              )}

              {/* Form */}
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
                      placeholder={activeRole === 'teacher' ? 'afroza.tahmina@bioedge.edu' : 'student@gmail.com'}
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

              {/* Bottom "Didn't have account? Create Account" Link */}
              <div className="auth-bottom-switch-link text-center">
                <p>
                  Didn't have account?{' '}
                  <Link to={`/register${redirectParam ? `?redirect=${encodeURIComponent(redirectParam)}` : ''}`}>
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            /* OTP Verification Screen */
            <VerifyEmailForm
              email={verifyEmailTarget}
              initialCode={initialOtpCode}
              onSuccess={() => handlePostAuthRedirect(activeRole)}
              onCancel={() => setIsVerifying(false)}
              redirectNotice={redirectParam ? 'You will be redirected after verification.' : undefined}
            />
          )}
        </div>
      </div>

      <style>{`
        .login-card-container {
          max-width: 490px;
          margin: 0 auto;
          padding: 2.75rem 2.25rem;
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

        .role-tabs-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          background: #F8FAF9;
          padding: 0.35rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
          border: 1px solid var(--border-color);
        }
        .role-tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
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
        .role-tab-btn.active {
          background: #FFFFFF;
          color: var(--dark-green);
          box-shadow: var(--shadow-sm);
        }

        .auth-bottom-switch-link {
          margin-top: 1.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-color);
          font-size: 0.92rem;
          color: var(--text-muted);
        }
        .auth-bottom-switch-link p {
          margin: 0;
        }
        .auth-bottom-switch-link a {
          color: var(--dark-green);
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 3px;
          margin-left: 0.25rem;
        }
        .auth-bottom-switch-link a:hover {
          color: #064E3B;
        }
      `}</style>
    </div>
  );
};
