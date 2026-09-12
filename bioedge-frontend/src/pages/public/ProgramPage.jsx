import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Target 
} from 'lucide-react';

export const ProgramPage = () => {
  const { course, papers, availableSeats } = useCourseData();
  const [selectedPaperId, setSelectedPaperId] = useState('first-paper');

  const activePaper = papers.find(p => p.id === selectedPaperId) || papers[0];

  return (
    <div className="program-page-wrapper section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-pill">Flagship Program</span>
          <h1 className="section-title">{course.title}</h1>
          <p className="section-subtitle">
            A comprehensive 4-month academic blueprint encompassing all 24 chapters of HEC Biology First & Second Paper.
          </p>
        </div>

        {/* Key Metrics Overview */}
        <div className="program-overview-cards-grid">
          <div className="p-ov-card bio-card">
            <span className="ov-label">Duration</span>
            <strong className="ov-value">{course.duration}</strong>
            <p className="ov-sub">16 Intensive Weeks</p>
          </div>
          <div className="p-ov-card bio-card">
            <span className="ov-label">Live Classes</span>
            <strong className="ov-value">{course.totalClasses} Sessions</strong>
            <p className="ov-sub">90 mins per class</p>
          </div>
          <div className="p-ov-card bio-card">
            <span className="ov-label">Curriculum Depth</span>
            <strong className="ov-value">24 Chapters</strong>
            <p className="ov-sub">Botany + Zoology</p>
          </div>
          <div className="p-ov-card bio-card highlight-ov-card">
            <span className="ov-label">Cohort Size</span>
            <strong className="ov-value">{course.seatLimit} Students</strong>
            <p className="ov-sub">{availableSeats} seats remaining</p>
          </div>
        </div>

        {/* Comprehensive Syllabus Explorer */}
        <div className="syllabus-explorer-container" id="structure">
          <div className="syllabus-header">
            <h2 className="syllabus-title">Detailed Chapter Breakdown</h2>
            <div className="paper-switcher-btn-group">
              {papers.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPaperId(p.id)}
                  className={`paper-switcher-btn ${selectedPaperId === p.id ? 'active' : ''}`}
                >
                  <BookOpen size={16} />
                  <span>{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="detailed-chapters-accordion">
            {activePaper.chapters.map((ch) => (
              <div key={ch.id} className="detailed-chapter-card bio-card">
                <div className="d-ch-header">
                  <div className="d-ch-title-wrap">
                    <span className="d-ch-badge">Chapter {ch.number}</span>
                    <h3 className="d-ch-name">{ch.name}</h3>
                  </div>
                  <span className="d-ch-topics-pill">
                    {(ch.topics || []).length} Topics Covered
                  </span>
                </div>

                <div className="d-ch-topics-grid">
                  {(ch.topics || []).map((t, idx) => (
                    <div key={idx} className="d-topic-cell">
                      <CheckCircle2 size={16} className="d-topic-icon" />
                      <span className="d-topic-title">{t.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Materials & Handouts */}
        <div className="materials-card bio-card">
          <div className="materials-content">
            <span className="section-pill">Resource Library</span>
            <h2 className="materials-title">Included Study Materials & Guides</h2>
            <ul className="materials-list">
              <li>
                <CheckCircle2 size={18} className="m-icon" />
                <div>
                  <strong>High-Resolution Annotated Diagram Notebook</strong>
                  <p>Over 80+ standard Board exam diagrams with colored label keys.</p>
                </div>
              </li>
              <li>
                <CheckCircle2 size={18} className="m-icon" />
                <div>
                  <strong>Chapter-wise CQ Model Answer Repository</strong>
                  <p>Exemplary 'A+' answers written and formatted according to grading rubrics.</p>
                </div>
              </li>
              <li>
                <CheckCircle2 size={18} className="m-icon" />
                <div>
                  <strong>1,500+ Curated Question Bank</strong>
                  <p>MCQs categorized by difficulty, past board frequencies, and Olympiad concepts.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="program-bottom-cta text-center">
          <h3 className="bottom-cta-heading">Ready to Master HEC Biology?</h3>
          <p className="bottom-cta-sub">
            Join the upcoming cohort before the remaining {availableSeats} seats fill up.
          </p>
          <Link to="/enroll" className="btn btn-primary btn-lg">
            Enroll in Program Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <style>{`
        .program-overview-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-bottom: 4rem;
        }
        .p-ov-card {
          padding: 1.75rem;
          text-align: center;
        }
        .highlight-ov-card {
          background: var(--light-green);
          border-color: rgba(49, 91, 61, 0.2);
        }
        .ov-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 600;
          display: block;
          margin-bottom: 0.35rem;
        }
        .ov-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--dark-green);
          display: block;
          font-family: var(--font-heading);
          line-height: 1.2;
        }
        .ov-sub {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        .syllabus-explorer-container {
          margin-bottom: 4rem;
        }
        .syllabus-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .syllabus-title {
          font-size: 1.75rem;
          color: var(--dark-green);
        }
        .paper-switcher-btn-group {
          display: flex;
          gap: 0.5rem;
        }
        .paper-switcher-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: #FFFFFF;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-dark);
          transition: all 0.2s ease;
        }
        .paper-switcher-btn.active {
          background: var(--dark-green);
          color: #FFFFFF;
          border-color: var(--dark-green);
        }

        .detailed-chapters-accordion {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .detailed-chapter-card {
          padding: 1.75rem;
        }
        .d-ch-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .d-ch-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .d-ch-badge {
          background: var(--light-green);
          color: var(--dark-green);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
        }
        .d-ch-name {
          font-size: 1.2rem;
          color: var(--dark-green);
        }
        .d-ch-topics-pill {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .d-ch-topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 0.75rem;
        }
        .d-topic-cell {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0.75rem;
          background: var(--light-green-subtle);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          color: var(--text-dark);
        }
        .d-topic-icon {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .materials-card {
          padding: 3rem;
          margin-bottom: 4rem;
          background: linear-gradient(135deg, #FFFFFF 0%, #FAFDFB 100%);
        }
        .materials-title {
          font-size: 1.75rem;
          color: var(--dark-green);
          margin-top: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .materials-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .materials-list li {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .m-icon {
          color: var(--primary-green);
          margin-top: 0.2rem;
          flex-shrink: 0;
        }
        .materials-list strong {
          font-size: 1rem;
          color: var(--text-dark);
        }
        .materials-list p {
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .program-bottom-cta {
          background: var(--light-green);
          border: 1px solid rgba(49, 91, 61, 0.15);
          padding: 3rem 2rem;
          border-radius: var(--radius-xl);
        }
        .bottom-cta-heading {
          font-size: 1.85rem;
          color: var(--dark-green);
          margin-bottom: 0.5rem;
        }
        .bottom-cta-sub {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  );
};
