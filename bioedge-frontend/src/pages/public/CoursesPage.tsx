import React from 'react';
import { Link } from 'react-router-dom';
import { Info, ArrowRight, GraduationCap, Target } from 'lucide-react';
import { useCourseData } from '../../context/CourseDataContext';

export const CoursesPage: React.FC = () => {
  const { availableSeats } = useCourseData();

  return (
    <div className="courses-hub-page section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-pill">Academic Programs</span>
          <h1 className="section-title">Biology Courses & Programs</h1>
          <p className="section-subtitle">
            Select a course to explore complete syllabus details, routine, and enrollment.
          </p>
        </div>

        {/* Minimal Course Cards Grid */}
        <div className="courses-minimal-grid">
          
          {/* COURSE 1: Alpha Cohort */}
          <div className="course-minimal-card bio-card">
            <div className="c-card-header">
              <div className="c-card-icon green">
                <GraduationCap size={28} />
              </div>
              <div className="c-card-meta">
                <span className="badge badge-green">HSC 2026 / 2027</span>
                <span className="c-seats-tag">{availableSeats} Seats Left</span>
              </div>
            </div>

            <div className="c-card-body">
              <h2 className="c-course-name">
                Alpha Cohort — 4-Month Crash Course
              </h2>
            </div>

            <div className="c-card-actions">
              <Link to="/courses/alpha-cohort" className="btn btn-outline c-cta-btn">
                <Info size={18} /> Details
              </Link>
              <Link to="/enroll?course=alpha-cohort" className="btn btn-primary c-cta-btn">
                Enroll <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* COURSE 2: SSC 2027 Model Test Package */}
          <div className="course-minimal-card bio-card">
            <div className="c-card-header">
              <div className="c-card-icon amber">
                <Target size={28} />
              </div>
              <div className="c-card-meta">
                <span className="badge badge-amber">SSC 2027</span>
                <span className="c-batch-tag">New Batch</span>
              </div>
            </div>

            <div className="c-card-body">
              <h2 className="c-course-name">
                SSC 2027 Model Test Package
              </h2>
            </div>

            <div className="c-card-actions">
              <Link to="/courses/ssc-2027-model-test" className="btn btn-outline c-cta-btn">
                <Info size={18} /> Details
              </Link>
              <Link to="/enroll?course=ssc-2027" className="btn btn-primary c-cta-btn">
                Enroll <ArrowRight size={18} />
              </Link>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .courses-minimal-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .course-minimal-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.25rem 2rem;
          border-radius: var(--radius-xl);
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          box-shadow: 0 10px 30px rgba(41, 78, 54, 0.05);
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
          min-height: 280px;
        }

        .course-minimal-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary-green);
          box-shadow: 0 16px 40px rgba(41, 78, 54, 0.12);
        }

        .c-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .c-card-icon {
          width: 52px;
          height: 52px;
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

        .c-card-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .c-seats-tag {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--dark-green);
          background: var(--light-green);
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }

        .c-batch-tag {
          font-size: 0.78rem;
          font-weight: 700;
          color: #B45309;
          background: #FEF7E6;
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }

        .c-card-body {
          flex: 1;
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }

        .c-course-name {
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--dark-green);
          line-height: 1.3;
          margin: 0;
        }

        .c-card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-subtle);
        }

        .c-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 700;
          padding: 0.85rem 1.25rem;
        }

        @media (max-width: 768px) {
          .courses-minimal-grid {
            grid-template-columns: 1fr;
            max-width: 460px;
          }
        }

        @media (max-width: 480px) {
          .c-card-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
