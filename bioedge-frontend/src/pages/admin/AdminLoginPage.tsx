import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  LogIn, 
  Sparkles, 
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const res = await login(email, password, 'admin');
    if (res.success && res.user && res.user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      setErrorMessage(res.message || 'Invalid administrator credentials.');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card bio-card">
        {/* Top Branding */}
        <div className="admin-login-header text-center">
          <div className="admin-login-logo">
            <ShieldCheck size={28} />
          </div>
          <span className="admin-security-pill">
            <Sparkles size={13} /> Internal Management Gateway
          </span>
          <h1 className="admin-login-title">Admin Portal Login</h1>
          <p className="admin-login-subtitle">
            Restricted access for Bio Edge system administrators to audit enrollments and authorize course access.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="admin-auth-error">
            <AlertCircle size={17} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label className="form-label">Administrator Email</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                required
                placeholder="admin.bioedge@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input with-icon"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary btn-block btn-lg mt-3"
          >
            <LogIn size={18} /> {isLoading ? 'Authenticating...' : 'Sign In to Admin Portal'}
          </button>
        </form>

        {/* Return to Public Website */}
        <div className="admin-login-footer text-center">
          <Link to="/" className="back-home-link">
            <ArrowLeft size={15} /> Return to Public Website
          </Link>
        </div>
      </div>

      <style>{`
        .admin-login-wrapper {
          min-height: 100vh;
          background: #FAFCFA;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.25rem;
        }

        .admin-login-card {
          width: 100%;
          max-width: 480px;
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-md);
          padding: 2.75rem 2.25rem;
        }

        .admin-login-header {
          margin-bottom: 1.75rem;
        }

        .admin-login-logo {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.85rem;
          box-shadow: 0 4px 14px rgba(41, 78, 54, 0.22);
        }

        .admin-security-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .admin-login-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          font-weight: 800;
          margin-bottom: 0.3rem;
        }

        .admin-login-subtitle {
          font-size: 0.86rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .admin-auth-error {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          color: #DC2626;
          font-size: 0.85rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1.25rem;
        }

        .admin-login-form .form-group {
          margin-bottom: 1.15rem;
          text-align: left;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-with-icon .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-light);
          pointer-events: none;
        }

        .input-with-icon .form-input.with-icon {
          padding-left: 2.75rem;
        }

        .admin-login-footer {
          margin-top: 1.75rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-subtle);
        }

        .back-home-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.86rem;
          color: var(--text-muted);
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .back-home-link:hover {
          color: var(--dark-green);
        }

        @media (max-width: 480px) {
          .admin-login-wrapper {
            padding: 1.25rem 0.85rem;
          }
          .admin-login-card {
            padding: 1.75rem 1.25rem;
          }
          .admin-login-title {
            font-size: 1.45rem;
          }
          .admin-login-subtitle {
            font-size: 0.82rem;
          }
        }
      `}</style>
    </div>
  );
};
