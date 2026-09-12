import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  Menu, 
  X, 
  LogIn, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap,
  ChevronDown,
  BookOpen,
  Award,
  ArrowRight,
  Target,
  Layers
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [mobileCourseOpen, setMobileCourseOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { availableSeats } = useCourseData();

  const navLinks = [
    { name: 'About Teacher', path: '/about' },
    { name: 'Structure', path: '/program#structure' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => location.pathname === path;
  const isCourseActive = location.pathname.startsWith('/program') || location.pathname.startsWith('/courses');
  const isHome = location.pathname === '/';

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCourseDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCourseDropdownOpen(false);
  }, [location.pathname]);

  return (
    <header className={`navbar-wrapper ${isHome ? 'is-home-nav' : ''}`}>
      <div className="container">
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="brand-logo">
            <div className="logo-icon">
              <Sparkles size={20} />
            </div>
            <div className="logo-text">
              <span className="brand-title">Bio Edz</span>
              <span className="brand-subtitle">by Afroza Tahmina</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {/* Course Dropdown Menu Item */}
            <div 
              className="nav-dropdown-wrapper" 
              ref={dropdownRef}
              onMouseEnter={() => setCourseDropdownOpen(true)}
              onMouseLeave={() => setCourseDropdownOpen(false)}
            >
              <button
                type="button"
                className={`nav-item dropdown-trigger-btn ${isCourseActive ? 'active' : ''} ${courseDropdownOpen ? 'open' : ''}`}
                onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
                aria-expanded={courseDropdownOpen}
              >
                <span>Course</span>
                <ChevronDown size={14} className={`chevron-icon ${courseDropdownOpen ? 'rotate' : ''}`} />
              </button>

              {courseDropdownOpen && (
                <div className="course-dropdown-menu bio-card">
                  <div className="dropdown-menu-header">
                    <span className="dropdown-label">Available Programs</span>
                  </div>

                  {/* Option 1: Alpha Cohort 4-Month Crash Course */}
                  <Link 
                    to="/courses/alpha-cohort" 
                    className="dropdown-course-item"
                    onClick={() => setCourseDropdownOpen(false)}
                  >
                    <div className="course-item-icon icon-green">
                      <GraduationCap size={20} />
                    </div>
                    <div className="course-item-details">
                      <div className="course-item-title-row">
                        <strong className="course-item-name">Alpha Cohort</strong>
                        <span className="badge badge-green">4 Months</span>
                      </div>
                      <p className="course-item-desc">
                        4-Month Crash Course • HSC Biology 1st & 2nd Paper (48 Classes)
                      </p>
                    </div>
                  </Link>

                  {/* Option 2: SSC 2027 Model Test Package */}
                  <Link 
                    to="/courses/ssc-2027-model-test" 
                    className="dropdown-course-item"
                    onClick={() => setCourseDropdownOpen(false)}
                  >
                    <div className="course-item-icon icon-amber">
                      <Target size={20} />
                    </div>
                    <div className="course-item-details">
                      <div className="course-item-title-row">
                        <strong className="course-item-name">SSC 2027 Model Test Package</strong>
                        <span className="badge badge-amber">New Batch</span>
                      </div>
                      <p className="course-item-desc">
                        20 Full Board Standard Model Tests • Written CQ Evaluation
                      </p>
                    </div>
                  </Link>

                  <div className="dropdown-menu-footer">
                    <Link 
                      to="/courses" 
                      className="dropdown-all-link"
                      onClick={() => setCourseDropdownOpen(false)}
                    >
                      Browse All Courses & Model Tests <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Standard Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-item ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="navbar-actions">
            {/* Dynamic Seats Pill */}
            <div className="seats-indicator">
              <span className="pulse-dot"></span>
              <span className="seats-text">{availableSeats} Seats Left</span>
            </div>

            {user ? (
              <div className="user-action-group">
                <Link
                  to={user.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'}
                  className="btn btn-secondary btn-sm"
                >
                  {user.role === 'teacher' ? (
                    <>
                      <ShieldCheck size={16} /> Teacher Portal
                    </>
                  ) : (
                    <>
                      <GraduationCap size={16} /> Student Portal
                    </>
                  )}
                </Link>
                <button onClick={logout} className="btn btn-outline btn-sm">
                  Logout
                </button>
              </div>
            ) : (
              <div className="guest-action-group">
                <Link to="/login" className="btn btn-ghost btn-sm">
                  <LogIn size={16} /> Login
                </Link>
                <Link to="/enroll" className="btn btn-primary btn-sm">
                  Enroll Now
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="mobile-nav-links">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-item">
              Home
            </Link>

            {/* Mobile Course Section Accordion */}
            <div className="mobile-course-accordion">
              <button 
                type="button" 
                className="mobile-accordion-toggle"
                onClick={() => setMobileCourseOpen(!mobileCourseOpen)}
              >
                <span>Courses</span>
                <ChevronDown size={16} className={`chevron-icon ${mobileCourseOpen ? 'rotate' : ''}`} />
              </button>

              {mobileCourseOpen && (
                <div className="mobile-course-sublinks">
                  <Link
                    to="/courses/alpha-cohort"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mobile-sublink-item"
                  >
                    <div className="sub-dot green-dot"></div>
                    <div>
                      <strong>Alpha Cohort</strong>
                      <span>4-Month Crash Course (HSC Biology)</span>
                    </div>
                  </Link>

                  <Link
                    to="/courses/ssc-2027-model-test"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mobile-sublink-item"
                  >
                    <div className="sub-dot amber-dot"></div>
                    <div>
                      <strong>SSC 2027 Model Test Package</strong>
                      <span>20 Board Model Tests & Evaluation</span>
                    </div>
                  </Link>

                  <Link
                    to="/courses"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mobile-sublink-all"
                  >
                    View All Courses →
                  </Link>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-nav-item"
              >
                {link.name}
              </Link>
            ))}
            <div className="mobile-menu-divider" />
            {user ? (
              <div className="mobile-user-links">
                <Link
                  to={user.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary btn-block"
                >
                  {user.role === 'teacher' ? 'Open Teacher Portal' : 'Open Student Dashboard'}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-outline btn-block"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="mobile-guest-links">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-outline btn-block"
                >
                  Log In
                </Link>
                <Link
                  to="/enroll"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary btn-block"
                >
                  Enroll Now
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .navbar-wrapper {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-color);
          transition: all 0.2s ease;
        }
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }
        .logo-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background-color: var(--dark-green);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logo-text {
          display: flex;
          flex-direction: column;
        }
        .brand-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--dark-green);
          line-height: 1.1;
        }
        .brand-subtitle {
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.02em;
        }
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }
        .nav-item {
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--text-dark);
          transition: color 0.2s ease;
        }
        .nav-item:hover, .nav-item.active {
          color: var(--dark-green);
          font-weight: 600;
        }
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .seats-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--light-green);
          border: 1px solid rgba(49, 91, 61, 0.15);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--dark-green);
        }
        .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--success);
          box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(22, 163, 74, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
        }
        .user-action-group, .guest-action-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .mobile-toggle-btn {
          display: none;
          color: var(--text-dark);
        }

        /* Dropdown Styles */
        .nav-dropdown-wrapper {
          position: relative;
          display: inline-block;
        }

        .dropdown-trigger-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          font-family: inherit;
        }

        .chevron-icon {
          transition: transform 0.2s ease;
        }

        .chevron-icon.rotate {
          transform: rotate(180deg);
        }

        .course-dropdown-menu {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          width: 380px;
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-color);
          box-shadow: 0 16px 44px -6px rgba(41, 78, 54, 0.15), 0 4px 12px rgba(0, 0, 0, 0.04);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          z-index: 1050;
          animation: dropFadeIn 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        @keyframes dropFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -6px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .dropdown-menu-header {
          padding: 0.25rem 0.5rem 0.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .dropdown-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .dropdown-course-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          padding: 0.85rem;
          border-radius: var(--radius-lg);
          transition: all 0.2s ease;
          text-decoration: none;
          background: #FAFCFA;
          border: 1px solid transparent;
        }

        .dropdown-course-item:hover {
          background: var(--light-green-subtle);
          border-color: rgba(78, 134, 95, 0.25);
          transform: translateX(2px);
        }

        .course-item-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon-green {
          background: var(--light-green);
          color: var(--dark-green);
        }

        .icon-amber {
          background: #FEF7E6;
          color: #B45309;
        }

        .course-item-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .course-item-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .course-item-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--dark-green);
        }

        .course-item-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.35;
        }

        .dropdown-menu-footer {
          border-top: 1px solid var(--border-subtle);
          padding-top: 0.65rem;
          margin-top: 0.25rem;
          text-align: center;
        }

        .dropdown-all-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--primary-green);
          transition: color 0.2s ease;
        }

        .dropdown-all-link:hover {
          color: var(--dark-green);
        }

        /* Mobile Course Accordion */
        .mobile-course-accordion {
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.75rem;
        }

        .mobile-accordion-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-dark);
          padding: 0.5rem 0;
          cursor: pointer;
        }

        .mobile-course-sublinks {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          padding-left: 0.5rem;
          margin-top: 0.5rem;
        }

        .mobile-sublink-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 0.6rem 0.75rem;
          background: var(--light-green-subtle);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
        }

        .mobile-sublink-item strong {
          display: block;
          color: var(--dark-green);
          font-size: 0.88rem;
        }

        .mobile-sublink-item span {
          display: block;
          color: var(--text-muted);
          font-size: 0.76rem;
        }

        .sub-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 5px;
          flex-shrink: 0;
        }

        .green-dot { background: var(--primary-green); }
        .amber-dot { background: #D97706; }

        .mobile-sublink-all {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--primary-green);
          padding-left: 0.5rem;
        }

        /* Dark Home Hero Navbar Theme */
        .navbar-wrapper.is-home-nav {
          background: rgba(8, 19, 12, 0.96);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .navbar-wrapper.is-home-nav .brand-title {
          color: #FFFFFF;
        }
        .navbar-wrapper.is-home-nav .brand-subtitle {
          color: #34D399;
        }
        .navbar-wrapper.is-home-nav .nav-item {
          color: #E2E8F0;
        }
        .navbar-wrapper.is-home-nav .nav-item:hover,
        .navbar-wrapper.is-home-nav .nav-item.active {
          color: #34D399;
        }
        .navbar-wrapper.is-home-nav .seats-indicator {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(52, 211, 153, 0.3);
          color: #34D399;
        }
        .navbar-wrapper.is-home-nav .btn-ghost {
          color: #FFFFFF;
        }
        .navbar-wrapper.is-home-nav .mobile-toggle-btn {
          color: #FFFFFF;
        }

        .mobile-menu-drawer {
          background: #ffffff;
          border-bottom: 1px solid var(--border-color);
          padding: 1.5rem;
          box-shadow: var(--shadow-md);
        }
        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .mobile-nav-item {
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-dark);
          padding: 0.5rem 0;
        }
        .mobile-menu-divider {
          height: 1px;
          background: var(--border-color);
          margin: 0.5rem 0;
        }
        .btn-block {
          width: 100%;
          margin-bottom: 0.5rem;
        }
        @media (max-width: 992px) {
          .desktop-nav {
            display: none;
          }
          .mobile-toggle-btn {
            display: block;
          }
          .seats-indicator {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
