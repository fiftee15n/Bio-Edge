import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCourseData } from '../../context/CourseDataContext';
import { ProgressBar } from '../../components/common/ProgressBar';
import { 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  ChevronRight, 
  Clock, 
  Layers,
  ArrowRight,
  Award,
  AlertCircle
} from 'lucide-react';

export const StudentCoursePage: React.FC = () => {
  const { user } = useAuth();
  const { papers, toggleTopicStatus, hasAccessToCourse, enrollments } = useCourseData();
  const [selectedPaperTab, setSelectedPaperTab] = useState<string>('first-paper');

  const userEmail = user?.email || '';
  const hasAlphaAccess = hasAccessToCourse(userEmail, 'alpha-cohort');
  const hasSscAccess = hasAccessToCourse(userEmail, 'ssc-2027');
  const myPending = enrollments.find(e => e.email.toLowerCase() === userEmail.toLowerCase() && e.status === 'Pending');

  const activePaper = papers.find(p => p.id === selectedPaperTab) || papers[0];

  return (
    <div className="student-course-page">
      {/* Access Restriction Notice if enrolled only in SSC 2027 */}
      {!hasAlphaAccess && hasSscAccess && (
        <div className="course-access-notice-card bio-card">
          <div className="notice-left">
            <Award size={24} className="notice-icon" />
            <div>
              <h3 className="notice-title">Enrolled Course: SSC 2027 Model Test Package</h3>
              <p className="notice-desc">
                Your verified course access includes all 20 Board-Standard Model Tests, handwritten evaluation, and solution classes. 
                The 24 HSC Theory Chapters below are part of the <strong>Alpha Cohort (HSC Biology Intensive)</strong>.
              </p>
            </div>
          </div>
          <Link to="/student/model-tests" className="btn btn-primary btn-sm">
            <Award size={16} /> Open SSC Model Tests
          </Link>
        </div>
      )}

      {/* Access Pending Verification Notice */}
      {!hasAlphaAccess && !hasSscAccess && (
        <div className="course-access-notice-card pending bio-card">
          <div className="notice-left">
            <Clock size={24} className="notice-icon amber" />
            <div>
              <h3 className="notice-title">Course Materials Awaiting Admin Verification</h3>
              <p className="notice-desc">
                {myPending 
                  ? `Your payment for "${myPending.courseTitle}" is pending administrator approval. Full interactive access will unlock once verified.`
                  : `You do not currently have an active course enrollment. Please enroll to unlock course materials.`}
              </p>
            </div>
          </div>
          {!myPending && (
            <Link to="/enroll" className="btn btn-primary btn-sm">
              Enroll Now <ArrowRight size={14} />
            </Link>
          )}
        </div>
      )}

      {/* Header Banner */}
      <div className="course-hero-header bio-card">
        <div className="c-hero-left">
          <span className="badge badge-green">Academic Curriculum</span>
          <h1 className="c-hero-title">
            {hasSscAccess && !hasAlphaAccess 
              ? 'Alpha Cohort Curriculum Overview' 
              : 'My Course: First & Second Paper'}
          </h1>
          <p className="c-hero-desc">
            Explore all 24 chapters, mark completed topics, and access chapter lecture notes.
          </p>
        </div>

        <div className="paper-tabs-row">
          {papers.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPaperTab(p.id)}
              className={`portal-tab-btn ${selectedPaperTab === p.id ? 'active' : ''}`}
            >
              <BookOpen size={16} />
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="student-chapters-grid">
        {activePaper.chapters.map((ch) => (
          <div key={ch.id} className="student-chapter-card bio-card">
            <div className="ch-card-top">
              <span className="ch-index-badge">Chapter {ch.number}</span>
              <span className={`badge ${ch.status === 'Completed' ? 'badge-green' : ch.status === 'In Progress' ? 'badge-amber' : 'badge-gray'}`}>
                {ch.status}
              </span>
            </div>

            <h3 className="ch-card-title">{ch.name}</h3>

            <div className="ch-progress-wrapper">
              <div className="ch-progress-meta">
                <span>Mastery Level</span>
                <strong>{ch.progress}%</strong>
              </div>
              <ProgressBar progress={ch.progress} height={7} />
            </div>

            <div className="ch-topics-interactive-list">
              <h4 className="topics-list-title">Topics in this Chapter:</h4>
              {(ch.topics || []).map((topic) => (
                <div 
                  key={topic.id} 
                  className={`topic-interactive-row ${topic.status === 'Completed' ? 'done' : ''}`}
                  onClick={() => toggleTopicStatus(activePaper.id, ch.id, topic.id)}
                  title="Click to toggle completion status"
                >
                  <div className="topic-check-box">
                    {topic.status === 'Completed' ? (
                      <CheckCircle2 size={16} className="checked-icon" />
                    ) : (
                      <span className="empty-checkbox"></span>
                    )}
                  </div>
                  <span className="topic-text">{topic.title}</span>
                </div>
              ))}
            </div>

            <div className="ch-card-footer">
              <Link to={`/student/chapter/${ch.id}`} className="btn btn-outline btn-sm btn-block">
                Chapter Details & Practice <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .student-course-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .course-hero-header {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .c-hero-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .c-hero-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .paper-tabs-row {
          display: flex;
          gap: 0.5rem;
        }
        .portal-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: #FFFFFF;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-dark);
        }
        .portal-tab-btn.active {
          background: var(--dark-green);
          color: #FFFFFF;
          border-color: var(--dark-green);
        }

        .student-chapters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 1.5rem;
        }
        .student-chapter-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .ch-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .ch-index-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
        }
        .ch-card-title {
          font-size: 1.2rem;
          color: var(--dark-green);
          margin-bottom: 1rem;
        }
        .ch-progress-wrapper {
          margin-bottom: 1.25rem;
        }
        .ch-progress-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-bottom: 0.35rem;
        }
        .topics-list-title {
          font-size: 0.82rem;
          color: var(--text-dark);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 0.6rem;
        }
        .ch-topics-interactive-list {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          margin-bottom: 1.5rem;
        }
        .topic-interactive-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0.65rem;
          border-radius: var(--radius-sm);
          background: var(--light-green-subtle);
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .topic-interactive-row:hover {
          background: var(--light-green);
        }
        .topic-interactive-row.done {
          background: #F4F9F5;
        }
        .topic-check-box {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .empty-checkbox {
          width: 14px;
          height: 14px;
          border: 1.5px solid var(--border-color);
          border-radius: 3px;
        }
        .checked-icon {
          color: var(--success);
        }
        .topic-text {
          font-size: 0.82rem;
          color: var(--text-dark);
        }
        .topic-interactive-row.done .topic-text {
          color: var(--text-muted);
          text-decoration: line-through;
        }
        .course-access-notice-card {
          background: #EFF6FF;
          border: 1.5px solid #BFDBFE;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          border-radius: var(--radius-lg);
        }
        .course-access-notice-card.pending {
          background: #FFFBEB;
          border-color: #FDE68A;
        }
        .notice-left {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .notice-icon {
          color: #2563EB;
          flex-shrink: 0;
          margin-top: 0.2rem;
        }
        .notice-icon.amber {
          color: #D97706;
        }
        .notice-title {
          font-size: 1.1rem;
          color: var(--dark-green);
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .notice-desc {
          font-size: 0.86rem;
          color: var(--text-muted);
          line-height: 1.5;
          max-width: 700px;
        }

        @media (max-width: 768px) {
          .course-access-notice-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .student-chapters-grid {
            grid-template-columns: 1fr;
          }
          .course-hero-header {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.25rem 1rem;
            gap: 1rem;
          }
          .paper-tabs-row {
            width: 100%;
          }
          .portal-tab-btn {
            flex: 1;
            justify-content: center;
            padding: 0.5rem 0.75rem;
            font-size: 0.82rem;
          }
          .student-chapter-card {
            padding: 1.25rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};
