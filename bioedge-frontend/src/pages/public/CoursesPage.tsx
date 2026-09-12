import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Info, 
  ArrowRight, 
  GraduationCap, 
  Target, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Layers, 
  Award, 
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { useCourseData } from '../../context/CourseDataContext';

export const CoursesPage: React.FC = () => {
  const { availableSeats } = useCourseData();

  return (
    <div className="courses-hub-page section-padding">
      <div className="container">
        
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-pill">
            <Sparkles size={14} /> Academic Offerings
          </span>
          <h1 className="section-title">Biology Programs & Courses</h1>
          <p className="section-subtitle">
            Curated preparation tracks designed by Afroza Tahmina for HSC Mastery and SSC Board Exam Excellence.
          </p>
        </div>

        {/* Minimalist Course Cards Grid */}
        <div className="courses-minimal-grid">
          
          {/* COURSE 1: Alpha Cohort */}
          <div className="course-minimal-card bio-card featured-card">
            
            <div className="c-card-top">
              <div className="c-icon-badge-row">
                <div className="c-card-icon green">
                  <GraduationCap size={26} />
                </div>
                <div className="c-status-wrap">
                  <span className="badge badge-green">HSC 2026 / 2027</span>
                  <span className="c-live-seats">
                    <span className="pulse-dot"></span>
                    {availableSeats} Seats Left
                  </span>
                </div>
              </div>

              <h2 className="c-course-title">
                Alpha Cohort — 4-Month Crash Course
              </h2>
              <span className="c-course-tagline">
                HSC Biology 1st & 2nd Paper • Botany & Zoology (48 Live Classes)
              </span>

              {/* Minimal 3-Spec Bar */}
              <div className="c-specs-row">
                <div className="c-spec-pill">
                  <Clock size={14} />
                  <span>4 Months</span>
                </div>
                <div className="c-spec-pill">
                  <Layers size={14} />
                  <span>24 Chapters</span>
                </div>
                <div className="c-spec-pill">
                  <ShieldCheck size={14} />
                  <span>CQ Grading</span>
                </div>
              </div>
            </div>

            <div className="c-card-bottom">
              <div className="c-price-row">
                <span className="c-price-label">Tuition:</span>
                <div className="c-price-val">
                  <span className="cur">৳</span>
                  <span className="amount">12,500</span>
                  <span className="period">/ complete (or ৳3,500/mo)</span>
                </div>
              </div>

              <div className="c-card-actions">
                <Link to="/courses/alpha-cohort" className="btn btn-outline c-cta-btn c-details-btn">
                  <Info size={16} /> Details
                </Link>
                <Link to="/enroll?course=alpha-cohort" className="btn btn-primary c-cta-btn c-enroll-btn">
                  Enroll <ArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>

          {/* COURSE 2: SSC 2027 Model Test Package */}
          <div className="course-minimal-card bio-card">
            
            <div className="c-card-top">
              <div className="c-icon-badge-row">
                <div className="c-card-icon amber">
                  <Target size={26} />
                </div>
                <div className="c-status-wrap">
                  <span className="badge badge-amber">SSC 2027 Exclusive</span>
                  <span className="c-batch-status">
                    <span className="amber-dot"></span>
                    New Batch
                  </span>
                </div>
              </div>

              <h2 className="c-course-title">
                SSC 2027 Model Test Package
              </h2>
              <span className="c-course-tagline">
                20 Full Board Standard Model Tests • Written CQ Evaluation & Solutions
              </span>

              {/* Minimal 3-Spec Bar */}
              <div className="c-specs-row">
                <div className="c-spec-pill">
                  <Award size={14} />
                  <span>20 Model Tests</span>
                </div>
                <div className="c-spec-pill">
                  <Layers size={14} />
                  <span>14 Chapters</span>
                </div>
                <div className="c-spec-pill">
                  <Zap size={14} />
                  <span>8 Masterclasses</span>
                </div>
              </div>
            </div>

            <div className="c-card-bottom">
              <div className="c-price-row">
                <span className="c-price-label">Package Fee:</span>
                <div className="c-price-val">
                  <span className="cur">৳</span>
                  <span className="amount">2,200</span>
                  <span className="period"><del>৳3,000</del> (One-Time)</span>
                </div>
              </div>

              <div className="c-card-actions">
                <Link to="/courses/ssc-2027-model-test" className="btn btn-outline c-cta-btn c-details-btn">
                  <Info size={16} /> Details
                </Link>
                <Link to="/enroll?course=ssc-2027" className="btn btn-primary c-cta-btn c-enroll-btn">
                  Enroll <ArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Minimalist Trust Strip */}
        <div className="courses-trust-strip">
          <div className="trust-item">
            <ShieldCheck size={18} className="trust-icon" />
            <span>Direct Mentorship & Grading by Afroza Tahmina</span>
          </div>
          <div className="trust-dot">•</div>
          <div className="trust-item">
            <Sparkles size={18} className="trust-icon" />
            <span>100% Board Standard Pattern & Diagram Rubrics</span>
          </div>
          <div className="trust-dot">•</div>
          <div className="trust-item">
            <Zap size={18} className="trust-icon" />
            <span>Full HD 1080p Recorded Access & CBT Practice</span>
          </div>
        </div>

      </div>

      <style>{`
        .courses-hub-page {
          background: linear-gradient(180deg, #FBFDFB 0%, #F5F9F6 100%);
          min-height: calc(100vh - 72px);
        }

        .courses-minimal-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 980px;
          margin: 0 auto 3rem;
        }

        .course-minimal-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.25rem;
          border-radius: var(--radius-xl);
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          box-shadow: 0 8px 24px rgba(41, 78, 54, 0.05);
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative;
        }

        .featured-card {
          border-color: rgba(49, 91, 61, 0.25);
        }

        .course-minimal-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary-green);
          box-shadow: 0 16px 38px rgba(41, 78, 54, 0.1);
        }

        .c-icon-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }

        .c-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .c-card-icon.green {
          background: var(--light-green);
          color: var(--dark-green);
        }

        .c-card-icon.amber {
          background: #FEF7E6;
          color: #B45309;
        }

        .c-status-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .c-live-seats {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--dark-green);
          background: var(--light-green);
          padding: 3px 9px;
          border-radius: var(--radius-full);
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--success);
        }

        .c-batch-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.76rem;
          font-weight: 700;
          color: #B45309;
          background: #FEF7E6;
          padding: 3px 9px;
          border-radius: var(--radius-full);
        }

        .amber-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #D97706;
        }

        .c-course-title {
          font-size: 1.55rem;
          font-weight: 800;
          color: var(--dark-green);
          line-height: 1.25;
          margin-bottom: 0.4rem;
        }

        .c-course-tagline {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.4;
          margin-bottom: 1.25rem;
        }

        .c-specs-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.75rem;
        }

        .c-spec-pill {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: var(--light-green-subtle);
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-sm);
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--dark-green);
        }

        .c-spec-pill svg {
          color: var(--primary-green);
        }

        .c-card-bottom {
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-subtle);
        }

        .c-price-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .c-price-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--text-muted);
        }

        .c-price-val {
          display: flex;
          align-items: baseline;
          gap: 0.2rem;
        }

        .c-price-val .cur {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--dark-green);
        }

        .c-price-val .amount {
          font-size: 1.6rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--dark-green);
          line-height: 1;
        }

        .c-price-val .period {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-left: 0.2rem;
        }

        .c-card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .c-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          font-size: 0.92rem;
          font-weight: 700;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
        }

        .c-details-btn {
          background: #FFFFFF;
        }

        .c-details-btn:hover {
          background: var(--light-green-subtle);
          border-color: var(--primary-green);
        }

        .c-enroll-btn {
          background: var(--dark-green);
        }

        .c-enroll-btn:hover {
          background: var(--primary-green);
        }

        /* Trust Strip */
        .courses-trust-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          max-width: 860px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          color: var(--text-muted);
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .trust-icon {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .trust-dot {
          color: var(--border-color);
        }

        @media (max-width: 860px) {
          .courses-minimal-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
          }
          .courses-trust-strip {
            border-radius: var(--radius-lg);
            flex-direction: column;
            gap: 0.75rem;
            align-items: flex-start;
          }
          .trust-dot {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .course-minimal-card {
            padding: 1.5rem;
          }
          .c-card-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
