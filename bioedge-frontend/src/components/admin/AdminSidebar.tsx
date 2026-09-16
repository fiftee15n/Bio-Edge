import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  LogOut, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourseData } from '../../context/CourseDataContext';

export const AdminSidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { pendingEnrollmentsCount } = useCourseData();

  const links = [
    { 
      name: 'Overview', 
      path: '/admin/dashboard', 
      icon: LayoutDashboard 
    },
    { 
      name: 'Enrollment Approvals', 
      path: '/admin/enrollments', 
      icon: UserCheck, 
      badge: pendingEnrollmentsCount 
    },
    { 
      name: 'Enrolled Students', 
      path: '/admin/students', 
      icon: Users 
    }
  ];

  return (
    <aside className="portal-sidebar admin-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <Link to="/admin/dashboard" className="brand-logo">
          <div className="logo-icon admin-icon">
            <Sparkles size={18} />
          </div>
          <div className="logo-text">
            <span className="brand-title">Bio Edge</span>
            <span className="brand-subtitle admin-subtitle">Admin Control</span>
          </div>
        </Link>
      </div>

      {/* Admin Profile Badge */}
      <div className="admin-profile-badge">
        <div className="admin-avatar-circle">
          <ShieldCheck size={20} />
        </div>
        <div className="profile-meta">
          <p className="admin-name">{user?.name || "System Admin"}</p>
          <span className="admin-badge-status">
            <span className="status-dot green"></span> Superadmin
          </span>
          <span className="admin-email">{user?.email || "admin.nioedge@gmail.com"}</span>
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
              {typeof link.badge === 'number' && link.badge > 0 && (
                <span className="sidebar-badge-count admin-badge-pending">
                  {link.badge}
                </span>
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
        .admin-sidebar {
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

        .admin-icon {
          background: var(--dark-green) !important;
        }

        .admin-subtitle {
          color: var(--primary-green) !important;
          font-weight: 700;
        }

        .admin-profile-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--light-green-subtle);
          border: 1px solid var(--border-color);
          padding: 0.75rem 0.85rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
        }

        .admin-avatar-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .admin-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--dark-green);
          line-height: 1.2;
        }

        .admin-badge-status {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.7rem;
          color: var(--primary-green);
          font-weight: 700;
          text-transform: uppercase;
        }

        .admin-email {
          font-size: 0.72rem;
          color: var(--text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 140px;
          display: block;
        }

        .status-dot.green {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--success);
        }

        .admin-badge-pending {
          background: #DC2626 !important;
          color: #FFFFFF !important;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          animation: pulseSubtle 2s infinite;
        }

        @keyframes pulseSubtle {
          0% { opacity: 0.85; }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0.85; }
        }
      `}</style>
    </aside>
  );
};
