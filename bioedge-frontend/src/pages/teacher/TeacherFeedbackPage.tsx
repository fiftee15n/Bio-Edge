import React, { useState } from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { MessageSquare, Send, Calendar, User, Tag, CheckCircle2 } from 'lucide-react';

export const TeacherFeedbackPage: React.FC = () => {
  const { students, feedbacks, addFeedback, teacher } = useCourseData();

  const [selectedStudent, setSelectedStudent] = useState<string>('all');
  const [category, setCategory] = useState<string>('MCQ');
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [attachedTo, setAttachedTo] = useState<string>('Chapter 04: Microorganisms');

  const handlePostFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const targetStudent = students.find(s => s.id === selectedStudent);
    const studentName = selectedStudent === 'all' ? 'Entire Alpha Cohort' : (targetStudent?.name || 'Tariqul Islam');

    addFeedback({
      studentId: selectedStudent === 'all' ? 'all' : targetStudent?.id,
      studentName: studentName,
      category: category,
      title: title || `${category} Improvement Advice`,
      message: message,
      attachedTo: attachedTo
    });

    setMessage('');
    setTitle('');
    alert(`Feedback broadcasted to ${studentName}!`);
  };

  return (
    <div className="teacher-feedback-page">
      <div className="feedback-mgr-header bio-card">
        <div>
          <span className="badge badge-amber">Mentorship Center</span>
          <h1 className="fb-mgr-title">Student Diagnostic Feedback Hub</h1>
          <p className="fb-mgr-sub">
            Deliver personalized academic feedback, diagram correction notes, and exam strategy advice.
          </p>
        </div>
      </div>

      <div className="feedback-mgr-grid">
        {/* Composer Form */}
        <div className="feedback-composer-card bio-card">
          <h3 className="section-title-sm mb-3">Compose New Academic Feedback</h3>

          <form onSubmit={handlePostFeedback}>
            <div className="form-group">
              <label className="form-label">Recipient Student</label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="form-select"
              >
                <option value="all">Broadcast to Entire Cohort (All Students)</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.studentId})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                >
                  <option value="Concept">Concept</option>
                  <option value="MCQ">MCQ Accuracy</option>
                  <option value="Written">Written CQ Structure</option>
                  <option value="Diagram">Diagram Precision</option>
                  <option value="Time Management">Time Management</option>
                  <option value="Exam Strategy">Exam Strategy</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Associated Context / Chapter</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chapter 04 MCQ Practice"
                  value={attachedTo}
                  onChange={(e) => setAttachedTo(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Feedback Headline</label>
              <input
                type="text"
                required
                placeholder="e.g. Improve Pachytene Synapsis Diagram Labels"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Detailed Advice & Actionable Steps *</label>
              <textarea
                rows={4}
                required
                placeholder="Write specific recommendations for the student to review before their next assessment..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-textarea"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg mt-3">
              <Send size={18} /> Send Feedback Directly to Student Portal
            </button>
          </form>
        </div>

        {/* Feedback History Stream */}
        <div className="feedback-stream-card bio-card">
          <h3 className="section-title-sm mb-3">Recently Published Feedback ({feedbacks.length})</h3>

          <div className="feedback-stream-list">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="stream-item">
                <div className="stream-head">
                  <span className="badge badge-green">{fb.category}</span>
                  <span className="stream-date">{fb.date}</span>
                </div>
                <h4 className="stream-title">{fb.title}</h4>
                <span className="stream-target">Recipient: {fb.studentName || 'Student'}</span>
                <p className="stream-msg">"{fb.message}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .teacher-feedback-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .feedback-mgr-header {
          padding: 2rem;
        }
        .fb-mgr-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .fb-mgr-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .feedback-mgr-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 1.75rem;
        }
        .feedback-composer-card, .feedback-stream-card {
          padding: 2.25rem;
        }
        .section-title-sm {
          font-size: 1.15rem;
          color: var(--dark-green);
        }
        .mb-3 { margin-bottom: 1.25rem; }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .feedback-stream-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 520px;
          overflow-y: auto;
        }
        .stream-item {
          background: var(--light-green-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem;
        }
        .stream-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.35rem;
        }
        .stream-date {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .stream-title {
          font-size: 0.95rem;
          color: var(--dark-green);
          margin-bottom: 0.2rem;
        }
        .stream-target {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--primary-green);
          display: block;
          margin-bottom: 0.5rem;
        }
        .stream-msg {
          font-size: 0.85rem;
          color: var(--text-dark);
          font-style: italic;
          line-height: 1.45;
        }

        @media (max-width: 850px) {
          .feedback-mgr-grid {
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
