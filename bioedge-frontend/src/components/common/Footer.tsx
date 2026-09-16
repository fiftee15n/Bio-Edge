import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { useCourseData } from '../../context/CourseDataContext';

export const Footer: React.FC = () => {
  const { teacher, course } = useCourseData();

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="brand-logo">
              <div className="logo-icon">
                <Sparkles size={18} />
              </div>
              <div className="logo-text">
                <span className="brand-title">Bio Edge</span>
                <span className="brand-subtitle">by Afroza Tahmina</span>
              </div>
            </div>
            <p className="footer-desc">
              A premium, structured digital learning environment dedicated exclusively to HSC Biology First Paper and Second Paper excellence.
            </p>
            <div className="footer-batch-badge">
              <span>{course.batchName || "Batch 01"}</span> • <span>Only {course.seatLimit} Students</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/program">Program Curriculum</Link></li>
              <li><Link to="/about">About Teacher</Link></li>
              <li><Link to="/schedule">Live Class Schedule</Link></li>
              <li><Link to="/courses">Courses & Tuition</Link></li>
              <li><Link to="/enroll">Online Enrollment</Link></li>
            </ul>
          </div>

          {/* Academic Coverage */}
          <div className="footer-col">
            <h4 className="footer-heading">Curriculum</h4>
            <ul className="footer-links">
              <li><Link to="/program">Botany & Cell Genetics</Link></li>
              <li><Link to="/program">Plant Physiology & Biotech</Link></li>
              <li><Link to="/program">Human Physiology System</Link></li>
              <li><Link to="/program">Animal Diversity & Taxonomy</Link></li>
              <li><Link to="/program">Board Model Tests</Link></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="footer-col">
            <h4 className="footer-heading">Direct Contact</h4>
            <div className="footer-contact-list">
              <div className="contact-item">
                <Phone size={16} className="contact-icon" />
                <span>{teacher.contactNumber}</span>
              </div>
              <div className="contact-item">
                <Mail size={16} className="contact-icon" />
                <span>{teacher.email}</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} className="contact-icon" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
            <Link to="/contact" className="contact-action-link">
              Send an inquiry <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Bio Edge by Afroza Tahmina. All rights reserved.</p>
          <div className="footer-bottom-links">
            <span>Academic Excellence</span>
            <span>•</span>
            <span>Structured Discipline</span>
            <span>•</span>
            <span>Personalized Feedback</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-wrapper {
          background-color: #FFFFFF;
          border-top: 1px solid var(--border-color);
          padding-top: 4rem;
          padding-bottom: 2rem;
          margin-top: auto;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
          margin-bottom: 3.5rem;
        }
        .footer-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-top: 1rem;
          margin-bottom: 1.25rem;
          line-height: 1.6;
          max-width: 320px;
        }
        .footer-batch-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--light-green);
          color: var(--dark-green);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
        }
        .footer-heading {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-bottom: 1.25rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-links a {
          font-size: 0.9rem;
          color: var(--text-muted);
          transition: color 0.2s ease;
        }
        .footer-links a:hover {
          color: var(--dark-green);
        }
        .footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.25rem;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          color: var(--text-dark);
        }
        .contact-icon {
          color: var(--primary-green);
        }
        .contact-action-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--dark-green);
        }
        .contact-action-link:hover {
          text-decoration: underline;
        }
        .footer-bottom {
          border-top: 1px solid var(--border-subtle);
          padding-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }
        @media (max-width: 600px) {
          .footer-wrapper {
            padding-top: 2.5rem;
            padding-bottom: 1.5rem;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
            margin-bottom: 2rem;
          }
          .footer-desc {
            max-width: 100%;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 0.85rem;
            text-align: center;
            padding-top: 1.5rem;
          }
          .footer-bottom-links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.4rem;
            font-size: 0.78rem;
          }
        }
      `}</style>
    </footer>
  );
};
