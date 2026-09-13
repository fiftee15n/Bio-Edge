import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Menu, 
  X, 
  LogIn, 
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Course', path: '/courses' },
    { name: 'About Teacher', path: '/about' },
    { name: 'Structure', path: '/program#structure' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/courses') {
      return location.pathname.startsWith('/courses') || location.pathname.startsWith('/program') || location.pathname === '/course-details';
    }
    return location.pathname === path;
  };

  const isHome = location.pathname === '/';

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
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
            {user ? (
              <div className="user-action-group">
                <button onClick={logout} className="nav-logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <div className="guest-action-group">
                <Link to="/login" className="nav-login-btn">
                  <LogIn size={15} /> <span>Login</span>
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Get Started
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
                className={`mobile-nav-item ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}

            <div className="mobile-menu-divider" />
            {user ? (
              <div className="mobile-user-links">
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
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary btn-block"
                >
                  Get Started
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
          gap: 0.65rem;
        }

        /* Light Navbar Login Button */
        .nav-login-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 1.05rem;
          font-size: 0.86rem;
          font-weight: 600;
          border-radius: var(--radius-full);
          color: var(--dark-green);
          background: #F0FDF4;
          border: 1px solid rgba(22, 101, 52, 0.2);
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-login-btn:hover {
          background: var(--dark-green);
          color: #FFFFFF !important;
          border-color: var(--dark-green);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(22, 101, 52, 0.18);
        }

        /* Light Navbar Logout Button */
        .nav-logout-btn {
          display: inline-flex;
          align-items: center;
          padding: 0.42rem 0.95rem;
          font-size: 0.84rem;
          font-weight: 600;
          border-radius: var(--radius-full);
          color: var(--text-muted);
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nav-logout-btn:hover {
          background: #FEF2F2;
          color: #DC2626;
          border-color: #FECACA;
          transform: translateY(-1px);
        }

        .mobile-toggle-btn {
          display: none;
          color: var(--text-dark);
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
        .navbar-wrapper.is-home-nav .nav-login-btn {
          color: #E2E8F0;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: rgba(255, 255, 255, 0.08);
        }
        .navbar-wrapper.is-home-nav .nav-login-btn:hover {
          background: #34D399;
          color: #064E3B !important;
          border-color: #34D399;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(52, 211, 153, 0.3);
        }
        .navbar-wrapper.is-home-nav .nav-logout-btn {
          color: #CBD5E1;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .navbar-wrapper.is-home-nav .nav-logout-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #FCA5A5;
          border-color: rgba(239, 68, 68, 0.4);
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
        .mobile-nav-item.active {
          color: var(--dark-green);
          font-weight: 700;
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
