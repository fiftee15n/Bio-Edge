import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Lock, 
  Mail, 
  LogIn, 
  Sparkles, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight,
  UserCheck
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = (searchParams.get('role') === 'teacher' ? 'teacher' : 'student') as 'student' | 'teacher';

  const [activeRole, setActiveRole] = useState<'student' | 'teacher'>(defaultRole);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(activeRole, email, password);
    if (activeRole === 'teacher') {
      navigate('/teacher/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

  const handleQuickDemoLogin = (role: 'student' | 'teacher') => {
    login(role);
    if (role === 'teacher') {
      navigate('/teacher/dashboard');
    } else {
      navigate('/student/dashboard');
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

          {/* Role Tabs */}
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
                  placeholder={activeRole === 'teacher' ? 'afroza.tahmina@bioedge.edu' : 'tariqul@gmail.com'}
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
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input with-icon"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg mt-3">
              <LogIn size={18} /> Sign In to {activeRole === 'teacher' ? 'Teacher Management' : 'Student Portal'}
            </button>
          </form>

          {/* Quick Demo Login Switcher */}
          <div className="quick-demo-section">
            <div className="demo-divider">
              <span>Quick Demo Instant Sign-In</span>
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

          <div className="login-footer-links text-center">
            <p>
              Don't have an account? <Link to="/enroll">Enroll in the Program</Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .login-card-container {
          max-width: 480px;
          margin: 0 auto;
          padding: 3rem 2.5rem;
        }
        .login-header {
          margin-bottom: 2rem;
        }
        .login-logo-circle {
          width: 54px;
          height: 54px;
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
          background: var(--light-green-subtle);
          padding: 0.35rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.75rem;
          border: 1px solid var(--border-color);
        }
        .role-tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.65rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
        }
        .role-tab-btn.active {
          background: #FFFFFF;
          color: var(--dark-green);
          box-shadow: var(--shadow-sm);
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
          margin-top: 2rem;
          padding-top: 1.5rem;
        }
        .demo-divider {
          text-align: center;
          position: relative;
          margin-bottom: 1.25rem;
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
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.03em;
        }
        .demo-buttons-grid {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .login-footer-links {
          margin-top: 1.75rem;
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
