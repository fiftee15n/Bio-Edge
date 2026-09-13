import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  Target, 
  FileText, 
  PenTool, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Award, 
  ArrowRight 
} from 'lucide-react';

export const StudentPracticePage: React.FC = () => {
  const { tests } = useCourseData();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Practice Sets' },
    { id: 'Chapter Practice', name: 'Chapter MCQ Drills' },
    { id: 'CQ/SQ Practice', name: 'CQ Written Answer Practice' },
    { id: 'Full Syllabus Model Tests', name: 'Board Model Tests' }
  ];

  const filteredTests = tests.filter(t => 
    activeCategory === 'all' || t.category === activeCategory
  );

  return (
    <div className="student-practice-page">
      {/* Header */}
      <div className="practice-header-card bio-card">
        <div>
          <span className="badge badge-green">Assessment & Quizzes</span>
          <h1 className="practice-title">Interactive Practice Center</h1>
          <p className="practice-sub">
            Strengthen your conceptual mastery with timed MCQ drills, written CQ rubrics, and Board past questions.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="practice-category-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`p-category-tab ${activeCategory === cat.id ? 'active' : ''}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Test Cards Grid */}
      <div className="practice-tests-grid">
        {filteredTests.map((test) => (
          <div key={test.id} className="practice-test-item-card bio-card">
            <div className="test-card-top">
              <span className="badge badge-green">{test.category}</span>
              <span className={`badge ${test.status === 'Completed' ? 'badge-gray' : 'badge-amber'}`}>
                {test.status}
              </span>
            </div>

            <div className="test-card-body">
              <span className="test-paper-name">{test.paper}</span>
              <h3 className="test-item-title">{test.title}</h3>
              {test.chapterName && (
                <p className="test-ch-name"><strong>Chapter:</strong> {test.chapterName}</p>
              )}
            </div>

            <div className="test-spec-row">
              <div className="spec-bit">
                <Clock size={14} className="bit-icon" />
                <span>{test.durationMinutes} Mins</span>
              </div>
              <div className="spec-bit">
                <Target size={14} className="bit-icon" />
                <span>{test.totalQuestions} Questions</span>
              </div>
              <div className="spec-bit">
                <Award size={14} className="bit-icon" />
                <span>{test.totalMarks} Marks</span>
              </div>
            </div>

            {test.status === 'Completed' && (
              <div className="test-completed-score-bar">
                <span>Your Score: <strong>{test.score} / {test.totalMarks}</strong></span>
                <span className="score-percent">
                  {Math.round((test.score / test.totalMarks) * 100)}%
                </span>
              </div>
            )}

            <div className="test-card-actions">
              {test.status === 'Completed' ? (
                <Link to={`/student/results?test=${test.id}`} className="btn btn-outline btn-sm btn-block">
                  View Detailed Performance Review <ArrowRight size={14} />
                </Link>
              ) : (
                <Link to={`/student/practice/${test.id}`} className="btn btn-primary btn-sm btn-block">
                  <Target size={16} /> Start Timed Test
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .student-practice-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .practice-header-card {
          padding: 2rem;
        }
        .practice-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .practice-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .practice-category-tabs {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .p-category-tab {
          padding: 0.6rem 1.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: #FFFFFF;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-dark);
          transition: all 0.2s ease;
        }
        .p-category-tab:hover {
          border-color: var(--primary-green);
        }
        .p-category-tab.active {
          background: var(--dark-green);
          color: #FFFFFF;
          border-color: var(--dark-green);
        }

        .practice-tests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .practice-test-item-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .test-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .test-paper-name {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--primary-green);
        }
        .test-item-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-top: 0.25rem;
          margin-bottom: 0.4rem;
        }
        .test-ch-name {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .test-spec-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--light-green-subtle);
          border-radius: var(--radius-md);
          padding: 0.65rem 0.85rem;
          margin: 1.25rem 0;
          font-size: 0.78rem;
          color: var(--text-dark);
        }
        .spec-bit {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .bit-icon {
          color: var(--primary-green);
        }
        .test-completed-score-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #FAFDFB;
          border: 1px solid var(--border-subtle);
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          margin-bottom: 1rem;
        }
        .score-percent {
          font-weight: 700;
          color: var(--dark-green);
        }
        .test-card-actions {
          margin-top: auto;
        }

        @media (max-width: 768px) {
          .practice-tests-grid {
            grid-template-columns: 1fr;
          }
          .practice-header-card {
            padding: 1.25rem 1rem;
          }
          .practice-category-tabs {
            width: 100%;
          }
          .p-category-tab {
            flex: 1;
            text-align: center;
            padding: 0.5rem 0.75rem;
            font-size: 0.82rem;
          }
          .practice-test-item-card {
            padding: 1.25rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};
