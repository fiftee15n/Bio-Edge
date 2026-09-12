import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  Menu, 
  X, 
  BookOpen, 
  User, 
  LogIn, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap 
} from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { availableSeats } = useCourseData();

  const navLinks = [
    { name: 'Program', path: '/program' },
    { name: 'About Teacher', path: '/about' },
    { name: 'Structure', path: '/program#structure' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-wrapper">
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
