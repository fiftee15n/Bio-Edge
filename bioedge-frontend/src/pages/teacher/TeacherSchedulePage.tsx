import React from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { Calendar, Clock, BookOpen, Plus, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TeacherSchedulePage: React.FC = () => {
  const { classes } = useCourseData();

  return (
    <div className="teacher-schedule-page">
      <div className="sched-admin-header bio-card">
        <div>
          <span className="badge badge-amber">Schedule Overview</span>
          <h1 className="sched-admin-title">Master Calendar Schedule</h1>
          <p className="sched-admin-sub">
            Overview of live lecture days, practice tests, and full syllabus model exams.
          </p>
        </div>

        <Link to="/teacher/classes" className="btn btn-primary btn-sm">
          <Plus size={16} /> Manage Classes
        </Link>
      </div>

      <div className="schedule-timeline-admin-grid">
        {classes.map((cls) => (
          <div key={cls.id} className="timeline-admin-card bio-card">
            <div className="tl-admin-top">
              <span className="tl-class-badge">Class {cls.classNumber}</span>
              <span className={`badge ${cls.status === 'Completed' ? 'badge-gray' : 'badge-green'}`}>
                {cls.status}
              </span>
            </div>

            <div className="tl-admin-body">
              <span className="tl-paper-badge">{cls.paper}</span>
              <h3 className="tl-cls-title">{cls.title}</h3>
              <p className="tl-cls-topic">
                <strong>Chapter:</strong> {cls.chapterName} • <strong>Topic:</strong> {cls.topic}
              </p>
            </div>

            <div className="tl-admin-footer">
              <div className="tl-foot-item">
                <Calendar size={14} className="tl-icon" />
                <span>{cls.date} ({cls.day})</span>
              </div>
              <div className="tl-foot-item">
                <Clock size={14} className="tl-icon" />
                <span>{cls.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .teacher-schedule-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .sched-admin-header {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .sched-admin-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .sched-admin-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .schedule-timeline-admin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .timeline-admin-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .tl-admin-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .tl-class-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
        }
        .tl-paper-badge {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--primary-green);
        }
        .tl-cls-title {
          font-size: 1.05rem;
          color: var(--text-dark);
          margin: 0.25rem 0 0.4rem;
        }
        .tl-cls-topic {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }
        .tl-admin-footer {
          border-top: 1px solid var(--border-subtle);
          padding-top: 0.85rem;
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .tl-foot-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .tl-icon {
          color: var(--primary-green);
        }

        @media (max-width: 768px) {
          .schedule-timeline-admin-grid {
            grid-template-columns: 1fr;
          }
          .sched-admin-header {
            padding: 1.25rem 1rem;
          }
          .timeline-admin-card {
            padding: 1.25rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};
