import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { VerifyEmailForm } from '../../components/common/VerifyEmailForm';
import { 
  Lock, 
  Mail, 
  Sparkles, 
  ArrowRight,
  User as UserIcon,
  Phone,
  Building2,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isBangla } = useLanguage();
  const redirectParam = searchParams.get('redirect') || searchParams.get('from');

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
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
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifyEmailTarget, setVerifyEmailTarget] = useState<string>('');
  const [initialOtpCode, setInitialOtpCode] = useState<string>('');

  const { register, loginWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();

  const handlePostAuthRedirect = () => {
    if (redirectParam) {
      navigate(redirectParam);
    } else {
      navigate('/student/dashboard');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage(isBangla ? 'উভয় পাসওয়ার্ড মেলেনি।' : 'Passwords do not match.');
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
      setIsVerifying(true);
    } else if (res.success && res.user) {
      handlePostAuthRedirect();
    } else {
      setErrorMessage(res.message || (isBangla ? 'রেজিস্ট্রেশন ব্যর্থ হয়েছে।' : 'Registration failed.'));
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    const res = await loginWithGoogle();
    if (res.success) {
      handlePostAuthRedirect();
    } else {
      setErrorMessage(res.message || (isBangla ? 'গুগল সাইন-ইন ব্যর্থ হয়েছে।' : 'Google sign-in failed'));
    }
  };

  return (
    <div className="register-page-wrapper section-padding">
      <div className="container">
        <div className="register-card-container bio-card">
          {/* Top Logo */}
          <div className="register-header text-center">
            <div className="register-logo-circle">
              <Sparkles size={24} />
            </div>
            <h1 className="register-brand-title">Bio Edge</h1>
            <p className="register-brand-subtitle">{isBangla ? 'আফরোজা তাহমিনার সাথে' : 'by Afroza Tahmina'}</p>
          </div>

          {!isVerifying ? (
            <div>
              <div className="register-title-block text-center">
                <h2 className="register-main-heading">{isBangla ? 'শিক্ষার্থী অ্যাকাউন্ট তৈরি করুন' : 'Create Your Student Account'}</h2>
                <p className="register-main-sub">
                  {isBangla 
                    ? 'এইচএসসি ও এসএসসি পরীক্ষার্থীদের জন্য বিশেষায়িত জীববিজ্ঞান প্রস্তুতি প্ল্যাটফর্ম।' 
                    : 'Join the focused Biology preparation platform for HSC & SSC examinees.'}
                </p>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="auth-alert error">
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleRegister} className="register-form">
                <div className="form-group">
                  <label className="form-label">{isBangla ? 'পূর্ণ নাম *' : 'Full Name *'}</label>
                  <div className="input-with-icon">
                    <UserIcon size={18} className="input-icon" />
                    <input
                      type="text"
                      required
                      placeholder={isBangla ? 'যেমন: মাহির ফয়সাল' : 'e.g. Mahir Faisal'}
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="form-input with-icon"
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">{isBangla ? 'ইমেইল ঠিকানা *' : 'Email Address *'}</label>
                    <div className="input-with-icon">
                      <Mail size={18} className="input-icon" />
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
                    <label className="form-label">{isBangla ? 'ফোন নম্বর (হোয়াটসঅ্যাপ) *' : 'Phone Number (WhatsApp) *'}</label>
                    <div className="input-with-icon">
                      <Phone size={18} className="input-icon" />
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
                    <label className="form-label">{isBangla ? 'স্কুল বা কলেজের নাম *' : 'School / College Name *'}</label>
                    <div className="input-with-icon">
                      <Building2 size={18} className="input-icon" />
                      <input
                        type="text"
                        required
                        placeholder={isBangla ? 'যেমন: নটর ডেম কলেজ' : 'e.g. Notre Dame College'}
                        value={formData.institution}
                        onChange={e => setFormData({ ...formData, institution: e.target.value })}
                        className="form-input with-icon"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{isBangla ? 'টার্গেট পরীক্ষা' : 'Target Exam'}</label>
                    <select
                      value={formData.examYear}
                      onChange={e => setFormData({ ...formData, examYear: e.target.value })}
                      className="form-select"
                    >
                      <option value="HSC 2026">{isBangla ? 'এইচএসসি পরীক্ষা ২০২৬' : 'HSC Examination 2026'}</option>
                      <option value="HSC 2027">{isBangla ? 'এইচএসসি পরীক্ষা ২০২৭' : 'HSC Examination 2027'}</option>
                      <option value="SSC 2027">{isBangla ? 'এসএসসি পরীক্ষা ২০২৭' : 'SSC Examination 2027'}</option>
                      <option value="Alim / Other">{isBangla ? 'আলিম / অন্যান্য' : 'Alim / Other'}</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">{isBangla ? 'পাসওয়ার্ড * (কমপক্ষে ৬ অক্ষর)' : 'Password * (Min 6 chars)'}</label>
                    <div className="input-with-icon">
                      <Lock size={18} className="input-icon" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                        className="form-input with-icon has-password-toggle"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="password-toggle-btn"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{isBangla ? 'পাসওয়ার্ড নিশ্চিত করুন *' : 'Confirm Password *'}</label>
                    <div className="input-with-icon">
                      <Lock size={18} className="input-icon" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="form-input with-icon has-password-toggle"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(prev => !prev)}
                        className="password-toggle-btn"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="btn btn-primary btn-block btn-lg mt-3">
                  {isLoading 
                    ? (isBangla ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'Creating Account...') 
                    : (isBangla ? 'ইমেইল ভেরিফিকেশনে এগিয়ে যান' : 'Continue to Email Verification')} <ArrowRight size={18} />
                </button>
              </form>

              {/* Google Sign In (After form) */}
              <div className="auth-divider">
                <span>{isBangla ? 'অথবা এর মাধ্যমে এগিয়ে যান' : 'Or continue with'}</span>
              </div>

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
                <span>{isBangla ? 'গুগল দিয়ে এগিয়ে যান' : 'Continue with Google'}</span>
              </button>

              {/* Bottom "Already have an account? Sign In" Link */}
              <div className="auth-bottom-switch-link text-center">
                <p>
                  {isBangla ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'Already have an account?'}{' '}
                  <Link to={`/login${redirectParam ? `?redirect=${encodeURIComponent(redirectParam)}` : ''}`}>
                    {isBangla ? 'লগইন করুন' : 'Sign In'}
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            /* OTP Verification Screen */
            <VerifyEmailForm
              email={verifyEmailTarget}
              initialCode={initialOtpCode}
              onSuccess={handlePostAuthRedirect}
              onCancel={() => setIsVerifying(false)}
              redirectNotice={redirectParam ? (isBangla ? 'ভেরিফিকেশনের পর আপনাকে রিডাইরেক্ট করা হবে।' : 'You will be redirected after verification.') : undefined}
            />
          )}
        </div>
      </div>

      <style>{`
        .register-card-container {
          max-width: 540px;
          margin: 0 auto;
          padding: 2.75rem 2.25rem;
        }
        .register-header {
          margin-bottom: 1.25rem;
        }
        .register-logo-circle {
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
        .register-brand-title {
          font-size: 1.75rem;
          color: var(--dark-green);
          font-family: var(--font-heading);
          line-height: 1.1;
        }
        .register-brand-subtitle {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .register-title-block {
          margin-bottom: 1.5rem;
        }
        .register-main-heading {
          font-size: 1.4rem;
          color: var(--dark-green);
          font-family: var(--font-heading);
          margin-bottom: 0.25rem;
        }
        .register-main-sub {
          font-size: 0.88rem;
          color: var(--text-muted);
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

        @media (max-width: 480px) {
          .register-card-container {
            padding: 1.75rem 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};
