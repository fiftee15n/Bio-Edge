import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Clock, 
  Target, 
  ArrowRight, 
  Sparkles, 
  BookOpen,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export const StudentResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const testId = searchParams.get('test');
  const { tests } = useCourseData();

  const completedTests = tests.filter(t => t.status === 'Completed');
  const currentTest = tests.find(t => t.id === testId) || completedTests[0] || tests[0];

  const totalMarks = currentTest?.totalMarks || 20;
  const score = currentTest?.score !== null && currentTest?.score !== undefined ? currentTest.score : 18;
  const percentage = Math.round((score / totalMarks) * 100);

  const correctCount = score;
  const totalQuestions = currentTest?.totalQuestions || currentTest?.questions?.length || 20;
  const incorrectCount = Math.max(0, totalQuestions - correctCount);

  return (
    <div className="student-results-page">
      {/* 17. Result Top Overview */}
      <div className="result-overview-card bio-card">
        <div className="result-top-badge-row">
          <span className="badge badge-green">Test Completed</span>
          <span className="res-submitted-time">Submitted: {currentTest?.submittedAt || 'Recently'}</span>
        </div>

        <h1 className="res-test-title">{currentTest?.title}</h1>
        <p className="res-paper-sub">{currentTest?.paper} • {currentTest?.category}</p>

        {/* Score Numbers Summary */}
        <div className="score-hero-grid">
          <div className="score-hero-circle">
            <span className="score-fraction">{score} / {totalMarks}</span>
            <span className="score-pct-badge">{percentage}% Score</span>
          </div>

          <div className="score-metrics-grid">
            <div className="metric-box correct">
              <CheckCircle2 size={20} className="m-icon" />
              <div>
                <strong className="m-num">{correctCount}</strong>
                <span className="m-lbl">Correct Answers</span>
              </div>
            </div>

            <div className="metric-box incorrect">
              <XCircle size={20} className="m-icon" />
              <div>
                <strong className="m-num">{incorrectCount}</strong>
                <span className="m-lbl">Incorrect / Missed</span>
              </div>
            </div>

            <div className="metric-box timing">
              <Clock size={20} className="m-icon" />
              <div>
                <strong className="m-num">14 Mins</strong>
                <span className="m-lbl">Time Taken</span>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Performance Summary */}
        <div className="performance-summary-box">
          <h3 className="perf-title">Academic Performance Summary</h3>
          <div className="perf-summary-grid">
            <div className="perf-area-card strong">
              <div className="area-head">
                <CheckCircle2 size={16} />
                <strong>Strong Areas</strong>
              </div>
              <p>Glycosidic bonds, peptide structures, and cellular enzyme cofactors.</p>
            </div>

            <div className="perf-area-card weak">
              <div className="area-head">
                <AlertCircle size={16} />
                <strong>Recommended Review</strong>
              </div>
              <p>Sphingophospholipids and Glycolytic enzyme rate-limiting steps.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Question Review */}
      {currentTest?.questions && currentTest.questions.length > 0 && (
        <div className="questions-review-section bio-card">
          <h3 className="rev-section-title">Question-by-Question Solution Review</h3>
          <p className="rev-section-sub">
            Review detailed biochemical explanations curated by Afroza Tahmina.
          </p>

          <div className="question-review-list">
            {currentTest.questions.map((q, idx) => {
              const isCorrect = q.selectedAnswer === q.correctAnswer;
              return (
                <div key={q.id || idx} className={`q-review-item ${isCorrect ? 'correct-item' : 'incorrect-item'}`}>
                  <div className="q-rev-header">
                    <span className="q-rev-num">Question {idx + 1}</span>
                    <span className={`badge ${isCorrect ? 'badge-green' : 'badge-red'}`}>
                      {isCorrect ? '+1 Mark (Correct)' : '0 Mark (Review)'}
                    </span>
                  </div>

                  <h4 className="q-rev-text">{q.question}</h4>

                  {/* Options */}
                  <div className="q-rev-options">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = q.selectedAnswer === optIdx;
                      const isActualCorrect = q.correctAnswer === optIdx;

                      let optStateClass = '';
                      if (isActualCorrect) optStateClass = 'is-correct';
                      else if (isSelected && !isActualCorrect) optStateClass = 'is-wrong';

                      return (
                        <div key={optIdx} className={`rev-opt-row ${optStateClass}`}>
                          <span className="rev-opt-letter">{String.fromCharCode(65 + optIdx)}</span>
                          <span className="rev-opt-text">{opt}</span>
                          {isActualCorrect && <span className="correct-tag">Correct Answer</span>}
                          {isSelected && !isActualCorrect && <span className="your-tag">Your Choice</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Callout */}
                  {q.explanation && (
                    <div className="q-explanation-callout">
                      <strong>Teacher Explanation:</strong>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation actions */}
      <div className="results-bottom-actions">
        <Link to="/student/practice" className="btn btn-outline">
          Back to Practice Center
        </Link>
        <Link to="/student/analytics" className="btn btn-primary">
          View Performance Analytics <ChevronRight size={16} />
        </Link>
      </div>

      <style>{`
        .student-results-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        .result-overview-card {
          padding: 2.5rem;
          background: linear-gradient(135deg, #FFFFFF 0%, #FAFDFB 100%);
        }
        .result-top-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .res-submitted-time {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .res-test-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-bottom: 0.25rem;
        }
        .res-paper-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .score-hero-grid {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }
        .score-hero-circle {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
        }
        .score-fraction {
          font-size: 1.75rem;
          font-weight: 800;
          font-family: var(--font-heading);
          line-height: 1;
        }
        .score-pct-badge {
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-full);
          margin-top: 0.35rem;
        }

        .score-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          flex: 1;
          min-width: 280px;
        }
        .metric-box {
          background: var(--light-green-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .metric-box.correct .m-icon { color: var(--success); }
        .metric-box.incorrect .m-icon { color: var(--error); }
        .metric-box.timing .m-icon { color: var(--primary-green); }
        .m-num {
          display: block;
          font-size: 1.25rem;
          color: var(--dark-green);
          line-height: 1.1;
        }
        .m-lbl {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .performance-summary-box {
          border-top: 1px solid var(--border-subtle);
          padding-top: 1.5rem;
        }
        .perf-title {
          font-size: 1.15rem;
          color: var(--dark-green);
          margin-bottom: 1rem;
        }
        .perf-summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .perf-area-card {
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
        }
        .perf-area-card.strong {
          background: var(--light-green);
          color: var(--dark-green);
        }
        .perf-area-card.weak {
          background: var(--warning-bg);
          color: #92400E;
        }
        .area-head {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.35rem;
        }

        /* Review Section */
        .questions-review-section {
          padding: 2.5rem;
        }
        .rev-section-title {
          font-size: 1.35rem;
          color: var(--dark-green);
          margin-bottom: 0.25rem;
        }
        .rev-section-sub {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }
        .question-review-list {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .q-review-item {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          background: #FFFFFF;
        }
        .q-rev-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .q-rev-num {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
        }
        .q-rev-text {
          font-size: 1.05rem;
          color: var(--text-dark);
          margin-bottom: 1.25rem;
          line-height: 1.45;
        }
        .q-rev-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .rev-opt-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
          background: var(--light-green-subtle);
          font-size: 0.88rem;
        }
        .rev-opt-row.is-correct {
          background: #DCFCE7;
          border: 1px solid #86EFAC;
          font-weight: 600;
        }
        .rev-opt-row.is-wrong {
          background: #FEE2E2;
          border: 1px solid #FCA5A5;
        }
        .rev-opt-letter {
          font-weight: 700;
          color: var(--dark-green);
        }
        .correct-tag {
          margin-left: auto;
          font-size: 0.72rem;
          font-weight: 700;
          background: #16A34A;
          color: #FFFFFF;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }
        .your-tag {
          margin-left: auto;
          font-size: 0.72rem;
          font-weight: 700;
          background: #DC2626;
          color: #FFFFFF;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }
        .q-explanation-callout {
          background: #FAFDFB;
          border-left: 3px solid var(--primary-green);
          padding: 0.75rem 1rem;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-size: 0.85rem;
          color: var(--text-dark);
        }
        .q-explanation-callout strong {
          color: var(--dark-green);
          display: block;
          margin-bottom: 0.2rem;
        }

        .results-bottom-actions {
          display: flex;
          justify-content: space-between;
        }

        @media (max-width: 768px) {
          .score-metrics-grid {
            grid-template-columns: 1fr;
          }
          .perf-summary-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .result-overview-card {
            padding: 1.5rem 1rem;
          }
          .score-hero-grid {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }
          .score-metrics-grid {
            width: 100%;
          }
          .results-bottom-actions {
            flex-direction: column;
            gap: 0.75rem;
          }
          .results-bottom-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};
