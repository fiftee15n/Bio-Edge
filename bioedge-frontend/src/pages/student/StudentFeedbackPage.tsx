import React, { useState } from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  MessageSquare, 
  Calendar, 
  Tag, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  UserCheck 
} from 'lucide-react';

export const StudentFeedbackPage: React.FC = () => {
  const { feedbacks, teacher } = useCourseData();
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', 'MCQ', 'Diagram', 'Written', 'Exam Strategy', 'Concept'];

  const filtered = feedbacks.filter(f => 
    filterCategory === 'all' || f.category.toLowerCase() === filterCategory.toLowerCase()
  );

  return (
    <div className="student-feedback-page">
      {/* Header */}
      <div className="feedback-hero-card bio-card">
        <div>
          <span className="badge badge-green">One-on-One Mentorship</span>
          <h1 className="fb-page-title">Personal Teacher Feedback</h1>
          <p className="fb-page-sub">
            Direct diagnostic notes and answer improvement suggestions issued by {teacher.name}.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="fb-categories-row">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`fb-cat-btn ${filterCategory === cat ? 'active' : ''}`}
          >
            {cat === 'all' ? 'All Feedback' : `${cat} Focus`}
          </button>
        ))}
      </div>

      {/* Feedback Feed */}
      <div className="feedback-list-container">
        {filtered.length === 0 ? (
          <div className="empty-feedback-card bio-card text-center">
            <p>No feedback found under this category.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="feedback-card-item bio-card">
              <div className="fb-item-top">
                <div className="fb-item-author-info">
                  <div className="fb-avatar">AT</div>
                  <div>
                    <h4 className="fb-author-title">{item.teacherName || teacher.name}</h4>
                    <span className="fb-author-sub">Lead Biology Faculty</span>
                  </div>
                </div>

                <div className="fb-meta-right">
                  <span className="badge badge-amber">{item.category}</span>
                  <span className="fb-date-tag">
                    <Calendar size={13} /> {item.date}
                  </span>
                </div>
              </div>

              <div className="fb-item-body">
                <h3 className="fb-item-title">{item.title}</h3>
                <p className="fb-item-message">"{item.message}"</p>
              </div>

              <div className="fb-item-footer">
                <span className="fb-attached-to">
                  <BookOpen size={14} className="att-icon" />
                  <strong>Context:</strong> {item.attachedTo}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .student-feedback-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .feedback-hero-card {
          padding: 2.25rem;
        }
        .fb-page-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .fb-page-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .fb-categories-row {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .fb-cat-btn {
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-dark);
          transition: all 0.2s ease;
        }
        .fb-cat-btn.active {
          background: var(--dark-green);
          color: #FFFFFF;
          border-color: var(--dark-green);
        }

        .feedback-list-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .feedback-card-item {
          padding: 1.75rem;
          border-left: 4px solid var(--primary-green);
        }
        .fb-item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .fb-item-author-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .fb-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
        }
        .fb-author-title {
          font-size: 0.92rem;
          color: var(--dark-green);
        }
        .fb-author-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .fb-meta-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .fb-date-tag {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .fb-item-title {
          font-size: 1.1rem;
          color: var(--text-dark);
          margin-bottom: 0.5rem;
        }
        .fb-item-message {
          font-size: 0.95rem;
          color: var(--text-dark);
          line-height: 1.6;
          margin-bottom: 1.25rem;
          background: var(--light-green-subtle);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
        }
        .fb-item-footer {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .fb-attached-to {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .att-icon {
          color: var(--primary-green);
        }
        .empty-feedback-card {
          padding: 3rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};
