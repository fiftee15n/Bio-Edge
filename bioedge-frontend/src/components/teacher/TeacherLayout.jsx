import React, { useState } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { TeacherSidebar } from '../common/TeacherSidebar';
import { useAuth } from '../../context/AuthContext';
import { DemoRoleSwitcher } from '../common/DemoRoleSwitcher';
import { 
  Menu, 
  Sparkles, 
  Bell, 
  UserCheck, 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  Clock, 
  FileCheck2, 
  HelpCircle, 
  Award, 
  GraduationCap, 
  MessageSquare, 
  BarChart3, 
  Tag, 
  LogOut 
} from 'lucide-react';
import { useCourseData } from '../../context/CourseDataContext';

export const TeacherLayout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { availableSeats, activeStudentsCount, course } = useCourseData();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  if (!isAuthenticated || user?.role !== 'teacher') {
    return <Navigate to="/login?role=teacher" replace />;
  }

  return (
    <div className="portal-container">
      {/* Desktop Teacher Sidebar */}
      <TeacherSidebar />

      {/* Main Teacher Content Area */}
      <div className="portal-main-content">
        {/* Top Header Bar */}
        <header className="portal-top-bar teacher-top-bar">
          <div className="top-bar-left">
            <button
              className="portal-mobile-menu-btn"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              aria-label="Open Teacher Navigation"
            >
              <Menu size={22} />
            </button>
            <div className="portal-breadcrumb">
              <span className="bc-badge teacher-bc-badge">Faculty Management Center</span>
            </div>
          </div>

          <div className="top-bar-right">
            <div className="live-batch-pill">
              <span>{activeStudentsCount} / {course.seatLimit} Students</span>
              <span className="seats-free-tag">({availableSeats} free)</span>
            </div>

            <Link to="/teacher/profile" className="top-bar-user-profile">
              <div className="top-avatar teacher-avatar-top">AT</div>
              <span className="top-user-name">Afroza Tahmina</span>
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
                  <span className="brand-title">Teacher Portal</span>
                </div>
              </div>
              <nav className="mobile-drawer-links">
                <Link to="/teacher/dashboard" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <Link to="/teacher/students" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <Users size={18} /> Students
                </Link>
                <Link to="/teacher/course" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <BookOpen size={18} /> Course Settings
                </Link>
                <Link to="/teacher/chapters" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <BookOpen size={18} /> Chapters & Topics
                </Link>
                <Link to="/teacher/classes" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <Calendar size={18} /> Classes
                </Link>
                <Link to="/teacher/schedule" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <Clock size={18} /> Schedule
                </Link>
                <Link to="/teacher/tests" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <FileCheck2 size={18} /> Practice Tests
                </Link>
                <Link to="/teacher/questions" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <HelpCircle size={18} /> Question Bank
                </Link>
                <Link to="/teacher/results" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <GraduationCap size={18} /> Results & Grading
                </Link>
                <Link to="/teacher/feedback" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <MessageSquare size={18} /> Feedback
                </Link>
                <Link to="/teacher/pricing" onClick={() => setMobileDrawerOpen(false)} className="m-link">
                  <Tag size={18} /> Pricing & Seats
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
          <Outlet />
        </main>
      </div>

      <DemoRoleSwitcher />

      <style>{`
        .teacher-bc-badge {
          background: #FAF6ED;
          color: #B45309;
          border: 1px solid #E8DECE;
        }
        .live-batch-pill {
          background: var(--light-green);
          color: var(--dark-green);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .seats-free-tag {
          color: var(--primary-green);
          font-size: 0.75rem;
        }
        .teacher-avatar-top {
          background: #B45309;
        }
      `}</style>
    </div>
  );
};
