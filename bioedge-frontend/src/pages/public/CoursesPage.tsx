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
  Zap
} from 'lucide-react';
import { useCourseData } from '../../context/CourseDataContext';

export const CoursesPage: React.FC = () => {
  const { availableSeats } = useCourseData();

  return (
    <div className="courses-hub-page">
      <div className="container">
        
        {/* Header with Generous Spacing */}
        <div className="courses-page-header text-center">
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
          <div className="course-minimal-card bio-card">
            
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

              {/* Minimal Spec Badges */}
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

            {/* CTA Buttons: Details & Enroll */}
            <div className="c-card-actions">
              <Link to="/courses/alpha-cohort" className="btn btn-outline c-cta-btn c-details-btn">
                <Info size={16} /> Details
              </Link>
              <Link to="/enroll?course=alpha-cohort" className="btn btn-primary c-cta-btn c-enroll-btn">
                Enroll <ArrowRight size={16} />
              </Link>
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

              {/* Minimal Spec Badges */}
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

            {/* CTA Buttons: Details & Enroll */}
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

      <style>{`
        .courses-hub-page {
          background: linear-gradient(180deg, #FBFDFB 0%, #F5F9F6 100%);
          min-height: calc(100vh - 72px);
          padding: 4.5rem 0 5.5rem;
        }

        .courses-page-header {
          margin-bottom: 3.5rem;
        }

        .courses-page-header .section-title {
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .courses-minimal-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.25rem;
          max-width: 960px;
          margin: 0 auto;
        }

        .course-minimal-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.5rem 2.25rem;
          border-radius: var(--radius-xl);
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          box-shadow: 0 10px 30px rgba(41, 78, 54, 0.05);
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
          min-height: 290px;
        }

        .course-minimal-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary-green);
          box-shadow: 0 18px 42px rgba(41, 78, 54, 0.1);
        }

        .c-icon-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .c-card-icon {
          width: 50px;
          height: 50px;
          border-radius: 14px;
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
          padding: 3px 10px;
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
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }

        .amber-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #D97706;
        }

        .c-course-title {
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--dark-green);
          line-height: 1.25;
          margin-bottom: 1.25rem;
        }

        .c-specs-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .c-spec-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--light-green-subtle);
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--dark-green);
        }

        .c-spec-pill svg {
          color: var(--primary-green);
        }

        .c-card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-subtle);
        }

        .c-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 700;
          padding: 0.85rem 1.15rem;
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

        @media (max-width: 860px) {
          .courses-minimal-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
          }
          .courses-page-header {
            margin-bottom: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .course-minimal-card {
            padding: 1.75rem 1.5rem;
          }
          .c-card-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
