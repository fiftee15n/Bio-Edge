import React, { useState } from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { BookOpen, Save, CheckCircle2, ShieldCheck } from 'lucide-react';

export const TeacherCoursePage = () => {
  const { course, updateCourse, availableSeats, activeStudentsCount } = useCourseData();
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    title: course.title,
    subtitle: course.subtitle,
    description: course.description,
    duration: course.duration,
    totalClasses: course.totalClasses,
    seatLimit: course.seatLimit,
    monthlyFee: course.monthlyFee,
    fullCourseFee: course.fullCourseFee,
    status: course.status,
    batchName: course.batchName,
    classDays: course.classDays
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourse({
      ...formData,
      totalClasses: Number(formData.totalClasses),
      seatLimit: Number(formData.seatLimit),
      monthlyFee: Number(formData.monthlyFee),
      fullCourseFee: Number(formData.fullCourseFee)
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="teacher-course-page">
      <div className="course-mgr-header bio-card">
        <div>
          <span className="badge badge-amber">Course Administration</span>
          <h1 className="mgr-title">Course Parameters & Capacity</h1>
          <p className="mgr-sub">
            Update program descriptors, seat thresholds, and tuition fees in real time.
          </p>
        </div>

        {saved && (
          <span className="badge badge-green save-alert">
            <CheckCircle2 size={16} /> Changes Saved Successfully!
          </span>
        )}
      </div>

      <div className="course-mgr-grid">
        {/* Form Card */}
        <div className="course-mgr-form-card bio-card">
          <form onSubmit={handleSubmit}>
            <h3 className="section-title-sm mb-3">Course Identity</h3>

            <div className="form-group">
              <label className="form-label">Flagship Course Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Supporting Subtitle Headline</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Program Description (Public Homepage)</label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-textarea"
              />
            </div>

            <h3 className="section-title-sm mb-3 mt-4">Capacity & Schedule Specifications</h3>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Cohort Seat Limit</label>
                <input
                  type="number"
                  min="5"
                  max="50"
                  required
                  value={formData.seatLimit}
                  onChange={(e) => setFormData({ ...formData, seatLimit: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Total Live Classes</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.totalClasses}
                  onChange={(e) => setFormData({ ...formData, totalClasses: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Batch Designation</label>
                <input
                  type="text"
                  value={formData.batchName}
                  onChange={(e) => setFormData({ ...formData, batchName: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Live Class Timings</label>
                <input
                  type="text"
                  value={formData.classDays}
                  onChange={(e) => setFormData({ ...formData, classDays: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <h3 className="section-title-sm mb-3 mt-4">Tuition Pricing</h3>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Monthly Installment Fee (৳)</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.monthlyFee}
                  onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Course Package Fee (৳)</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.fullCourseFee}
                  onChange={(e) => setFormData({ ...formData, fullCourseFee: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg mt-3">
              <Save size={18} /> Update Course Information
            </button>
          </form>
        </div>

        {/* Live Calculation Preview Card */}
        <div className="course-live-preview-card bio-card">
          <h3 className="section-title-sm mb-3">Public Dynamic Reflection</h3>

          <div className="preview-stat-box">
            <span>Enrolled Students</span>
            <strong>{activeStudentsCount} / {formData.seatLimit}</strong>
          </div>

          <div className="preview-stat-box highlight">
            <span>Remaining Seats Shown on Public Website</span>
            <strong className="seat-calc-num">{Math.max(0, formData.seatLimit - activeStudentsCount)} Seats</strong>
          </div>

          <div className="preview-stat-box">
            <span>Tuition Shown on Public Website</span>
            <strong>৳{Number(formData.fullCourseFee).toLocaleString()} (Full) • ৳{Number(formData.monthlyFee).toLocaleString()} / mo</strong>
          </div>

          <div className="live-sync-notice">
            <ShieldCheck size={18} className="sync-icon" />
            <p>
              Changes saved here instantly update the public hero banner, pricing section, and student dashboard without code rebuilds.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .teacher-course-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .course-mgr-header {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .mgr-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .mgr-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .save-alert {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
        }

        .course-mgr-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 1.75rem;
        }
        .course-mgr-form-card, .course-live-preview-card {
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

        .preview-stat-box {
          background: var(--light-green-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem;
          margin-bottom: 1rem;
        }
        .preview-stat-box.highlight {
          background: var(--light-green);
          border-color: rgba(49, 91, 61, 0.2);
        }
        .preview-stat-box span {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .preview-stat-box strong {
          display: block;
          font-size: 1.15rem;
          color: var(--dark-green);
          margin-top: 0.2rem;
        }
        .seat-calc-num {
          font-size: 1.5rem !important;
        }
        .live-sync-notice {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: #FAF6ED;
          border: 1px solid #E8DECE;
          padding: 1rem;
          border-radius: var(--radius-md);
          margin-top: 1.5rem;
          font-size: 0.82rem;
          color: #92400E;
        }
        .sync-icon {
          color: #B45309;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        @media (max-width: 850px) {
          .course-mgr-grid {
            grid-template-columns: 1fr;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
