import React from 'react';
import { Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { Award, Calendar, Clock, Target, CheckCircle2, ArrowRight } from 'lucide-react';

export const StudentModelTestsPage = () => {
  const { tests } = useCourseData();
  const modelTests = tests.filter(t => t.category === 'Full Syllabus Model Tests' || t.type === 'Model Test');

  return (
    <div className="student-model-tests-page">
      {/* Header */}
      <div className="model-tests-hero bio-card">
        <div>
          <span className="badge badge-green">Board Exam Simulation</span>
          <h1 className="model-title">Full Syllabus Model Tests</h1>
          <p className="model-sub">
            Timed, comprehensive model examinations covering First Paper and Second Paper according to the latest Board exam standards.
          </p>
        </div>
      </div>

      {/* Model Tests List */}
      <div className="model-tests-list-grid">
        {modelTests.map((test, idx) => (
          <div key={test.id || idx} className="model-test-card bio-card">
            <div className="m-card-top">
              <span className="m-test-badge">Model Test {idx + 1}</span>
              <span className={`badge ${test.status === 'Completed' ? 'badge-green' : 'badge-amber'}`}>
                {test.status}
              </span>
            </div>

            <div className="m-card-body">
              <span className="m-paper-tag">{test.paper}</span>
              <h3 className="m-title">{test.title}</h3>
              <p className="m-desc">
                Full syllabus comprehensive assessment testing conceptual depth, MCQ speed, and diagram clarity.
              </p>
            </div>

            <div className="m-spec-bar">
              <div className="m-spec-item">
                <Clock size={15} className="m-icon" />
                <span>{test.durationMinutes || 60} Minutes</span>
              </div>
              <div className="m-spec-item">
                <Target size={15} className="m-icon" />
                <span>{test.totalQuestions || 50} Questions</span>
              </div>
              <div className="m-spec-item">
                <Award size={15} className="m-icon" />
                <span>{test.totalMarks || 50} Total Marks</span>
              </div>
            </div>

            <div className="m-card-footer">
              <span className="m-scheduled-time">
                <Calendar size={14} /> Scheduled: {test.scheduledDate || 'Final Month'}
              </span>
              <Link to={`/student/practice/${test.id}`} className="btn btn-primary btn-sm">
                Enter Exam Simulator <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .student-model-tests-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .model-tests-hero {
          padding: 2.25rem;
        }
        .model-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .model-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .model-tests-list-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 1.5rem;
        }
        .model-test-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .m-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .m-test-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
        }
        .m-paper-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
        }
        .m-title {
          font-size: 1.15rem;
          color: var(--dark-green);
          margin: 0.25rem 0 0.5rem;
        }
        .m-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.25rem;
        }
        .m-spec-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--light-green-subtle);
          border-radius: var(--radius-md);
          padding: 0.65rem 0.85rem;
          font-size: 0.78rem;
          color: var(--text-dark);
          margin-bottom: 1.25rem;
        }
        .m-spec-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .m-icon {
          color: var(--primary-green);
        }
        .m-card-footer {
          border-top: 1px solid var(--border-subtle);
          padding-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .m-scheduled-time {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};
