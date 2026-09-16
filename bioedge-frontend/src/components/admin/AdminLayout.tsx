import React, { useState } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { useAuth } from '../../context/AuthContext';
import { PageTransition } from '../common/PageTransition';
import { 
  Menu, 
  Sparkles, 
  LayoutDashboard, 
  UserCheck, 
  Users, 
  LogOut,
  ShieldCheck,
  Bell,
  Clock
} from 'lucide-react';
import { useCourseData } from '../../context/CourseDataContext';

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { pendingEnrollmentsCount } = useCourseData();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="portal-container">
      {/* Desktop Admin Sidebar */}
      <AdminSidebar />

      {/* Main Admin Content Area */}
      <div className="portal-main-content">
        {/* Top Header Bar */}
        <header className="portal-top-bar admin-top-bar">
          <div className="top-bar-left">
            <button
              className="portal-mobile-menu-btn"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              aria-label="Open Admin Navigation"
            >
              <Menu size={22} />
            </button>
            <div className="portal-breadcrumb">
              <span className="bc-badge admin-bc-badge">
                <ShieldCheck size={14} /> Bio Edge System Administration
              </span>
            </div>
          </div>

          <div className="top-bar-right">
            {pendingEnrollmentsCount > 0 ? (
              <Link to="/admin/enrollments" className="admin-pending-alert-pill">
                <span className="pulse-alert-dot"></span>
                <span>{pendingEnrollmentsCount} Pending Enrollment{pendingEnrollmentsCount > 1 ? 's' : ''}</span>
              </Link>
            ) : (
              <span className="admin-all-clear-pill">
                <span>All Enrollments Reviewed</span>
              </span>
            )}

            <div className="top-bar-user-profile admin-profile-top">
              <div className="top-avatar admin-top-avatar">A</div>
              <div className="admin-top-meta">
                <span className="top-user-name">Admin</span>
                <span className="top-user-sub">admin.bioedge@gmail.com</span>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer Modal */}
        {mobileDrawerOpen && (
          <div className="mobile-drawer-overlay" onClick={() => setMobileDrawerOpen(false)}>
            <div className="mobile-drawer-pane" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-drawer-header">
                <div className="brand-logo">
                  <div className="logo-icon admin-icon"><Sparkles size={18} /></div>
                  <span className="brand-title">Bio Edge Admin</span>
                </div>
              </div>
              <nav className="mobile-drawer-links">
                <Link to="/admin/dashboard" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <LayoutDashboard size={18} /> Overview
                </Link>
                <Link to="/admin/enrollments" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <UserCheck size={18} /> Enrollment Approvals ({pendingEnrollmentsCount})
                </Link>
                <Link to="/admin/students" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <Users size={18} /> Enrolled Students
                </Link>
                <div className="m-divider"></div>
                <Link to="/" onClick={() => setMobileDrawerOpen(false)} className="m-link public">
                  Public Website
                </Link>
                <button onClick={logout} className="m-link logout">
                  <LogOut size={18} /> Sign Out
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Dynamic Nested Route View */}
        <main className="portal-content-body">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>

      <style>{`
        .admin-top-bar {
          background: #FFFFFF;
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .portal-mobile-menu-btn {
          display: none;
        }

        .admin-bc-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: var(--light-green);
          color: var(--dark-green);
          font-weight: 700;
          font-size: 0.8rem;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
        }

        .admin-pending-alert-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          color: #DC2626;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .admin-pending-alert-pill:hover {
          background: #FEE2E2;
          transform: translateY(-1px);
        }

        .pulse-alert-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #DC2626;
          box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.3);
          animation: pulseDotAlert 1.8s infinite;
        }

        @keyframes pulseDotAlert {
          0% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.8; }
        }

        .admin-all-clear-pill {
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--text-muted);
          background: #F4F6F5;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          white-space: nowrap;
        }

        .admin-top-avatar {
          background: var(--dark-green) !important;
          color: #FFFFFF !important;
          font-weight: 700;
        }

        .admin-top-meta {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
          text-align: left;
        }

        .top-user-sub {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        /* Mobile Drawer Styles */
        .mobile-drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          z-index: 1000;
          backdrop-filter: blur(3px);
          animation: fadeIn 0.2s ease-out;
        }

        .mobile-drawer-pane {
          width: 290px;
          max-width: 82vw;
          height: 100%;
          background: #FFFFFF;
          padding: 1.75rem 1.25rem;
          display: flex;
          flex-direction: column;
          box-shadow: 6px 0 24px rgba(0, 0, 0, 0.15);
          animation: slideDrawer 0.25s ease-out;
        }

        @keyframes slideDrawer {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }

        .mobile-drawer-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .mobile-drawer-header .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .mobile-drawer-header .admin-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-drawer-header .brand-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--dark-green);
        }

        .mobile-drawer-links {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .m-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          color: var(--text-dark);
          font-size: 0.92rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .m-link:hover {
          background: var(--light-green);
          color: var(--dark-green);
        }

        .m-divider {
          height: 1px;
          background: var(--border-subtle);
          margin: 0.85rem 0;
        }

        .m-link.public {
          color: var(--text-muted);
          font-size: 0.88rem;
        }

        .m-link.logout {
          color: #DC2626;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.92rem;
          font-weight: 600;
          width: 100%;
          text-align: left;
          padding: 0.75rem 1rem;
        }

        .m-link.logout:hover {
          background: #FEF2F2;
          color: #B91C1C;
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .portal-mobile-menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: none;
            cursor: pointer;
            color: var(--dark-green);
            padding: 0.4rem;
            border-radius: var(--radius-sm);
          }

          .portal-mobile-menu-btn:hover {
            background: var(--light-green);
          }

          .portal-top-bar {
            padding: 0.75rem 1rem;
          }

          .top-user-sub {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .admin-bc-badge {
            font-size: 0.72rem;
            padding: 0.2rem 0.5rem;
          }

          .admin-pending-alert-pill {
            font-size: 0.72rem;
            padding: 0.25rem 0.55rem;
          }

          .admin-all-clear-pill {
            display: none;
          }

          .portal-top-bar {
            gap: 0.5rem;
          }

          .top-bar-right {
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};
