import React, { useState } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { TeacherSidebar } from '../common/TeacherSidebar';
import { useAuth } from '../../context/AuthContext';
import { PageTransition } from '../common/PageTransition';
import { 
  Menu, 
  Sparkles, 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  Clock, 
  FileCheck2, 
  HelpCircle, 
  GraduationCap, 
  MessageSquare, 
  Tag, 
  LogOut 
} from 'lucide-react';
import { useCourseData } from '../../context/CourseDataContext';

export const TeacherLayout: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { availableSeats, activeStudentsCount, course } = useCourseData();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);

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
              <div className="top-avatar teacher-avatar-top">
                <img 
                  src="/assets/hero/teacher_afroza_card.jpg" 
                  alt="Afroza Tahmina" 
                  className="top-avatar-img" 
                />
              </div>
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
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>

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
          overflow: hidden;
          padding: 0;
        }
        .top-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }

        @media (max-width: 900px) {
          .portal-mobile-menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0.35rem;
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

        @media (max-width: 600px) {
          .portal-top-bar {
            height: 58px;
            padding: 0 0.75rem;
          }
          .teacher-bc-badge {
            font-size: 0.72rem;
            padding: 0.2rem 0.5rem;
            max-width: 120px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .live-batch-pill {
            font-size: 0.72rem;
            padding: 0.25rem 0.55rem;
          }
          .seats-free-tag {
            display: none;
          }
          .portal-page-viewport {
            padding: 1rem 0.65rem;
          }
          .mobile-drawer-pane {
            width: min(270px, 84vw);
            padding: 1.25rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};
