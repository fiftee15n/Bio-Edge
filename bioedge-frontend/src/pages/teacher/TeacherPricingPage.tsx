import React, { useState } from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { Tag, Users, Save, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const TeacherPricingPage: React.FC = () => {
  const { course, updateCourse, availableSeats, activeStudentsCount } = useCourseData();
  const [saved, setSaved] = useState<boolean>(false);
  const [monthlyFee, setMonthlyFee] = useState<number | string>(course.monthlyFee);
  const [fullCourseFee, setFullCourseFee] = useState<number | string>(course.fullCourseFee);
  const [seatLimit, setSeatLimit] = useState<number | string>(course.seatLimit);
  const [whyLimitedSeats, setWhyLimitedSeats] = useState<string>(course.whyLimitedSeats);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCourse({
      monthlyFee: Number(monthlyFee),
      fullCourseFee: Number(fullCourseFee),
      seatLimit: Number(seatLimit),
      whyLimitedSeats
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="teacher-pricing-page">
      <div className="pricing-mgr-header bio-card">
        <div>
          <span className="badge badge-amber">Capacity & Tuition Configurator</span>
          <h1 className="p-mgr-title">Pricing & Seat Capacity Settings</h1>
          <p className="p-mgr-sub">
            Dynamically adjust cohort seat thresholds, monthly installment prices, and full course packages.
          </p>
        </div>

        {saved && (
          <span className="badge badge-green save-pill">
            <CheckCircle2 size={16} /> Saved & Synchronized Live!
          </span>
        )}
      </div>

      <div className="pricing-mgr-grid">
        <div className="pricing-form-card bio-card">
          <form onSubmit={handleSave}>
            <h3 className="section-title-sm mb-3">Tuition Rates</h3>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Monthly Installment Fee (৳)</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={monthlyFee}
                  onChange={(e) => setMonthlyFee(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full 4-Month Course Fee (৳)</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={fullCourseFee}
                  onChange={(e) => setFullCourseFee(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <h3 className="section-title-sm mb-3 mt-4">Capacity Threshold</h3>

            <div className="form-group">
              <label className="form-label">Maximum Cohort Capacity (Students)</label>
              <input
                type="number"
                min="5"
                max="50"
                required
                value={seatLimit}
                onChange={(e) => setSeatLimit(e.target.value)}
                className="form-input"
              />
              <span className="input-hint">
                Recommended limit: 15–20 students to preserve personal CQ answer review.
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">"Why Only 15–20 Students?" Explanation Note</label>
              <textarea
                rows={3}
                required
                value={whyLimitedSeats}
                onChange={(e) => setWhyLimitedSeats(e.target.value)}
                className="form-textarea"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg mt-3">
              <Save size={18} /> Save & Update Public Website
            </button>
          </form>
        </div>

        {/* Live Seat Formula Breakdown */}
        <div className="seat-formula-card bio-card">
          <h3 className="section-title-sm mb-3">Seat Management Formula (Section 39)</h3>

          <div className="formula-box">
            <div className="formula-item">
              <span>Total Capacity:</span>
              <strong>{seatLimit} Seats</strong>
            </div>
            <div className="formula-op">-</div>
            <div className="formula-item">
              <span>Active Enrolled Students:</span>
              <strong>{activeStudentsCount} Students</strong>
            </div>
            <div className="formula-op">=</div>
            <div className="formula-item highlight">
              <span>Available Seats:</span>
              <strong className="formula-res">{Math.max(0, Number(seatLimit) - activeStudentsCount)} Remaining</strong>
            </div>
          </div>

          <div className="public-display-preview">
            <h4 className="preview-heading">Public Website Display Preview:</h4>
            <div className="preview-bubble">
              <span className="pulse-dot"></span>
              <strong>Only {Math.max(0, Number(seatLimit) - activeStudentsCount)} seats remaining</strong>
            </div>
            <p className="preview-note">
              This count updates immediately on the homepage hero banner, navbar pill, and pricing cards without hardcoded values.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .teacher-pricing-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .pricing-mgr-header {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .p-mgr-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .p-mgr-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .save-pill {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
        }

        .pricing-mgr-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 1.75rem;
        }
        .pricing-form-card, .seat-formula-card {
          padding: 2.25rem;
        }
        .section-title-sm {
          font-size: 1.15rem;
          color: var(--dark-green);
        }
        .mb-3 { margin-bottom: 1.25rem; }
        .mt-4 { margin-top: 1.75rem; }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .input-hint {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
          display: block;
        }

        .formula-box {
          background: var(--light-green-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          margin-bottom: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .formula-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }
        .formula-item strong {
          color: var(--dark-green);
        }
        .formula-item.highlight {
          border-top: 1px solid var(--border-color);
          padding-top: 0.6rem;
          margin-top: 0.25rem;
        }
        .formula-res {
          font-size: 1.25rem !important;
          color: #B45309 !important;
        }
        .formula-op {
          font-size: 1.1rem;
          color: var(--text-muted);
          font-weight: bold;
          text-align: center;
        }

        .public-display-preview {
          border-top: 1px solid var(--border-subtle);
          padding-top: 1.25rem;
        }
        .preview-heading {
          font-size: 0.85rem;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .preview-bubble {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--light-green);
          border: 1px solid rgba(49, 91, 61, 0.2);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          color: var(--dark-green);
          margin-bottom: 0.75rem;
        }
        .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--success);
        }
        .preview-note {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        @media (max-width: 850px) {
          .pricing-mgr-grid {
            grid-template-columns: 1fr;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .pricing-mgr-header {
            padding: 1.25rem 1rem;
          }
          .pricing-form-card, .seat-formula-card {
            padding: 1.25rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};
