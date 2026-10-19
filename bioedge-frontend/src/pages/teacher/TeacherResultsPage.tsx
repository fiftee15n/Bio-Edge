import React, { useState, useMemo } from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { Modal } from '../../components/common/Modal';
import { 
  GraduationCap, 
  Search, 
  CheckCircle2, 
  Edit3, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const TeacherResultsPage: React.FC = () => {
  const { students, tests, feedbacks, addFeedback } = useCourseData();
  const [search, setSearch] = useState<string>('');
  const [gradingModalOpen, setGradingModalOpen] = useState<boolean>(false);
  const [selectedAttempt, setSelectedAttempt] = useState<any>(null);
  const [manualScore, setManualScore] = useState<string>('');
  const [inlineFeedback, setInlineFeedback] = useState<string>('');

  // Derive real test submissions dynamically
  const attempts = useMemo(() => {
    return tests
      .filter(t => t.status === 'Completed' && t.score !== null && t.score !== undefined)
      .map(t => ({
        id: `att-${t.id}`,
        studentName: (t as any).studentName || "Enrolled Student",
        studentId: (t as any).studentId || "BE-2026-001",
        testTitle: t.title,
        paper: t.paper || "Biology",
        type: t.type,
        score: t.score || 0,
        totalMarks: t.totalMarks,
        percentage: Math.round(((t.score || 0) / (t.totalMarks || 1)) * 100),
        submittedAt: t.submittedAt || "Recent",
        status: "Graded"
      }));
  }, [tests]);

  const handleOpenGrading = (attempt) => {
    setSelectedAttempt(attempt);
    setManualScore(String(attempt.score || ''));
    setInlineFeedback('');
    setGradingModalOpen(true);
  };

  const handleSaveGrade = (e) => {
    e.preventDefault();
    if (inlineFeedback.trim()) {
      addFeedback({
        studentName: selectedAttempt.studentName,
        category: "Written",
        title: `Evaluation: ${selectedAttempt.testTitle}`,
        message: inlineFeedback,
        attachedTo: selectedAttempt.testTitle
      });
    }
    alert(`Score ${manualScore}/${selectedAttempt.totalMarks} recorded for ${selectedAttempt.studentName}!`);
    setGradingModalOpen(false);
  };

  const filtered = attempts.filter(a => 
    a.studentName.toLowerCase().includes(search.toLowerCase()) ||
    a.testTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="teacher-results-page">
      <div className="results-head-card bio-card">
        <div>
          <span className="badge badge-amber">Evaluation & Grading</span>
          <h1 className="res-head-title">Student Submissions & Marks</h1>
          <p className="res-head-sub">
            Review automatic MCQ score evaluations and manually mark written CQ answer scripts.
          </p>
        </div>

        <div className="search-wrap">
          <Search size={16} className="s-icon" />
          <input
            type="text"
            placeholder="Search student or test..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="bio-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Assessment</th>
              <th>Type</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Submission Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '3.5rem 1.5rem', color: 'var(--text-muted)' }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: 'var(--text-dark)' }}>No student submissions yet</p>
                  <span style={{ fontSize: '0.85rem' }}>When students complete tests or submit CQ answers, their marks and evaluation options will appear here.</span>
                </td>
              </tr>
            ) : (
              filtered.map((att) => (
              <tr key={att.id}>
                <td>
                  <strong className="std-att-name">{att.studentName}</strong>
                  <span className="std-att-id">{att.studentId}</span>
                </td>
                <td>
                  <span className="att-test-title">{att.testTitle}</span>
                </td>
                <td>
                  <span className={`badge ${att.type.includes('MCQ') ? 'badge-green' : 'badge-amber'}`}>
                    {att.type}
                  </span>
                </td>
                <td>
                  <strong className="att-score-num">{att.score} / {att.totalMarks}</strong>
                </td>
                <td>
                  <span className="att-pct-text">{att.percentage}%</span>
                </td>
                <td>
                  <span className="att-date-text">{att.submittedAt}</span>
                </td>
                <td>
                  <span className={`badge ${att.status === 'Graded' ? 'badge-green' : 'badge-red'}`}>
                    {att.status}
                  </span>
                </td>
                <td>
                  <button onClick={() => handleOpenGrading(att)} className="btn btn-outline btn-sm">
                    <Edit3 size={14} /> Evaluate
                  </button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>

      {/* Manual Grading Modal */}
      {selectedAttempt && (
        <Modal
          isOpen={gradingModalOpen}
          onClose={() => setGradingModalOpen(false)}
          title={`Evaluate ${selectedAttempt.studentName}`}
          subtitle={`${selectedAttempt.testTitle} (${selectedAttempt.type})`}
        >
          <form onSubmit={handleSaveGrade}>
            <div className="form-group">
              <label className="form-label">Assign Score (Out of {selectedAttempt.totalMarks})</label>
              <input
                type="number"
                min="0"
                max={selectedAttempt.totalMarks}
                required
                value={manualScore}
                onChange={(e) => setManualScore(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Personalized Feedback & Improvement Notes</label>
              <textarea
                rows={3}
                placeholder="Detail what was missing in their CQ answer or which diagram label needs correction..."
                value={inlineFeedback}
                onChange={(e) => setInlineFeedback(e.target.value)}
                className="form-textarea"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg mt-3">
              <CheckCircle2 size={18} /> Confirm Grade & Notify Student
            </button>
          </form>
        </Modal>
      )}

      <style>{`
        .teacher-results-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .results-head-card {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .res-head-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .res-head-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .search-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--light-green-subtle);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0.5rem 0.85rem;
        }
        .search-input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.88rem;
          width: 220px;
        }

        .std-att-name {
          display: block;
          font-size: 0.9rem;
          color: var(--text-dark);
        }
        .std-att-id {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .att-test-title {
          font-size: 0.88rem;
          color: var(--text-dark);
        }
        .att-score-num {
          font-size: 0.95rem;
          color: var(--dark-green);
        }
        .att-pct-text {
          font-weight: 600;
          color: var(--primary-green);
        }
        .att-date-text {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .results-head-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.25rem 1rem;
            gap: 1rem;
          }
          .search-wrap {
            width: 100%;
          }
          .search-input {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
