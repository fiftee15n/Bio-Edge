import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { VerifyEmailForm } from '../../components/common/VerifyEmailForm';
import { useLanguage } from '../../context/LanguageContext';
import { Mail, ArrowLeft, GraduationCap } from 'lucide-react';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isBangla } = useLanguage();

  const urlEmail = searchParams.get('email') || '';
  const urlCode = searchParams.get('code') || '';
  const redirectParam = searchParams.get('redirect') || '';

  const [inputEmail, setInputEmail] = useState<string>(urlEmail);
  const [activeEmail, setActiveEmail] = useState<string>(urlEmail);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputEmail.trim()) {
      setActiveEmail(inputEmail.trim());
    }
  };

  const handleSuccess = () => {
    if (redirectParam) {
      navigate(redirectParam);
    } else {
      navigate('/student/dashboard');
    }
  };

  return (
    <div className="verify-page-wrapper section-padding">
      <div className="container">
        <div className="verify-page-card bio-card">
          {activeEmail ? (
            <VerifyEmailForm
              email={activeEmail}
              initialCode={urlCode}
              onSuccess={handleSuccess}
              onCancel={() => setActiveEmail('')}
              redirectNotice={redirectParam ? (isBangla ? 'ভেরিফিকেশনের পর আপনাকে রিডাইরেক্ট করা হবে।' : 'You will be redirected after verification.') : undefined}
            />
          ) : (
            <div className="email-prompt-screen text-center">
              <div className="verify-icon-bubble">
                <GraduationCap size={32} />
              </div>
              <h2 className="verify-title">
                {isBangla ? 'ইমেইল ভেরিফিকেশন' : 'Email Verification'}
              </h2>
              <p className="verify-subtitle">
                {isBangla
                  ? 'আপনার অ্যাকাউন্টের সাথে যুক্ত ইমেইল ঠিকানাটি লিখুন'
                  : 'Enter the email address associated with your Bio Edge account to verify'}
              </p>

              <form onSubmit={handleEmailSubmit} className="email-input-form mt-4">
                <div className="form-group mb-3 text-start">
                  <label className="form-label">{isBangla ? 'ইমেইল ঠিকানা' : 'Email Address'}</label>
                  <div className="input-group">
                    <span className="input-icon"><Mail size={18} /></span>
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={inputEmail}
                      onChange={e => setInputEmail(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-lg">
                  {isBangla ? 'কোড পাঠাতে এগিয়ে যান' : 'Continue to Verification'}
                </button>
              </form>

              <div className="mt-4">
                <Link to="/login" className="btn btn-ghost btn-sm inline-flex items-center gap-1">
                  <ArrowLeft size={16} />
                  <span>{isBangla ? 'লগইন পেজে ফিরুন' : 'Back to Login'}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .verify-page-wrapper {
          min-height: calc(100vh - 180px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F8FAF9;
        }
        .verify-page-card {
          max-width: 490px;
          margin: 0 auto;
          padding: 2.5rem 2rem;
          background: #FFFFFF;
          border-radius: var(--radius-lg, 12px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid var(--border-color);
        }
        .email-input-form {
          max-width: 380px;
          margin: 0 auto;
        }
        @media (max-width: 480px) {
          .verify-page-card {
            padding: 1.75rem 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};
