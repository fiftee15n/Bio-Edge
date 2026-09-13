import React, { useState } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { StudentSidebar } from '../common/StudentSidebar';
import { useAuth } from '../../context/AuthContext';
import { PageTransition } from '../common/PageTransition';
import { 
  Menu, 
  Sparkles, 
  Bell, 
  User, 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Target, 
  Award, 
  CheckCircle2, 
  BarChart3, 
  MessageSquare, 
  LogOut 
} from 'lucide-react';
import { useCourseData } from '../../context/CourseDataContext';

export const StudentLayout: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { notifications, feedbacks } = useCourseData();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

  if (!isAuthenticated || user?.role !== 'student') {
    return <Navigate to="/login?role=student" replace />;
  }

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const unreadFeedbacks = feedbacks.filter(f => f.unread).length;

  return (
    <div className="portal-container">
      {/* Desktop Sidebar */}
      <StudentSidebar />

      {/* Main Content Area */}
      <div className="portal-main-content">
        {/* Top Header Bar */}
        <header className="portal-top-bar">
          <div className="top-bar-left">
            <button
              className="portal-mobile-menu-btn"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              aria-label="Open Navigation Drawer"
            >
              <Menu size={22} />
            </button>
            <div className="portal-breadcrumb">
              <span className="bc-badge">Student Learning Environment</span>
            </div>
          </div>

          <div className="top-bar-right">
            <Link to="/student/notifications" className="top-bar-icon-btn" title="Notifications">
              <Bell size={18} />
              {unreadNotifs > 0 && <span className="icon-badge">{unreadNotifs}</span>}
            </Link>
            <Link to="/student/feedback" className="top-bar-icon-btn" title="Teacher Feedback">
              <MessageSquare size={18} />
              {unreadFeedbacks > 0 && <span className="icon-badge">{unreadFeedbacks}</span>}
            </Link>
            <Link to="/student/profile" className="top-bar-user-profile">
              <div className="top-avatar">{user.name.charAt(0)}</div>
              <span className="top-user-name">{user.name}</span>
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer Modal */}
        {mobileDrawerOpen && (
          <div className="mobile-drawer-overlay" onClick={() => setMobileDrawerOpen(false)}>
            <div className="mobile-drawer-pane" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-drawer-header">
                <div className="brand-logo">
                  <div className="logo-icon"><Sparkles size={18} /></div>
                  <span className="brand-title">Bio Edz</span>
                </div>
              </div>
              <nav className="mobile-drawer-links">
                <Link to="/student/dashboard" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <Link to="/student/course" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <BookOpen size={18} /> My Course
                </Link>
                <Link to="/student/classes" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <Calendar size={18} /> Schedule
                </Link>
                <Link to="/student/practice" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <Target size={18} /> Practice
                </Link>
                <Link to="/student/model-tests" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <Award size={18} /> Model Tests
                </Link>
                <Link to="/student/results" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <CheckCircle2 size={18} /> Results
                </Link>
                <Link to="/student/analytics" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <BarChart3 size={18} /> Analytics
                </Link>
                <Link to="/student/feedback" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <MessageSquare size={18} /> Feedback
                </Link>
                <Link to="/student/notifications" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <Bell size={18} /> Notifications
                </Link>
                <Link to="/student/profile" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <User size={18} /> Profile
                </Link>
                <button onClick={() => { logout(); setMobileDrawerOpen(false); }} className="m-link logout-m-link">
                  <LogOut size={18} /> Log Out
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Page Viewport */}
        <main className="portal-page-viewport">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>

      <style>{`
        .portal-container {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-color);
        }
        .portal-main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .portal-top-bar {
          height: 64px;
          background: #FFFFFF;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 90;
        }
        .top-bar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .portal-mobile-menu-btn {
          display: none;
          color: var(--text-dark);
        }
        .bc-badge {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
        }
        .top-bar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .top-bar-icon-btn {
          position: relative;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          border: 1px solid var(--border-color);
          background: var(--light-green-subtle);
        }
        .top-bar-icon-btn:hover {
          color: var(--dark-green);
          background: var(--light-green);
        }
        .icon-badge {
          position: absolute;
          top: -3px;
          right: -3px;
          background: var(--dark-green);
          color: #FFFFFF;
          font-size: 0.65rem;
          font-weight: 700;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .top-bar-user-profile {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding-left: 0.5rem;
        }
        .top-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.88rem;
        }
        .top-user-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-dark);
        }
        .portal-page-viewport {
          padding: 2rem;
          flex: 1;
        }

        /* Mobile Drawer */
        .mobile-drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 999;
        }
        .mobile-drawer-pane {
          width: 270px;
          height: 100%;
          background: #FFFFFF;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }
        .mobile-drawer-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .mobile-drawer-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .m-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
          color: var(--text-dark);
          font-size: 0.9rem;
          font-weight: 500;
        }
        .m-link:hover {
          background: var(--light-green);
          color: var(--dark-green);
        }
        .logout-m-link {
          color: var(--error);
          margin-top: 1rem;
        }

        @media (max-width: 900px) {
          .portal-mobile-menu-btn {
            display: block;
          }
          .portal-top-bar {
            padding: 0 1rem;
          }
          .portal-page-viewport {
            padding: 1.25rem;
          }
          .top-user-name {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};
