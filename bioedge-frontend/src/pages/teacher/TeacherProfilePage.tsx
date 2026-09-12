import React, { useState } from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { UserCheck, Save, CheckCircle2, Phone, Mail, Sparkles } from 'lucide-react';

export const TeacherProfilePage: React.FC = () => {
  const { teacher, updateTeacher } = useCourseData();
  const [saved, setSaved] = useState<boolean>(false);
  const [form, setForm] = useState({
    name: teacher.name,
    designation: teacher.designation,
    institution: teacher.institution,
    experience: teacher.experience,
    specialization: teacher.specialization,
    bio: teacher.bio,
    contactNumber: teacher.contactNumber,
    email: teacher.email,
    quote: teacher.quote
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateTeacher(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="teacher-profile-page">
      <div className="profile-mgr-header bio-card">
        <div>
          <span className="badge badge-amber">Public Faculty Profile</span>
          <h1 className="prof-mgr-title">Teacher Profile & Credentials</h1>
          <p className="prof-mgr-sub">
            Update your public bio, academic qualifications, and direct student contact numbers.
          </p>
        </div>

        {saved && (
          <span className="badge badge-green save-pill">
            <CheckCircle2 size={16} /> Profile Updated Live!
          </span>
        )}
      </div>

      <div className="profile-mgr-grid">
        <div className="profile-edit-card bio-card">
          <form onSubmit={handleSave}>
            <h3 className="section-title-sm mb-3">Professional Information</h3>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Teacher Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Designation / Title</label>
                <input
                  type="text"
                  required
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Current College / Institution</label>
              <input
                type="text"
                required
                value={form.institution}
                onChange={(e) => setForm({ ...form, institution: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Teaching Experience</label>
                <input
                  type="text"
                  required
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Direct Contact Number</label>
                <input
                  type="text"
                  required
                  value={form.contactNumber}
                  onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Official Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Biology Specialization</label>
              <input
                type="text"
                required
                value={form.specialization}
                onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Professional Bio Summary</label>
              <textarea
                rows={4}
                required
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Teacher Philosophy Quote</label>
              <textarea
                rows={2}
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                className="form-textarea"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg mt-3">
              <Save size={18} /> Save Public Teacher Profile
            </button>
          </form>
        </div>

        {/* Live Public Profile Card Preview */}
        <div className="profile-preview-card bio-card">
          <h3 className="section-title-sm mb-3">Live Homepage Card Preview</h3>

          <div className="preview-avatar-box">
            AT
          </div>

          <h2 className="preview-name">{form.name}</h2>
          <p className="preview-inst">{form.institution}</p>
          <p className="preview-spec"><strong>Specialization:</strong> {form.specialization}</p>

          <div className="preview-quote-box">
            <p>"{form.quote}"</p>
          </div>

          <div className="preview-contact-item">
            <Phone size={15} />
            <span>{form.contactNumber}</span>
          </div>
        </div>
      </div>

      <style>{`
        .teacher-profile-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .profile-mgr-header {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .prof-mgr-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .prof-mgr-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .save-pill {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
        }

        .profile-mgr-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 1.75rem;
        }
        .profile-edit-card, .profile-preview-card {
          padding: 2.25rem;
        }
        .section-title-sm {
          font-size: 1.15rem;
          color: var(--dark-green);
        }
        .mb-3 { margin-bottom: 1.25rem; }
        .mt-3 { margin-top: 1.25rem; }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .preview-avatar-box {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
          font-family: var(--font-heading);
          margin-bottom: 1rem;
          border: 4px solid var(--light-green);
        }
        .preview-name {
          font-size: 1.35rem;
          color: var(--dark-green);
        }
        .preview-inst {
          font-size: 0.85rem;
          color: var(--primary-green);
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        .preview-spec {
          font-size: 0.82rem;
          color: var(--text-dark);
          margin-bottom: 1rem;
        }
        .preview-quote-box {
          background: var(--light-green-subtle);
          border-left: 3px solid var(--primary-green);
          padding: 0.75rem 1rem;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-style: italic;
          font-size: 0.82rem;
          color: var(--dark-green);
          margin-bottom: 1.25rem;
        }
        .preview-contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-dark);
        }

        @media (max-width: 850px) {
          .profile-mgr-grid {
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
