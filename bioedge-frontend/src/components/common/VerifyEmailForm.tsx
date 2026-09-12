import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Clock, RefreshCw, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface VerifyEmailFormProps {
  email: string;
  initialCode?: string;
  onSuccess: () => void;
  onCancel?: () => void;
  redirectNotice?: string;
}

export const VerifyEmailForm: React.FC<VerifyEmailFormProps> = ({
  email,
  initialCode = '',
  onSuccess,
  onCancel,
  redirectNotice
}) => {
  const { verifyEmail, resendVerificationCode, isLoading } = useAuth();
  const [digits, setDigits] = useState<string[]>(() => {
    if (initialCode && initialCode.length === 6) {
      return initialCode.split('');
    }
    return ['', '', '', '', '', ''];
  });

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [activeCodeHint, setActiveCodeHint] = useState<string>(initialCode);

  // 10 minutes (600 seconds) expiry countdown
  const [timeLeft, setTimeLeft] = useState<number>(600);
  // 60 seconds resend cooldown
  const [resendCooldown, setResendCooldown] = useState<number>(60);
  const [isResending, setIsResending] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Expiration countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Resend cooldown countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Auto focus first empty input box
  useEffect(() => {
    const firstEmptyIndex = digits.findIndex(d => d === '');
    if (firstEmptyIndex !== -1 && inputRefs.current[firstEmptyIndex]) {
      inputRefs.current[firstEmptyIndex]?.focus();
    }
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    setErrorMessage('');
    const cleanVal = value.replace(/\D/g, '');

    if (!cleanVal) {
      const newDigits = [...digits];
      newDigits[index] = '';
      setDigits(newDigits);
      return;
    }

    if (cleanVal.length > 1) {
      // Pasted full 6-digit code
      const pastedDigits = cleanVal.slice(0, 6).split('');
      const newDigits = [...digits];
      pastedDigits.forEach((char, i) => {
        if (i < 6) newDigits[i] = char;
      });
      setDigits(newDigits);
      const nextFocus = Math.min(pastedDigits.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = cleanVal[cleanVal.length - 1];
    setDigits(newDigits);

    // Auto-advance to next box
    if (index < 5 && cleanVal) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newDigits = ['', '', '', '', '', ''];
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newDigits[i] = char;
    });
    setDigits(newDigits);
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = digits.join('');

    if (fullCode.length !== 6) {
      setErrorMessage('Please enter all 6 digits of your verification code.');
      return;
    }

    if (timeLeft <= 0) {
      setErrorMessage('Verification code has expired. Please click "Resend Code" below.');
      return;
    }

    setErrorMessage('');
    const res = await verifyEmail(email, fullCode);

    if (res.success) {
      setSuccessMessage('Email verified successfully! Preparing your session...');
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } else {
      setErrorMessage(res.message || 'Invalid verification code. Please check and try again.');
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || isResending) return;

    setIsResending(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await resendVerificationCode(email);
      if (res.success) {
        setSuccessMessage('A fresh 6-digit verification code has been sent!');
        setTimeLeft(600); // Reset to 10 minutes
        setResendCooldown(60); // Reset 60s cooldown
        if (res.verificationCode) {
          setActiveCodeHint(res.verificationCode);
        }
      } else {
        setErrorMessage(res.message || 'Failed to resend code. Please try again.');
      }
    } finally {
      setIsResending(false);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className="verify-email-form-wrapper">
      <div className="verify-header text-center">
        <div className="verify-icon-bubble">
          <Mail size={28} />
        </div>
        <h2 className="verify-title">Verify Your Email Address</h2>
        <p className="verify-subtitle">
          We sent a 6-digit verification code to <strong>{email}</strong>
        </p>

        {redirectNotice && (
          <div className="redirect-notice-pill">
            <Sparkles size={14} />
            <span>{redirectNotice}</span>
          </div>
        )}
      </div>

      {/* Dev code helper badge */}
      {activeCodeHint && (
        <div className="dev-code-hint">
          <div className="dev-hint-content">
            <ShieldCheck size={16} />
            <span>Verification Code: <strong>{activeCodeHint}</strong></span>
          </div>
          <button 
            type="button" 
            className="dev-fill-btn"
            onClick={() => setDigits(activeCodeHint.split(''))}
          >
            Auto-fill
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="auth-alert error">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="auth-alert success">
          <CheckCircle2 size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleVerify} className="otp-form">
        <div className="otp-boxes-grid">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={el => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleDigitChange(idx, e.target.value)}
              onKeyDown={e => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              className={`otp-digit-box ${digit ? 'filled' : ''}`}
              autoComplete="one-time-code"
            />
          ))}
        </div>

        <div className="otp-meta-row">
          <div className={`otp-timer ${timeLeft < 60 ? 'warning' : ''}`}>
            <Clock size={15} />
            <span>Expires in: <strong>{formattedTime}</strong></span>
          </div>

          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0 || isResending}
            className="btn-resend-link"
          >
            <RefreshCw size={14} className={isResending ? 'spin' : ''} />
            {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend code'}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading || digits.join('').length !== 6}
          className="btn btn-primary btn-block btn-lg mt-3"
        >
          {isLoading ? 'Verifying Code...' : 'Verify Email & Continue'} <ArrowRight size={18} />
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-ghost btn-block mt-2"
          >
            Cancel & Change Email
          </button>
        )}
      </form>

      <style>{`
        .verify-email-form-wrapper {
          padding: 0.5rem 0;
        }
        .verify-header {
          margin-bottom: 1.75rem;
        }
        .verify-icon-bubble {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--light-green);
          color: var(--dark-green);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
        .verify-title {
          font-size: 1.5rem;
          color: var(--dark-green);
          font-family: var(--font-heading);
          margin-bottom: 0.4rem;
        }
        .verify-subtitle {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.4;
        }
        .verify-subtitle strong {
          color: var(--text-primary);
        }

        .redirect-notice-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--light-green-subtle);
          border: 1px solid var(--border-color);
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          color: var(--dark-green);
          font-weight: 500;
          margin-top: 0.75rem;
        }

        .dev-code-hint {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #F0FDF4;
          border: 1px dashed #86EFAC;
          padding: 0.6rem 0.9rem;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          color: #166534;
          margin-bottom: 1.25rem;
        }
        .dev-hint-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .dev-fill-btn {
          background: #166534;
          color: #FFFFFF;
          border: none;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }

        .auth-alert {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-size: 0.88rem;
          margin-bottom: 1.25rem;
        }
        .auth-alert.error {
          background: #FEF2F2;
          color: #B91C1C;
          border: 1px solid #FECACA;
        }
        .auth-alert.success {
          background: #F0FDF4;
          color: #15803D;
          border: 1px solid #BBF7D0;
        }

        .otp-boxes-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0.6rem;
          margin-bottom: 1.25rem;
        }
        .otp-digit-box {
          height: 56px;
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          border: 1.5px solid var(--border-color);
          border-radius: var(--radius-sm);
          background: #FFFFFF;
          color: var(--dark-green);
          transition: all 0.2s ease;
        }
        .otp-digit-box:focus {
          outline: none;
          border-color: var(--dark-green);
          box-shadow: 0 0 0 3px rgba(22, 101, 52, 0.12);
        }
        .otp-digit-box.filled {
          background: var(--light-green-subtle);
          border-color: var(--soft-green);
        }

        .otp-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .otp-timer {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .otp-timer.warning {
          color: #DC2626;
        }
        .btn-resend-link {
          background: none;
          border: none;
          color: var(--dark-green);
          font-weight: 600;
          font-size: 0.82rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          cursor: pointer;
        }
        .btn-resend-link:disabled {
          color: var(--text-muted);
          cursor: not-allowed;
          opacity: 0.7;
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
