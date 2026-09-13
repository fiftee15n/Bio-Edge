import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { ProgressBar } from '../../components/common/ProgressBar';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  Target, 
  FileText, 
  Video, 
  Sparkles,
  Download
} from 'lucide-react';

import { Chapter, Paper } from '../../types';

export const StudentChapterDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { papers, classes, toggleTopicStatus } = useCourseData();

  // Find chapter in papers
  let currentChapter: Chapter | null = null;
  let currentPaper: Paper | null = null;

  for (const paper of papers) {
    const found = paper.chapters.find(c => c.id === id);
    if (found) {
      currentChapter = found;
      currentPaper = paper;
      break;
    }
  }

  // Fallback to first chapter if not found
  if (!currentChapter) {
    currentPaper = papers[0];
    currentChapter = papers[0].chapters[0];
  }

  // Associated classes
  const relatedClasses = classes.filter(
    c => c.chapterName === currentChapter?.name || c.chapter === `Chapter ${currentChapter?.number}`
  );

  return (
    <div className="student-chapter-details-page">
      {/* Back button */}
      <div className="back-nav-row">
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm">
          <ArrowLeft size={16} /> Back to Course
        </button>
      </div>

      {/* 12. Chapter Header */}
      <div className="chapter-header-card bio-card">
        <div className="ch-head-left">
          <span className="badge badge-green">{currentPaper?.name}</span>
          <h1 className="ch-full-title">
            Chapter {currentChapter.number}: {currentChapter.name}
          </h1>
          <p className="ch-full-sub">
            {(currentChapter.topics || []).length} Topics • Complete High-Yield Concept Mastery
          </p>
        </div>

        <div className="ch-head-right">
          <div className="ch-prog-stat">
            <span>Chapter Completion</span>
            <strong className="prog-percent">{currentChapter.progress}%</strong>
          </div>
          <ProgressBar progress={currentChapter.progress} height={8} />
        </div>
      </div>

      {/* Topics & Lecture Notes */}
      <div className="chapter-details-grid">
        {/* Left Column: Topic Checklist */}
        <div className="topics-detail-card bio-card">
          <h3 className="section-card-title">Curriculum Topics Checklist</h3>
          <p className="section-card-sub">Click a topic to toggle your preparation status</p>

          <div className="topics-list-large">
            {(currentChapter.topics || []).map((topic, idx) => (
              <div 
                key={topic.id || idx}
                className={`topic-large-item ${topic.status === 'Completed' ? 'done' : ''}`}
                onClick={() => currentPaper && toggleTopicStatus(currentPaper.id, currentChapter.id, topic.id)}
              >
                <div className="t-status-icon">
                  {topic.status === 'Completed' ? (
                    <CheckCircle2 size={18} className="checked-icon" />
                  ) : (
                    <span className="empty-box"></span>
                  )}
                </div>
                <div className="t-large-meta">
                  <h4 className="t-large-title">{topic.title}</h4>
                  <span className="t-large-class-info">
                    {topic.classNum ? `Covered in Class ${topic.classNum}` : 'Self-study & CQ Practice'}
                  </span>
                </div>
                <span className={`badge ${topic.status === 'Completed' ? 'badge-green' : 'badge-gray'}`}>
                  {topic.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Associated Classes & Practice Links */}
        <div className="chapter-sidebar-col">
          {/* Associated Classes */}
          <div className="related-classes-card bio-card">
            <h3 className="section-card-title">Related Live Classes</h3>
            {relatedClasses.length > 0 ? (
              <div className="related-classes-list">
                {relatedClasses.map(cls => (
                  <div key={cls.id} className="rel-class-item">
                    <div className="rel-class-top">
                      <span className="rel-num">Class {cls.classNumber}</span>
                      <span className={`badge ${cls.status === 'Completed' ? 'badge-gray' : 'badge-green'}`}>
                        {cls.status}
                      </span>
                    </div>
                    <h5 className="rel-title">{cls.title}</h5>
                    <span className="rel-time">{cls.date} • {cls.time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-classes-text">No direct live sessions scheduled for this chapter yet.</p>
            )}
          </div>

          {/* Quick Practice Actions */}
          <div className="practice-action-box bio-card">
            <h3 className="section-card-title">Chapter Practice</h3>
            <p className="practice-sub">Test your recall and diagram clarity on this chapter.</p>
            <div className="practice-btn-stack">
              <Link to="/student/practice" className="btn btn-primary btn-block">
                <Target size={16} /> Take Chapter Practice Quiz
              </Link>
              <button 
                onClick={() => alert('Downloading Chapter Handout PDF with colored diagrams...')}
                className="btn btn-outline btn-block"
              >
                <Download size={16} /> Download Diagram Guide PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .student-chapter-details-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .back-nav-row {
          display: flex;
        }
        .chapter-header-card {
          padding: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 2rem;
          background: linear-gradient(135deg, #FFFFFF 0%, #FAFDFB 100%);
        }
        .ch-full-title {
          font-size: 1.85rem;
          color: var(--dark-green);
          margin-top: 0.5rem;
          margin-bottom: 0.25rem;
        }
        .ch-full-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .ch-head-right {
          min-width: 240px;
        }
        .ch-prog-stat {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .prog-percent {
          font-size: 1.4rem;
          color: var(--dark-green);
          font-weight: 800;
        }

        .chapter-details-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 1.75rem;
        }
        .topics-detail-card, .related-classes-card, .practice-action-box {
          padding: 1.75rem;
        }
        .section-card-title {
          font-size: 1.15rem;
          color: var(--dark-green);
          margin-bottom: 0.25rem;
        }
        .section-card-sub {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }
        .topics-list-large {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .topic-large-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1rem;
          background: var(--light-green-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .topic-large-item:hover {
          background: var(--light-green);
          border-color: var(--border-color);
        }
        .empty-box {
          width: 16px;
          height: 16px;
          border: 2px solid var(--border-color);
          border-radius: 4px;
        }
        .checked-icon {
          color: var(--success);
        }
        .t-large-meta {
          flex: 1;
        }
        .t-large-title {
          font-size: 0.92rem;
          color: var(--text-dark);
          font-weight: 600;
        }
        .topic-large-item.done .t-large-title {
          color: var(--text-muted);
          text-decoration: line-through;
        }
        .t-large-class-info {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .chapter-sidebar-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .related-classes-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .rel-class-item {
          background: var(--light-green-subtle);
          border-radius: var(--radius-md);
          padding: 0.75rem 1rem;
          border: 1px solid var(--border-subtle);
        }
        .rel-class-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.35rem;
        }
        .rel-num {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
        }
        .rel-title {
          font-size: 0.88rem;
          color: var(--text-dark);
          margin-bottom: 0.25rem;
        }
        .rel-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .empty-classes-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 0.5rem;
        }
        .practice-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }
        .practice-btn-stack {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        @media (max-width: 850px) {
          .chapter-details-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .chapter-header-card {
            padding: 1.5rem 1rem;
          }
          .ch-full-title {
            font-size: 1.45rem;
          }
          .topics-detail-card, .related-classes-card, .practice-action-box {
            padding: 1.25rem 1rem;
          }
          .ch-head-right {
            min-width: 100%;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
