import React from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { Award, Clock, Target, Plus, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TeacherModelTestsPage: React.FC = () => {
  const { tests } = useCourseData();
  const modelTests = tests.filter(t => t.category === 'Full Syllabus Model Tests' || t.type === 'Model Test');

  return (
    <div className="teacher-model-tests-page">
      <div className="model-head-card bio-card">
        <div>
          <span className="badge badge-amber">Board Exam Simulator</span>
          <h1 className="m-head-title">Full Syllabus Model Tests Management</h1>
          <p className="m-head-sub">
            Assemble, publish, and evaluate 50-mark full paper examinations.
          </p>
        </div>

        <Link to="/teacher/tests/create" className="btn btn-primary btn-sm">
          <Plus size={16} /> Assemble Model Test
        </Link>
      </div>

      <div className="model-tests-admin-grid">
        {modelTests.map((test, idx) => (
          <div key={test.id || idx} className="model-admin-item-card bio-card">
            <div className="m-item-top">
              <span className="m-num-pill">Model Test {idx + 1}</span>
              <span className={`badge ${test.status === 'Completed' ? 'badge-gray' : 'badge-green'}`}>
                {test.status}
              </span>
            </div>

            <span className="m-paper-label">{test.paper}</span>
            <h3 className="m-item-title">{test.title}</h3>

            <div className="m-spec-triplet">
              <div className="m-spec-cell">
                <Clock size={14} />
                <span>{test.durationMinutes || 60} Mins</span>
              </div>
              <div className="m-spec-cell">
                <Target size={14} />
                <span>{test.totalQuestions || 50} Questions</span>
              </div>
              <div className="m-spec-cell">
                <Award size={14} />
                <span>{test.totalMarks || 50} Marks</span>
              </div>
            </div>

            <div className="m-item-footer">
              <span className="m-sched-text">
                <Calendar size={14} /> {test.scheduledDate || "Scheduled Month 4"}
              </span>
              <Link to="/teacher/results" className="btn btn-outline btn-sm">
                View Attempts
              </Link>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .teacher-model-tests-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .model-head-card {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .m-head-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .m-head-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .model-tests-admin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 1.5rem;
        }
        .model-admin-item-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .m-item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .m-num-pill {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
        }
        .m-paper-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
        }
        .m-item-title {
          font-size: 1.15rem;
          color: var(--dark-green);
          margin: 0.25rem 0 1rem;
        }
        .m-spec-triplet {
          display: flex;
          justify-content: space-between;
          background: var(--light-green-subtle);
          border-radius: var(--radius-md);
          padding: 0.65rem 0.85rem;
          margin-bottom: 1.25rem;
          font-size: 0.78rem;
          color: var(--text-dark);
        }
        .m-spec-cell {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .m-item-footer {
          border-top: 1px solid var(--border-subtle);
          padding-top: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .m-sched-text {
          font-size: 0.78rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        @media (max-width: 768px) {
          .model-tests-admin-grid {
            grid-template-columns: 1fr;
          }
          .model-head-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.25rem 1rem;
            gap: 1rem;
          }
          .model-head-card .btn {
            width: 100%;
            justify-content: center;
          }
          .model-admin-item-card {
            padding: 1.25rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};
