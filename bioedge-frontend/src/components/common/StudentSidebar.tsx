import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Target, 
  Award, 
  CheckCircle2, 
  BarChart3, 
  MessageSquare, 
  Bell, 
  User, 
  LogOut, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourseData } from '../../context/CourseDataContext';

export const StudentSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { feedbacks, notifications } = useCourseData();

  const unreadFeedbacks = feedbacks.filter(f => f.unread).length;
  const unreadNotifs = notifications.filter(n => !n.read).length;

  const links = [
    { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Course', path: '/student/course', icon: BookOpen },
    { name: 'Schedule', path: '/student/classes', icon: Calendar },
    { name: 'Practice', path: '/student/practice', icon: Target },
    { name: 'Model Tests', path: '/student/model-tests', icon: Award },
    { name: 'Results', path: '/student/results', icon: CheckCircle2 },
    { name: 'Analytics', path: '/student/analytics', icon: BarChart3 },
    { name: 'Feedback', path: '/student/feedback', icon: MessageSquare, badge: unreadFeedbacks },
    { name: 'Notifications', path: '/student/notifications', icon: Bell, badge: unreadNotifs },
    { name: 'Profile', path: '/student/profile', icon: User }
  ];

  return (
    <aside className="portal-sidebar student-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <Link to="/" className="brand-logo">
          <div className="logo-icon">
            <Sparkles size={18} />
          </div>
          <div className="logo-text">
            <span className="brand-title">Bio Edz</span>
            <span className="brand-subtitle">Student Portal</span>
          </div>
        </Link>
      </div>

      {/* Student Badge Card */}
      <div className="student-profile-badge">
        <div className="avatar-circle">
          {user?.name?.charAt(0) || 'S'}
        </div>
        <div className="profile-meta">
          <p className="student-name">{user?.name || "Student"}</p>
          <span className="student-badge-status">
            <span className="status-dot"></span> Active Enrolled
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} className="sidebar-icon" />
              <span className="sidebar-label">{link.name}</span>
              {Boolean(link.badge) && (link.badge as number) > 0 && (
                <span className="sidebar-badge-count">{link.badge}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / Switch / Logout */}
      <div className="sidebar-footer">
        <Link to="/" className="sidebar-link public-link">
          <ExternalLink size={16} />
          <span>Public Website</span>
        </Link>
        <button onClick={logout} className="sidebar-link logout-btn">
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      <style>{`
        .portal-sidebar {
          width: 260px;
          min-width: 260px;
          height: 100vh;
          position: sticky;
          top: 0;
          background: #FFFFFF;
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          padding: 1.25rem;
          overflow-y: auto;
          z-index: 100;
        }
        .sidebar-brand {
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 1rem;
        }
        .student-profile-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--light-green-subtle);
          border: 1px solid var(--border-color);
          padding: 0.75rem 0.85rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
        }
        .avatar-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.95rem;
        }
        .profile-meta {
          display: flex;
          flex-direction: column;
        }
        .student-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-dark);
          line-height: 1.2;
        }
        .student-badge-status {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          color: var(--primary-green);
          font-weight: 600;
        }
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--success);
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-muted);
          transition: all 0.15s ease;
          width: 100%;
          text-align: left;
        }
        .sidebar-link:hover {
          background: var(--light-green-subtle);
          color: var(--dark-green);
        }
        .sidebar-link.active {
          background: var(--light-green);
          color: var(--dark-green);
        }
        .sidebar-icon {
          color: inherit;
        }
        .sidebar-label {
          flex: 1;
        }
        .sidebar-badge-count {
          background: var(--dark-green);
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-full);
        }
        .sidebar-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .public-link {
          color: var(--primary-green);
        }
        .logout-btn {
          color: var(--error);
        }
        .logout-btn:hover {
          background: var(--error-bg);
          color: var(--error);
        }
        @media (max-width: 900px) {
          .portal-sidebar {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
};
