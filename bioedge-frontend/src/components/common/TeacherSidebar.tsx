import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Layers, 
  Calendar, 
  Clock, 
  FileCheck2, 
  HelpCircle, 
  Award, 
  GraduationCap, 
  MessageSquare, 
  BarChart3, 
  Tag, 
  UserCheck, 
  LogOut, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCourseData } from '../../context/CourseDataContext';

export const TeacherSidebar: React.FC = () => {
  const { logout } = useAuth();
  const { students } = useCourseData();

  const links = [
    { name: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/teacher/students', icon: Users, badge: students.length },
    { name: 'Course Settings', path: '/teacher/course', icon: BookOpen },
    { name: 'Curriculum & Chapters', path: '/teacher/chapters', icon: Layers },
    { name: 'Classes Management', path: '/teacher/classes', icon: Calendar },
    { name: 'Schedule Calendar', path: '/teacher/schedule', icon: Clock },
    { name: 'Practice Tests', path: '/teacher/tests', icon: FileCheck2 },
    { name: 'Question Bank', path: '/teacher/questions', icon: HelpCircle },
    { name: 'Model Tests', path: '/teacher/model-tests', icon: Award },
    { name: 'Results & Evaluation', path: '/teacher/results', icon: GraduationCap },
    { name: 'Student Feedback', path: '/teacher/feedback', icon: MessageSquare },
    { name: 'Academic Analytics', path: '/teacher/analytics', icon: BarChart3 },
    { name: 'Pricing & Capacity', path: '/teacher/pricing', icon: Tag },
    { name: 'Teacher Profile', path: '/teacher/profile', icon: UserCheck }
  ];

  return (
    <aside className="portal-sidebar teacher-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <Link to="/" className="brand-logo">
          <div className="logo-icon teacher-badge-icon">
            <Sparkles size={18} />
          </div>
          <div className="logo-text">
            <span className="brand-title">Bio Edge</span>
            <span className="brand-subtitle">Teacher Management</span>
          </div>
        </Link>
      </div>

      {/* Teacher Profile Badge */}
      <div className="student-profile-badge teacher-card-badge">
        <div className="avatar-circle teacher-avatar">
          <img 
            src="/assets/hero/teacher_afroza_card.jpg" 
            alt="Afroza Tahmina" 
            className="sidebar-avatar-img" 
          />
        </div>
        <div className="profile-meta">
          <p className="student-name">Afroza Tahmina</p>
          <span className="student-badge-status teacher-status">
            Lead Faculty & Admin
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
              <Icon size={17} className="sidebar-icon" />
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
        .teacher-badge-icon {
          background-color: #1F2922;
        }
        .teacher-card-badge {
          background: #FAF6ED;
          border-color: #E8DECE;
        }
        .teacher-avatar {
          background: #B45309;
        }
        .teacher-status {
          color: #B45309;
          font-weight: 600;
        }
      `}</style>
    </aside>
  );
};
