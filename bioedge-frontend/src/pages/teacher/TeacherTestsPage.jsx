import React from 'react';
import { Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  FileCheck2, 
  Plus, 
  Clock, 
  Target, 
  Award, 
  Calendar, 
  Trash2,
  Edit3
} from 'lucide-react';

export const TeacherTestsPage = () => {
  const { tests } = useCourseData();

  return (
    <div className="teacher-tests-page">
      <div className="tests-admin-header bio-card">
        <div>
          <span className="badge badge-amber">Assessment Engine</span>
          <h1 className="tests-admin-title">Test & Quiz Repository</h1>
          <p className="tests-admin-sub">
            {tests.length} Total Assessments • Create and monitor chapter quizzes, written CQ assignments, and model tests.
          </p>
        </div>

        <Link to="/teacher/tests/create" className="btn btn-primary btn-sm">
          <Plus size={16} /> Create New Assessment
        </Link>
      </div>

      <div className="tests-admin-grid">
        {tests.map((test) => (
          <div key={test.id} className="test-admin-card bio-card">
            <div className="t-admin-top">
              <span className="badge badge-green">{test.category}</span>
              <span className={`badge ${test.status === 'Completed' ? 'badge-gray' : 'badge-amber'}`}>
                {test.status}
              </span>
            </div>

            <div className="t-admin-body">
              <span className="t-paper-tag">{test.paper}</span>
              <h3 className="t-admin-name">{test.title}</h3>
              {test.chapterName && (
                <p className="t-admin-ch"><strong>Chapter:</strong> {test.chapterName}</p>
              )}
            </div>

            <div className="t-admin-spec-row">
              <div className="spec-cell">
                <Clock size={14} className="s-ico" />
                <span>{test.durationMinutes} Mins</span>
              </div>
              <div className="spec-cell">
                <Target size={14} className="s-ico" />
                <span>{test.totalQuestions} Questions</span>
              </div>
              <div className="spec-cell">
                <Award size={14} className="s-ico" />
                <span>{test.totalMarks} Marks</span>
              </div>
            </div>

            <div className="t-admin-actions">
              <Link to="/teacher/results" className="btn btn-outline btn-sm flex-1">
                View Submissions
              </Link>
              <Link to="/teacher/questions" className="btn btn-secondary btn-sm">
                Questions
              </Link>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .teacher-tests-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .tests-admin-header {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .tests-admin-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .tests-admin-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .tests-admin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 1.5rem;
        }
        .test-admin-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .t-admin-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .t-paper-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
        }
        .t-admin-name {
          font-size: 1.15rem;
          color: var(--text-dark);
          margin: 0.25rem 0 0.4rem;
        }
        .t-admin-ch {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .t-admin-spec-row {
          display: flex;
          justify-content: space-between;
          background: var(--light-green-subtle);
          border-radius: var(--radius-md);
          padding: 0.65rem 0.85rem;
          margin: 1.25rem 0;
          font-size: 0.78rem;
          color: var(--text-dark);
        }
        .spec-cell {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .s-ico {
          color: var(--primary-green);
        }
        .t-admin-actions {
          display: flex;
          gap: 0.5rem;
        }
        .flex-1 { flex: 1; }
      `}</style>
    </div>
  );
};
