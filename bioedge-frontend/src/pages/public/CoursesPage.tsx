import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Users, 
  Target, 
  ShieldCheck, 
  Zap,
  Info,
  Layers
} from 'lucide-react';
import { useCourseData } from '../../context/CourseDataContext';

export const CoursesPage: React.FC = () => {
  const { availableSeats } = useCourseData();

  return (
    <div className="courses-hub-page section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-pill">Academic Programs</span>
          <h1 className="section-title">Our Biology Courses & Programs</h1>
          <p className="section-subtitle">
            Choose your learning path designed by Afroza Tahmina for HSC and SSC Biology Board Exam Excellence.
          </p>
        </div>

        {/* Courses Cards Grid */}
        <div className="courses-cards-grid">
          
          {/* COURSE CARD 1: Alpha Cohort */}
          <div className="course-hub-card bio-card">
            <div className="card-top-bar">
              <span className="badge badge-green">HSC 2026 / 2027 • 1st & 2nd Paper</span>
              <span className="seats-tag">{availableSeats} Seats Left</span>
            </div>

            <div className="card-main-content">
              <h2 className="card-course-title">
                Alpha Cohort — 4-Month Crash Course
              </h2>
              <p className="card-course-desc">
                Comprehensive 4-month crash course covering all 24 chapters of Botany and Zoology. Features 48 live interactive sessions, line-by-line CQ answer grading, and complete Board exam rehearsals.
              </p>

              {/* Feature Highlights Pills */}
              <div className="card-highlights-list">
                <div className="highlight-pill">
                  <Clock size={15} />
                  <span>4 Months (16 Weeks)</span>
                </div>
                <div className="highlight-pill">
                  <BookOpen size={15} />
                  <span>48 Live Classes (3/week)</span>
                </div>
                <div className="highlight-pill">
                  <Layers size={15} />
                  <span>24 Chapters (Botany + Zoology)</span>
                </div>
                <div className="highlight-pill">
                  <ShieldCheck size={15} />
                  <span>Handwritten CQ Grading</span>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="card-pricing-box">
                <span className="pricing-label">Tuition Fee:</span>
                <div className="pricing-value-row">
                  <span className="cur">৳</span>
                  <span className="amount">12,500</span>
                  <span className="plan-period">/ full course</span>
                  <span className="or-installment">(or ৳3,500 / month)</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons: Details & Enroll */}
            <div className="card-cta-footer">
              <Link to="/courses/alpha-cohort" className="btn btn-outline btn-lg cta-btn">
                <Info size={18} /> Details
              </Link>
              <Link to="/enroll?course=alpha-cohort" className="btn btn-primary btn-lg cta-btn">
                Enroll <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* COURSE CARD 2: SSC 2027 Model Test Package */}
          <div className="course-hub-card bio-card">
            <div className="card-top-bar">
              <span className="badge badge-amber">SSC 2027 Exclusive • Class 9–10</span>
              <span className="batch-status-tag">Enrollment Active</span>
            </div>

            <div className="card-main-content">
              <h2 className="card-course-title">
                SSC 2027 Model Test Package
              </h2>
              <p className="card-course-desc">
                20 Board Standard full-length model tests covering all 14 chapters of SSC General Biology. Includes handwritten CQ script evaluation, diagram precision scoring, and 8 live solution masterclasses.
              </p>

              {/* Feature Highlights Pills */}
              <div className="card-highlights-list">
                <div className="highlight-pill">
                  <Award size={15} />
                  <span>20 Full Model Tests</span>
                </div>
                <div className="highlight-pill">
                  <BookOpen size={15} />
                  <span>14 SSC Biology Chapters</span>
                </div>
                <div className="highlight-pill">
                  <Zap size={15} />
                  <span>8 Live Solution Masterclasses</span>
                </div>
                <div className="highlight-pill">
                  <ShieldCheck size={15} />
                  <span>100% Written CQ Evaluation</span>
                </div>
              </div>

              {/* Pricing Section */}
              <div className="card-pricing-box">
                <span className="pricing-label">Package Fee:</span>
                <div className="pricing-value-row">
                  <span className="cur">৳</span>
                  <span className="amount">2,200</span>
                  <span className="plan-period"><del>৳3,000</del> (One-Time Fee)</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons: Details & Enroll */}
            <div className="card-cta-footer">
              <Link to="/courses/ssc-2027-model-test" className="btn btn-outline btn-lg cta-btn">
                <Info size={18} /> Details
              </Link>
              <Link to="/enroll?course=ssc-2027" className="btn btn-primary btn-lg cta-btn">
                Enroll <ArrowRight size={18} />
              </Link>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .courses-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 1040px;
          margin: 0 auto;
        }

        .course-hub-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.25rem;
          border-radius: var(--radius-xl);
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          box-shadow: 0 10px 30px rgba(41, 78, 54, 0.06);
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .course-hub-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary-green);
          box-shadow: 0 16px 40px rgba(41, 78, 54, 0.12);
        }

        .card-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .seats-tag {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--dark-green);
          background: var(--light-green);
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }

        .batch-status-tag {
          font-size: 0.78rem;
          font-weight: 700;
          color: #B45309;
          background: #FEF7E6;
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }

        .card-course-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--dark-green);
          margin-bottom: 0.75rem;
          line-height: 1.25;
        }

        .card-course-desc {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin-bottom: 1.5rem;
        }

        .card-highlights-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem;
          margin-bottom: 1.75rem;
        }

        .highlight-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--light-green-subtle);
          padding: 0.55rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--dark-green);
        }

        .highlight-pill svg {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .card-pricing-box {
          background: #FDFBF7;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 1rem 1.25rem;
          margin-bottom: 1.75rem;
        }

        .pricing-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--text-muted);
          display: block;
          margin-bottom: 0.25rem;
        }

        .pricing-value-row {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .pricing-value-row .cur {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--dark-green);
        }

        .pricing-value-row .amount {
          font-size: 1.85rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--dark-green);
          line-height: 1;
        }

        .pricing-value-row .plan-period {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .pricing-value-row .or-installment {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary-green);
          margin-left: 0.25rem;
        }

        .card-cta-footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-subtle);
        }

        .cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 700;
          padding: 0.75rem 1rem;
        }

        @media (max-width: 860px) {
          .courses-cards-grid {
            grid-template-columns: 1fr;
            max-width: 540px;
          }
        }

        @media (max-width: 480px) {
          .card-highlights-list {
            grid-template-columns: 1fr;
          }
          .card-cta-footer {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
