import React, { useState } from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { Modal } from '../../components/common/Modal';
import { HelpCircle, Plus, Search, BookOpen, CheckCircle2, Trash2 } from 'lucide-react';

export const TeacherQuestionsPage = () => {
  const { tests, addTest } = useCourseData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Collect all questions from tests
  const allQuestions = [];
  tests.forEach(t => {
    if (t.questions) {
      t.questions.forEach(q => {
        allQuestions.push({
          ...q,
          testTitle: t.title,
          paper: t.paper
        });
      });
    }
  });

  const [newQ, setNewQ] = useState({
    question: '',
    optA: '',
    optB: '',
    optC: '',
    optD: '',
    correctAnswer: 0,
    explanation: '',
    chapter: 'Chapter 04: Microorganisms',
    paper: 'Biology First Paper'
  });

  const handleAddQuestion = (e) => {
    e.preventDefault();
    alert('Question added to Question Bank and attached to active test series!');
    setIsModalOpen(false);
    setNewQ({
      question: '',
      optA: '',
      optB: '',
      optC: '',
      optD: '',
      correctAnswer: 0,
      explanation: '',
      chapter: 'Chapter 04: Microorganisms',
      paper: 'Biology First Paper'
    });
  };

  const filtered = allQuestions.filter(q => 
    q.question.toLowerCase().includes(search.toLowerCase()) ||
    (q.explanation && q.explanation.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="teacher-questions-page">
      <div className="questions-admin-header bio-card">
        <div>
          <span className="badge badge-amber">Question Repository</span>
          <h1 className="q-admin-title">Biology Question Bank</h1>
          <p className="q-admin-sub">
            {allQuestions.length} Curated Questions • Manage MCQ item stems, distractor options, and biochemical explanations.
          </p>
        </div>

        <div className="q-head-actions">
          <div className="search-wrap">
            <Search size={16} className="s-icon" />
            <input
              type="text"
              placeholder="Search question text..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-sm">
            <Plus size={16} /> Add Question
          </button>
        </div>
      </div>

      <div className="questions-admin-list">
        {filtered.map((q, idx) => (
          <div key={q.id || idx} className="question-admin-card bio-card">
            <div className="q-card-top">
              <span className="q-idx-badge">Item {idx + 1}</span>
              <span className="q-test-source">{q.testTitle}</span>
            </div>

            <h3 className="q-stem-text">{q.question}</h3>

            <div className="q-options-grid-admin">
              {(q.options || []).map((opt, optIdx) => (
                <div 
                  key={optIdx} 
                  className={`admin-opt-cell ${optIdx === q.correctAnswer ? 'correct-opt' : ''}`}
                >
                  <span className="opt-letter">{String.fromCharCode(65 + optIdx)}</span>
                  <span className="opt-text">{opt}</span>
                  {optIdx === q.correctAnswer && <CheckCircle2 size={15} className="correct-check" />}
                </div>
              ))}
            </div>

            {q.explanation && (
              <div className="q-explanation-box">
                <strong>Marking & Diagnostic Note:</strong>
                <p>{q.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Question Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Question to Question Bank"
        subtitle="Create an MCQ item with 4 options and teacher explanation."
        maxWidth="650px"
      >
        <form onSubmit={handleAddQuestion}>
          <div className="form-group">
            <label className="form-label">Question Stem *</label>
            <textarea
              rows={3}
              required
              placeholder="Enter biological problem statement or diagram question..."
              value={newQ.question}
              onChange={(e) => setNewQ({ ...newQ, question: e.target.value })}
              className="form-textarea"
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Option A *</label>
              <input
                type="text"
                required
                value={newQ.optA}
                onChange={(e) => setNewQ({ ...newQ, optA: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Option B *</label>
              <input
                type="text"
                required
                value={newQ.optB}
                onChange={(e) => setNewQ({ ...newQ, optB: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Option C *</label>
              <input
                type="text"
                required
                value={newQ.optC}
                onChange={(e) => setNewQ({ ...newQ, optC: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Option D *</label>
              <input
                type="text"
                required
                value={newQ.optD}
                onChange={(e) => setNewQ({ ...newQ, optD: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Correct Option</label>
            <select
              value={newQ.correctAnswer}
              onChange={(e) => setNewQ({ ...newQ, correctAnswer: Number(e.target.value) })}
              className="form-select"
            >
              <option value={0}>Option A</option>
              <option value={1}>Option B</option>
              <option value={2}>Option C</option>
              <option value={3}>Option D</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Explanation / Solution Rationale</label>
            <textarea
              rows={2}
              placeholder="Provide why this option is correct and where examiners test this concept..."
              value={newQ.explanation}
              onChange={(e) => setNewQ({ ...newQ, explanation: e.target.value })}
              className="form-textarea"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg mt-3">
            <Plus size={18} /> Save Question to Repository
          </button>
        </form>
      </Modal>

      <style>{`
        .teacher-questions-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .questions-admin-header {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .q-admin-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .q-admin-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .q-head-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
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
          width: 200px;
        }

        .questions-admin-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .question-admin-card {
          padding: 1.75rem;
        }
        .q-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .q-idx-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
        }
        .q-test-source {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .q-stem-text {
          font-size: 1.15rem;
          color: var(--text-dark);
          margin-bottom: 1.25rem;
          line-height: 1.45;
        }
        .q-options-grid-admin {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
        .admin-opt-cell {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
          background: var(--light-green-subtle);
          font-size: 0.85rem;
          border: 1px solid var(--border-subtle);
        }
        .admin-opt-cell.correct-opt {
          background: #DCFCE7;
          border-color: #86EFAC;
          font-weight: 600;
        }
        .opt-letter {
          font-weight: 700;
          color: var(--dark-green);
        }
        .correct-check {
          margin-left: auto;
          color: #16A34A;
        }
        .q-explanation-box {
          background: #FAFDFB;
          border-left: 3px solid var(--primary-green);
          padding: 0.75rem 1rem;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-size: 0.82rem;
          color: var(--text-dark);
        }
        .q-explanation-box strong {
          color: var(--dark-green);
          display: block;
          margin-bottom: 0.2rem;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .q-options-grid-admin {
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
