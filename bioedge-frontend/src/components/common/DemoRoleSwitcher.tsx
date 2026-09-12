import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCourseData } from '../../context/CourseDataContext';
import { UserRole } from '../../types';
import { Sparkles, User, ShieldCheck, RefreshCw, ChevronUp, ChevronDown, Check } from 'lucide-react';

export const DemoRoleSwitcher: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { user, switchRole } = useAuth();
  const { resetToDefaultData } = useCourseData();
  const navigate = useNavigate();

  const handleRoleChange = (role: UserRole, path?: string) => {
    switchRole(role);
    if (path) navigate(path);
  };

  const handleReset = () => {
    if (window.confirm('Reset all course, student, test and feedback data to initial state?')) {
      resetToDefaultData();
      alert('Data reset to defaults successfully!');
    }
  };

  return (
    <div className="demo-role-switcher">
      <button 
        className="demo-switcher-toggle"
        onClick={() => setExpanded(!expanded)}
        title="Quick Role & Demo Switcher"
      >
        <Sparkles size={16} />
        <span>Live Role: {user ? (user.role === 'teacher' ? 'Teacher' : 'Student') : 'Guest'}</span>
        {expanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>

      {expanded && (
        <div className="demo-switcher-menu">
          <div className="demo-switcher-header">
            <span className="demo-switcher-title">Instant Role Switcher</span>
            <span className="demo-switcher-badge">Demo Mode</span>
          </div>

          <div className="demo-role-options">
            <button
              onClick={() => handleRoleChange('student', '/student/dashboard')}
              className={`demo-role-btn ${user?.role === 'student' ? 'active' : ''}`}
            >
              <div className="demo-role-info">
                <User size={16} />
                <div>
                  <div className="role-title">Student Portal</div>
                  <div className="role-desc">Tariqul Islam (BE-2026-001)</div>
                </div>
              </div>
              {user?.role === 'student' && <Check size={16} className="check-icon" />}
            </button>

            <button
              onClick={() => handleRoleChange('teacher', '/teacher/dashboard')}
              className={`demo-role-btn ${user?.role === 'teacher' ? 'active' : ''}`}
            >
              <div className="demo-role-info">
                <ShieldCheck size={16} />
                <div>
                  <div className="role-title">Teacher Management</div>
                  <div className="role-desc">Afroza Tahmina (Lead Faculty)</div>
                </div>
              </div>
              {user?.role === 'teacher' && <Check size={16} className="check-icon" />}
            </button>

            <button
              onClick={() => handleRoleChange('guest', '/')}
              className={`demo-role-btn ${!user ? 'active' : ''}`}
            >
              <div className="demo-role-info">
                <Sparkles size={16} />
                <div>
                  <div className="role-title">Public Website (Guest)</div>
                  <div className="role-desc">Prospective Student View</div>
                </div>
              </div>
              {!user && <Check size={16} className="check-icon" />}
            </button>
          </div>

          <div className="demo-switcher-footer">
            <button onClick={handleReset} className="demo-reset-btn">
              <RefreshCw size={13} /> Reset Mock Data
            </button>
          </div>
        </div>
      )}

      <style>{`
        .demo-role-switcher {
          position: fixed;
          bottom: 1.5rem;
          left: 1.5rem;
          z-index: 9000;
          font-family: var(--font-sans);
        }
        .demo-switcher-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #1F2922;
          color: #FFFFFF;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.6rem 1rem;
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .demo-switcher-toggle:hover {
          background: var(--dark-green);
          transform: translateY(-2px);
        }
        .demo-switcher-menu {
          position: absolute;
          bottom: calc(100% + 0.75rem);
          left: 0;
          width: 290px;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          padding: 1rem;
          animation: slideUp 0.2s ease;
        }
        .demo-switcher-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .demo-switcher-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--dark-green);
        }
        .demo-switcher-badge {
          background: var(--light-green);
          color: var(--dark-green);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-full);
        }
        .demo-role-options {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .demo-role-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius-md);
          background: var(--light-green-subtle);
          border: 1px solid transparent;
          text-align: left;
          transition: all 0.15s ease;
        }
        .demo-role-btn:hover {
          background: var(--light-green);
          border-color: var(--border-color);
        }
        .demo-role-btn.active {
          background: #FFFFFF;
          border-color: var(--primary-green);
          box-shadow: var(--shadow-sm);
        }
        .demo-role-info {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: var(--text-dark);
        }
        .role-title {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--dark-green);
        }
        .role-desc {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .check-icon {
          color: var(--primary-green);
        }
        .demo-switcher-footer {
          margin-top: 0.75rem;
          padding-top: 0.5rem;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          justify-content: flex-end;
        }
        .demo-reset-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          padding: 0.3rem 0.6rem;
          border-radius: var(--radius-sm);
        }
        .demo-reset-btn:hover {
          background: #F3F4F6;
          color: var(--error);
        }
      `}</style>
    </div>
  );
};
