import React from 'react';
import { Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { CheckCircle2, ArrowRight, Users, ShieldCheck, Sparkles } from 'lucide-react';

export const PricingPage = () => {
  const { course, availableSeats, activeStudentsCount } = useCourseData();

  return (
    <div className="pricing-page-wrapper section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-pill">Transparent Tuition</span>
          <h1 className="section-title">Program Tuition & Plans</h1>
          <p className="section-subtitle">
            Invest in focused, small-batch Biology preparation with personal mentor attention.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-cards-grid">
          {/* Monthly Plan */}
          <div className="pricing-card bio-card">
            <div className="pricing-plan-name">Monthly Installment</div>
            <div className="pricing-amount">
              <span className="currency">৳</span>
              <span className="price-val">{course.monthlyFee.toLocaleString()}</span>
              <span className="price-period">/ month</span>
            </div>
            <p className="pricing-plan-desc">
              Pay monthly throughout the 4-month preparation duration.
            </p>
            <ul className="pricing-features">
              <li><CheckCircle2 size={16} className="p-check" /> 12 Live Classes per Month</li>
              <li><CheckCircle2 size={16} className="p-check" /> Weekly Chapter Quizzes & MCQ Sets</li>
              <li><CheckCircle2 size={16} className="p-check" /> Personal Written CQ Feedback</li>
              <li><CheckCircle2 size={16} className="p-check" /> Live Class Recording Archives</li>
            </ul>
            <Link to="/enroll?plan=monthly" className="btn btn-outline btn-block">
              Enroll Monthly
            </Link>
          </div>

          {/* Full Course Package */}
          <div className="pricing-card bio-card featured-pricing-card">
            <div className="pricing-badge-popular">Best Value • Save ৳1,500</div>
            <div className="pricing-plan-name">Full 4-Month Course</div>
            <div className="pricing-amount">
              <span className="currency">৳</span>
              <span className="price-val">{course.fullCourseFee.toLocaleString()}</span>
              <span className="price-period">/ complete course</span>
            </div>
            <p className="pricing-plan-desc">
              Complete one-time enrollment covering all First & Second Paper chapters and model tests.
            </p>
            <ul className="pricing-features">
              <li><CheckCircle2 size={16} className="p-check" /> All 48 Intensive Live Classes</li>
              <li><CheckCircle2 size={16} className="p-check" /> All Chapter Practice Tests & Quizzes</li>
              <li><CheckCircle2 size={16} className="p-check" /> Full Syllabus Board Model Tests</li>
              <li><CheckCircle2 size={16} className="p-check" /> High-Resolution Diagram Notes PDF</li>
              <li><CheckCircle2 size={16} className="p-check" /> Guaranteed Seat Reservation</li>
            </ul>
            <Link to="/enroll?plan=full" className="btn btn-primary btn-block">
              Enroll in Full Program
            </Link>
          </div>
        </div>

        {/* Seat Counter Warning Box */}
        <div className="seats-alert-card bio-card">
          <div className="seats-alert-left">
            <Users size={24} className="s-alert-icon" />
            <div>
              <h4 className="s-alert-title">Strict Batch Cap ({course.seatLimit} Students Maximum)</h4>
              <p className="s-alert-desc">
                We maintain a strict limit of 15–20 students per cohort to guarantee line-by-line review of your written exam answers.
              </p>
            </div>
          </div>
          <div className="seats-alert-badge">
            <strong>{availableSeats}</strong>
            <span>Seats Remaining</span>
          </div>
        </div>
      </div>

      <style>{`
        .pricing-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          max-width: 840px;
          margin: 0 auto 3rem;
        }
        .pricing-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .featured-pricing-card {
          border: 2px solid var(--dark-green);
          box-shadow: var(--shadow-md);
        }
        .pricing-badge-popular {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--dark-green);
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.3rem 0.9rem;
          border-radius: var(--radius-full);
        }
        .pricing-plan-name {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-bottom: 0.75rem;
        }
        .pricing-amount {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
          margin-bottom: 0.75rem;
        }
        .currency {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--dark-green);
        }
        .price-val {
          font-size: 3rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--dark-green);
          line-height: 1;
        }
        .price-period {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .pricing-plan-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 1.75rem;
          min-height: 42px;
        }
        .pricing-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 2rem;
          flex: 1;
        }
        .pricing-features li {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          color: var(--text-dark);
        }
        .p-check {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .seats-alert-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--light-green);
          border-color: rgba(49, 91, 61, 0.2);
          padding: 2rem;
          max-width: 840px;
          margin: 0 auto;
        }
        .seats-alert-left {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .s-alert-icon {
          color: var(--dark-green);
          flex-shrink: 0;
        }
        .s-alert-title {
          font-size: 1.05rem;
          color: var(--dark-green);
          font-weight: 700;
        }
        .s-alert-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }
        .seats-alert-badge {
          background: var(--dark-green);
          color: #FFFFFF;
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-md);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .seats-alert-badge strong {
          font-size: 1.5rem;
          line-height: 1;
        }
        .seats-alert-badge span {
          font-size: 0.7rem;
          text-transform: uppercase;
        }
        @media (max-width: 800px) {
          .pricing-cards-grid {
            grid-template-columns: 1fr;
          }
          .seats-alert-card {
            flex-direction: column;
            text-align: center;
            gap: 1.25rem;
          }
          .seats-alert-left {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};
