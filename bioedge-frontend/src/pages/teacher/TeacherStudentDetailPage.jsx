import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { ProgressBar } from '../../components/common/ProgressBar';
import { 
  ArrowLeft, 
  Users, 
  BookOpen, 
  Target, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  Send 
} from 'lucide-react';

export const TeacherStudentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { students, feedbacks, addFeedback } = useCourseData();

  const student = students.find(s => s.id === id) || students[0];
  const studentFeedbacks = feedbacks.filter(f => f.studentId === student?.id || f.studentName === student?.name);

  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackCategory, setFeedbackCategory] = useState('MCQ');

  const handlePostFeedback = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    addFeedback({
      studentId: student.id,
      studentName: student.name,
      category: feedbackCategory,
      title: `${feedbackCategory} Diagnostic Advice`,
      message: feedbackText,
      attachedTo: "Teacher Individual Review"
    });

    setFeedbackText('');
    alert(`Feedback sent to ${student.name}!`);
  };

  return (
    <div className="teacher-student-detail-page">
      <div className="back-btn-row">
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm">
          <ArrowLeft size={16} /> Back to Students
        </button>
      </div>

      {/* Profile Overview */}
      <div className="student-dossier-header bio-card">
        <div className="dossier-top">
          <div className="dossier-avatar">{student.name.charAt(0)}</div>
          <div className="dossier-meta">
            <span className="badge badge-green">Enrolled Student</span>
            <h1 className="dossier-name">{student.name}</h1>
            <p className="dossier-id">{student.studentId} • {student.email} • {student.phone}</p>
          </div>
        </div>

        <div className="dossier-kpi-row">
          <div className="d-kpi">
            <span>Course Progress</span>
            <strong>{student.courseProgress}%</strong>
          </div>
          <div className="d-kpi">
            <span>Average Score</span>
            <strong>{student.averageScore}%</strong>
          </div>
          <div className="d-kpi">
            <span>Classes Attended</span>
            <strong>{student.classesAttended || 32} / 48</strong>
          </div>
          <div className="d-kpi">
            <span>Tests Taken</span>
            <strong>{student.testsCompleted || 12}</strong>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Academic Mastery + Feedback History & Composer */}
      <div className="dossier-grid">
        {/* Left Column: Progress & Test History */}
        <div className="dossier-left-col">
          <div className="academic-breakdown-card bio-card">
            <h3 className="section-title-sm mb-3">Paper-wise Performance</h3>
            
            <div className="paper-prog-box">
              <div className="p-prog-row">
                <span>Biology First Paper (Botany & Cell)</span>
                <strong>{student.paper1Score || 88}%</strong>
              </div>
              <ProgressBar progress={student.paper1Score || 88} height={8} />
            </div>

            <div className="paper-prog-box mt-3">
              <div className="p-prog-row">
                <span>Biology Second Paper (Zoology & Physiology)</span>
                <strong>{student.paper2Score || 85}%</strong>
              </div>
              <ProgressBar progress={student.paper2Score || 85} height={8} />
            </div>
          </div>

          <div className="test-history-card bio-card mt-3">
            <h3 className="section-title-sm mb-3">Recent Test Submissions</h3>
            <div className="test-history-list">
              <div className="t-hist-item">
                <div className="t-hist-info">
                  <strong>Chapter 03 MCQ Practice</strong>
                  <span>Score: 18 / 20 (90%) • Submitted Sept 9</span>
                </div>
                <span className="badge badge-green">Evaluated</span>
              </div>

              <div className="t-hist-item">
                <div className="t-hist-info">
                  <strong>Chapter 02 CQ Written Practice</strong>
                  <span>Score: 17 / 20 (85%) • Submitted Sept 4</span>
                </div>
                <span className="badge badge-green">Evaluated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Feedback Composer & Previous Feedback */}
        <div className="dossier-right-col">
          <div className="feedback-composer-card bio-card">
            <h3 className="section-title-sm mb-2">Send Direct Feedback to {student.name}</h3>
            <p className="composer-sub">
              Target specific diagnostic areas to improve CQ writing or MCQ accuracy.
            </p>

            <form onSubmit={handlePostFeedback}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={feedbackCategory}
                  onChange={(e) => setFeedbackCategory(e.target.value)}
                  className="form-select"
                >
                  <option value="Concept">Concept</option>
                  <option value="MCQ">MCQ</option>
                  <option value="Written">Written</option>
                  <option value="Diagram">Diagram</option>
                  <option value="Time Management">Time Management</option>
                  <option value="Exam Strategy">Exam Strategy</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Feedback Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide personalized academic instructions, diagram correction notes, or revision guidelines..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                <Send size={16} /> Post Feedback to Student
              </button>
            </form>
          </div>

          <div className="feedback-history-card bio-card mt-3">
            <h3 className="section-title-sm mb-3">Previous Feedback Given</h3>
            {studentFeedbacks.length === 0 ? (
              <p className="empty-fb-text">No previous feedback logged for this student.</p>
            ) : (
              <div className="fb-history-list">
                {studentFeedbacks.map((fb) => (
                  <div key={fb.id} className="fb-hist-item">
                    <div className="fb-hist-head">
                      <span className="badge badge-amber">{fb.category}</span>
                      <span className="fb-hist-date">{fb.date}</span>
                    </div>
                    <p className="fb-hist-msg">"{fb.message}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .teacher-student-detail-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .student-dossier-header {
          padding: 2.25rem;
          background: linear-gradient(135deg, #FAF6ED 0%, #FFFFFF 100%);
          border-color: #E8DECE;
        }
        .dossier-top {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .dossier-avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          font-weight: 700;
          font-family: var(--font-heading);
        }
        .dossier-name {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.25rem;
        }
        .dossier-id {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .dossier-kpi-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          border-top: 1px solid #E8DECE;
          padding-top: 1.25rem;
        }
        .d-kpi span {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .d-kpi strong {
          font-size: 1.25rem;
          color: var(--dark-green);
        }

        .dossier-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.75rem;
        }
        .academic-breakdown-card, .test-history-card, .feedback-composer-card, .feedback-history-card {
          padding: 2rem;
        }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-3 { margin-bottom: 1.25rem; }
        .mt-3 { margin-top: 1.25rem; }
        .p-prog-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          margin-bottom: 0.35rem;
        }
        .test-history-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .t-hist-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: var(--light-green-subtle);
          border-radius: var(--radius-md);
        }
        .t-hist-info strong {
          display: block;
          font-size: 0.88rem;
          color: var(--text-dark);
        }
        .t-hist-info span {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .composer-sub {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }
        .fb-history-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .fb-hist-item {
          padding: 0.85rem 1rem;
          background: var(--light-green-subtle);
          border-radius: var(--radius-md);
        }
        .fb-hist-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.35rem;
        }
        .fb-hist-date {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .fb-hist-msg {
          font-size: 0.85rem;
          color: var(--text-dark);
          font-style: italic;
        }

        @media (max-width: 850px) {
          .dossier-grid {
            grid-template-columns: 1fr;
          }
          .dossier-kpi-row {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
};
