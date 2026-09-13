import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  Clock, 
  Target, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  AlertCircle, 
  Flag 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const StudentTestRunnerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tests, submitTestAttempt } = useCourseData();

  const currentTest = tests.find(t => t.id === id) || tests[1] || tests[0];

  const questions = currentTest?.questions || [];
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>((currentTest?.durationMinutes || 20) * 60);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx: number) => {
    const qId = questions[currentIdx]?.id;
    if (qId) {
      setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
    }
  };

  const toggleFlag = () => {
    const qId = questions[currentIdx]?.id;
    if (qId) {
      setFlagged(prev => ({ ...prev, [qId]: !prev[qId] }));
    }
  };

  const handleSubmitTest = () => {
    if (submitted) return;
    setSubmitted(true);

    // Calculate score
    let calculatedScore = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        calculatedScore += (q.marks || 1);
      }
    });

    submitTestAttempt(currentTest.id, selectedAnswers, calculatedScore);

    // Trigger celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    // Navigate to results
    navigate(`/student/results?test=${currentTest.id}`);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="test-runner-empty bio-card text-center">
        <h3>Test Questions Unavailable</h3>
        <p>This test does not have active interactive MCQ questions loaded.</p>
        <Link to="/student/practice" className="btn btn-primary mt-3">
          Back to Practice Center
        </Link>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const isLastQuestion = currentIdx === questions.length - 1;

  return (
    <div className="test-runner-page">
      {/* 16. Test Runner Header */}
      <div className="test-runner-header bio-card">
        <div className="test-title-meta">
          <span className="badge badge-green">{currentTest.paper}</span>
          <h2 className="runner-test-title">{currentTest.title}</h2>
        </div>

        <div className="test-timer-badge">
          <Clock size={18} className="timer-icon" />
          <span className="timer-digits">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Main Runner Body Grid */}
      <div className="test-runner-body-grid">
        {/* Question Panel */}
        <div className="question-panel bio-card">
          <div className="question-panel-top">
            <span className="q-progress-text">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <button 
              type="button" 
              onClick={toggleFlag}
              className={`flag-btn ${flagged[currentQ?.id] ? 'flagged' : ''}`}
            >
              <Flag size={15} />
              <span>{flagged[currentQ?.id] ? 'Flagged for Review' : 'Flag Question'}</span>
            </button>
          </div>

          <h3 className="q-text-body">{currentQ?.question}</h3>

          {/* Options list */}
          <div className="q-options-container">
            {currentQ?.options?.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === optIdx;
              const optionLetters = ['A', 'B', 'C', 'D', 'E'];
              return (
                <div
                  key={optIdx}
                  className={`q-option-row ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(optIdx)}
                >
                  <div className="opt-letter-circle">
                    {optionLetters[optIdx]}
                  </div>
                  <span className="opt-text">{option}</span>
                </div>
              );
            })}
          </div>

          {/* Action Navigation Buttons */}
          <div className="question-nav-actions">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(prev => prev - 1)}
              className="btn btn-outline"
            >
              <ArrowLeft size={16} /> Previous
            </button>

            {isLastQuestion ? (
              <button
                onClick={handleSubmitTest}
                className="btn btn-primary btn-lg"
              >
                Submit Test <CheckCircle2 size={18} />
              </button>
            ) : (
              <button
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="btn btn-primary"
              >
                Next <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Question Palette Sidebar */}
        <div className="question-palette-panel bio-card">
          <h4 className="palette-title">Question Navigator</h4>
          <p className="palette-sub">Jump directly to any question</p>

          <div className="palette-grid">
            {questions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isFlag = flagged[q.id];
              const isCurrent = currentIdx === idx;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`palette-btn ${isCurrent ? 'current' : ''} ${isAnswered ? 'answered' : ''} ${isFlag ? 'flagged' : ''}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="palette-legend">
            <div className="legend-item">
              <span className="legend-dot answered"></span>
              <span>Answered ({Object.keys(selectedAnswers).length})</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot unanswered"></span>
              <span>Unanswered ({questions.length - Object.keys(selectedAnswers).length})</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot flagged"></span>
              <span>Flagged ({Object.values(flagged).filter(Boolean).length})</span>
            </div>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to submit your test now?')) {
                handleSubmitTest();
              }
            }}
            className="btn btn-primary btn-block mt-4"
          >
            Finish & Submit Test
          </button>
        </div>
      </div>

      <style>{`
        .test-runner-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .test-runner-header {
          padding: 1.5rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #FFFFFF;
        }
        .runner-test-title {
          font-size: 1.35rem;
          color: var(--dark-green);
          margin-top: 0.25rem;
        }
        .test-timer-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #FEF3C7;
          border: 1px solid #FDE68A;
          color: #B45309;
          padding: 0.6rem 1.25rem;
          border-radius: var(--radius-full);
          font-weight: 700;
        }
        .timer-digits {
          font-size: 1.15rem;
          font-family: monospace;
        }

        .test-runner-body-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 1.5rem;
        }
        .question-panel {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
        }
        .question-panel-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .q-progress-text {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
        }
        .flag-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          padding: 0.3rem 0.6rem;
          border-radius: var(--radius-sm);
        }
        .flag-btn.flagged {
          background: #FEF3C7;
          color: #B45309;
          font-weight: 600;
        }
        .q-text-body {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-dark);
          line-height: 1.5;
          margin-bottom: 2rem;
        }

        .q-options-container {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 2.5rem;
        }
        .q-option-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: var(--light-green-subtle);
          border: 1.5px solid var(--border-color);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .q-option-row:hover {
          background: var(--light-green);
          border-color: var(--primary-green);
        }
        .q-option-row.selected {
          background: #FFFFFF;
          border-color: var(--dark-green);
          box-shadow: 0 0 0 2px rgba(49, 91, 61, 0.2);
        }
        .opt-letter-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1.5px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-dark);
          flex-shrink: 0;
        }
        .q-option-row.selected .opt-letter-circle {
          background: var(--dark-green);
          color: #FFFFFF;
          border-color: var(--dark-green);
        }
        .opt-text {
          font-size: 0.95rem;
          color: var(--text-dark);
        }

        .question-nav-actions {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-subtle);
        }

        /* Palette */
        .question-palette-panel {
          padding: 1.75rem;
          height: fit-content;
        }
        .palette-title {
          font-size: 1.1rem;
          color: var(--dark-green);
          margin-bottom: 0.2rem;
        }
        .palette-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }
        .palette-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }
        .palette-btn {
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
          border-radius: var(--radius-sm);
          background: var(--light-green-subtle);
          border: 1px solid var(--border-color);
          color: var(--text-dark);
        }
        .palette-btn.current {
          border: 2px solid var(--dark-green);
        }
        .palette-btn.answered {
          background: var(--dark-green);
          color: #FFFFFF;
          border-color: var(--dark-green);
        }
        .palette-btn.flagged {
          background: #FEF3C7;
          color: #B45309;
          border-color: #F59E0B;
        }

        .palette-legend {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border-subtle);
          padding-top: 1rem;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 2px;
        }
        .legend-dot.answered { background: var(--dark-green); }
        .legend-dot.unanswered { background: var(--border-color); }
        .legend-dot.flagged { background: #F59E0B; }

        @media (max-width: 850px) {
          .test-runner-body-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .test-runner-header {
            flex-direction: column;
            align-items: flex-start;
            padding: 1rem 0.85rem;
            gap: 0.75rem;
          }
          .question-panel {
            padding: 1.25rem 0.85rem;
          }
          .q-text-body {
            font-size: 1.05rem;
            margin-bottom: 1.25rem;
          }
          .q-options-container {
            gap: 0.65rem;
            margin-bottom: 1.5rem;
          }
          .q-option-row {
            padding: 0.75rem 0.85rem;
          }
          .question-nav-actions {
            flex-wrap: wrap;
            gap: 0.65rem;
          }
          .palette-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }
      `}</style>
    </div>
  );
};
