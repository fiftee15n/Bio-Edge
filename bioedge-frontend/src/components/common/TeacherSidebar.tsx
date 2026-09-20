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
import { useLanguage } from '../../context/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

export const TeacherSidebar: React.FC = () => {
  const { logout } = useAuth();
  const { students } = useCourseData();
  const { t, isBangla, toBnNum } = useLanguage();

  const links = [
    { name: t.teacherPortal.dashboard, path: '/teacher/dashboard', icon: LayoutDashboard },
    { name: t.teacherPortal.students, path: '/teacher/students', icon: Users, badge: students.length },
    { name: t.teacherPortal.courseSettings, path: '/teacher/course', icon: BookOpen },
    { name: t.teacherPortal.curriculum, path: '/teacher/chapters', icon: Layers },
    { name: t.teacherPortal.classes, path: '/teacher/classes', icon: Calendar },
    { name: t.teacherPortal.schedule, path: '/teacher/schedule', icon: Clock },
    { name: t.teacherPortal.tests, path: '/teacher/tests', icon: FileCheck2 },
    { name: t.teacherPortal.questions, path: '/teacher/questions', icon: HelpCircle },
    { name: t.teacherPortal.modelTests, path: '/teacher/model-tests', icon: Award },
    { name: t.teacherPortal.results, path: '/teacher/results', icon: GraduationCap },
    { name: t.teacherPortal.feedback, path: '/teacher/feedback', icon: MessageSquare },
    { name: t.teacherPortal.analytics, path: '/teacher/analytics', icon: BarChart3 },
    { name: t.teacherPortal.pricing, path: '/teacher/pricing', icon: Tag },
    { name: t.teacherPortal.profile, path: '/teacher/profile', icon: UserCheck }
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
            <span className="brand-subtitle">{isBangla ? 'শিক্ষক ম্যানেজমেন্ট' : 'Teacher Management'}</span>
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
          <p className="student-name">{isBangla ? 'আফরোজা তাহমিনা' : 'Afroza Tahmina'}</p>
          <span className="student-badge-status teacher-status">
            {isBangla ? 'প্রধান ফ্যাকাল্টি ও অ্যাডমিন' : 'Lead Faculty & Admin'}
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={17} className="sidebar-icon" />
              <span className="sidebar-label">{link.name}</span>
              {Boolean(link.badge) && (link.badge as number) > 0 && (
                <span className="sidebar-badge-count">{isBangla ? toBnNum(link.badge as number) : link.badge}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / Switch / Logout */}
      <div className="sidebar-footer">
        <div className="sidebar-lang-row mb-2">
          <LanguageToggle className="w-full justify-center" />
        </div>
        <Link to="/" className="sidebar-link public-link">
          <ExternalLink size={16} />
          <span>{isBangla ? 'ওয়েবসাইটে ফিরুন' : 'Public Website'}</span>
        </Link>
        <button onClick={logout} className="sidebar-link logout-btn">
          <LogOut size={16} />
          <span>{isBangla ? 'লগ আউট' : 'Sign Out'}</span>
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
