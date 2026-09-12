import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Users,
  Target,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useCourseData } from '../../context/CourseDataContext';

export const CoursesPage: React.FC = () => {
  const { availableSeats } = useCourseData();

  return (
    <div className="courses-hub-page section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-pill">Academic Offerings</span>
          <h1 className="section-title">All Biology Programs & Model Tests</h1>
          <p className="section-subtitle">
            Curated preparation paths designed by Afroza Tahmina for HSC Biology Mastery and SSC Board Exam Excellence.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="courses-showcase-grid">
          
          {/* COURSE 1: Alpha Cohort (4-Month Crash Course) */}
          <div className="course-card-hub bio-card featured-course-hub">
            <div className="course-card-top-pill">
              <span className="badge badge-green">Flagship Intensive</span>
              <span className="seats-tag">{availableSeats} Seats Remaining</span>
            </div>

            <div className="course-hub-body">
              <div className="course-level-tag">HSC 2026 / 2027 • 1st & 2nd Paper</div>
              <h2 className="course-hub-title">
                Alpha Cohort — 4-Month Crash Course
              </h2>
              <p className="course-hub-desc">
                Complete intensive coverage of all 24 chapters across Botany and Zoology. 48 live classes, weekly chapter quizzes, 3 milestone exams, and full-length Board simulation tests.
              </p>

              <div className="course-specs-grid">
                <div className="spec-item">
                  <Clock size={16} className="spec-icon" />
                  <div>
                    <strong>4 Months</strong>
                    <span>16 Weeks</span>
                  </div>
                </div>
                <div className="spec-item">
                  <BookOpen size={16} className="spec-icon" />
                  <div>
                    <strong>48 Live Classes</strong>
                    <span>3 Classes / Week</span>
                  </div>
                </div>
                <div className="spec-item">
                  <Target size={16} className="spec-icon" />
                  <div>
                    <strong>24 Chapters</strong>
                    <span>Botany + Zoology</span>
                  </div>
                </div>
                <div className="spec-item">
                  <Users size={16} className="spec-icon" />
                  <div>
                    <strong>15–20 Students</strong>
                    <span>Small Batch Focus</span>
                  </div>
                </div>
              </div>

              <div className="course-curriculum-bullets">
                <div className="c-bullet">
                  <CheckCircle2 size={16} className="c-check" />
                  <span>5 Core Pillars: Concept • Practice • Exam • Revision • Confidence</span>
                </div>
                <div className="c-bullet">
                  <CheckCircle2 size={16} className="c-check" />
                  <span>Line-by-line Creative Question (CQ) answer grading with feedback</span>
                </div>
                <div className="c-bullet">
                  <CheckCircle2 size={16} className="c-check" />
                  <span>80+ Annotated Board Exam Diagram Notebook PDF included</span>
                </div>
              </div>

              <div className="course-pricing-row">
                <div className="price-tag-block">
                  <span className="price-label">Tuition:</span>
                  <div className="price-val-wrap">
                    <span className="cur">৳</span>
                    <span className="num">12,500</span>
                    <span className="period">/ complete (or ৳3,500/mo)</span>
                  </div>
                </div>
                <div className="course-action-btns">
                  <Link to="/courses/alpha-cohort" className="btn btn-outline">
                    View Course Details
                  </Link>
                  <Link to="/enroll?course=alpha-cohort" className="btn btn-primary">
                    Enroll in Alpha Cohort <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* COURSE 2: SSC 2027 Model Test Package */}
          <div className="course-card-hub bio-card">
            <div className="course-card-top-pill">
              <span className="badge badge-amber">SSC 2027 Exclusive</span>
              <span className="batch-status-tag">Enrollment Active</span>
            </div>

            <div className="course-hub-body">
              <div className="course-level-tag">Class 9–10 • General Biology</div>
              <h2 className="course-hub-title">
                SSC 2027 Model Test Package
              </h2>
              <p className="course-hub-desc">
                20 Board Standard full-length model tests covering all 14 chapters of SSC Biology. Features written CQ evaluation, live doubt-clearing masterclasses, and diagram accuracy scoring.
              </p>

              <div className="course-specs-grid">
                <div className="spec-item">
                  <Award size={16} className="spec-icon" />
                  <div>
                    <strong>20 Model Tests</strong>
                    <span>MCQ + CQ + Diagrams</span>
                  </div>
                </div>
                <div className="spec-item">
                  <BookOpen size={16} className="spec-icon" />
                  <div>
                    <strong>14 Chapters</strong>
                    <span>Complete SSC Syllabus</span>
                  </div>
                </div>
                <div className="spec-item">
                  <Zap size={16} className="spec-icon" />
                  <div>
                    <strong>8 Masterclasses</strong>
                    <span>Live Solution Sessions</span>
                  </div>
                </div>
                <div className="spec-item">
                  <ShieldCheck size={16} className="spec-icon" />
                  <div>
                    <strong>100% Evaluation</strong>
                    <span>Annotated PDF Rubrics</span>
                  </div>
                </div>
              </div>

              <div className="course-curriculum-bullets">
                <div className="c-bullet">
                  <CheckCircle2 size={16} className="c-check" />
                  <span>Timed online CBT MCQs + offline written CQ grading</span>
                </div>
                <div className="c-bullet">
                  <CheckCircle2 size={16} className="c-check" />
                  <span>Top 10-Year repeated Board question analysis & prediction bank</span>
                </div>
                <div className="c-bullet">
                  <CheckCircle2 size={16} className="c-check" />
                  <span>35+ Mandatory SSC biology diagram labeling guidelines</span>
                </div>
              </div>

              <div className="course-pricing-row">
                <div className="price-tag-block">
                  <span className="price-label">Package Fee:</span>
                  <div className="price-val-wrap">
                    <span className="cur">৳</span>
                    <span className="num">2,200</span>
                    <span className="period"><del>৳3,000</del> (One-time)</span>
                  </div>
                </div>
                <div className="course-action-btns">
                  <Link to="/courses/ssc-2027-model-test" className="btn btn-outline">
                    View Course Details
                  </Link>
                  <Link to="/enroll?course=ssc-2027" className="btn btn-primary">
                    Enroll in SSC Package <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .courses-showcase-grid {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
          max-width: 960px;
          margin: 0 auto;
        }

        .course-card-hub {
          padding: 2.25rem;
          border-radius: var(--radius-xl);
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-md);
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .featured-course-hub {
          border-color: rgba(49, 91, 61, 0.35);
          box-shadow: 0 12px 36px rgba(41, 78, 54, 0.08);
        }

        .course-card-hub:hover {
          transform: translateY(-3px);
          border-color: var(--primary-green);
          box-shadow: 0 16px 44px rgba(41, 78, 54, 0.12);
        }

        .course-card-top-pill {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 1rem;
          margin-bottom: 1.25rem;
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

        .course-level-tag {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--primary-green);
          margin-bottom: 0.35rem;
        }

        .course-hub-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--dark-green);
          margin-bottom: 0.6rem;
          line-height: 1.25;
        }

        .course-hub-desc {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin-bottom: 1.5rem;
        }

        .course-specs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          background: var(--light-green-subtle);
          border: 1px solid var(--border-subtle);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-lg);
          margin-bottom: 1.5rem;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .spec-icon {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .spec-item strong {
          display: block;
          font-size: 0.9rem;
          color: var(--dark-green);
          line-height: 1.2;
        }

        .spec-item span {
          font-size: 0.74rem;
          color: var(--text-muted);
        }

        .course-curriculum-bullets {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.75rem;
        }

        .c-bullet {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.88rem;
          color: var(--text-dark);
        }

        .c-check {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .course-pricing-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1.5rem;
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        .price-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 600;
          display: block;
          margin-bottom: 0.2rem;
        }

        .price-val-wrap {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
        }

        .price-val-wrap .cur {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--dark-green);
        }

        .price-val-wrap .num {
          font-size: 2rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--dark-green);
          line-height: 1;
        }

        .price-val-wrap .period {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-left: 0.25rem;
        }

        .course-action-btns {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .course-specs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .course-pricing-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .course-action-btns {
            width: 100%;
          }
          .course-action-btns .btn {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
};
