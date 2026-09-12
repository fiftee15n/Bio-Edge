import React, { useState } from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  Calendar, 
  Clock, 
  Video, 
  FileText, 
  Search, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

export const StudentClassesPage = () => {
  const { classes, teacher } = useCourseData();
  const [filterPaper, setFilterPaper] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = classes.filter(cls => {
    const matchPaper = filterPaper === 'all' || 
      (filterPaper === 'first-paper' && cls.paper.includes('First')) ||
      (filterPaper === 'second-paper' && cls.paper.includes('Second'));
    const matchSearch = cls.title.toLowerCase().includes(search.toLowerCase()) || 
      cls.topic.toLowerCase().includes(search.toLowerCase());
    return matchPaper && matchSearch;
  });

  return (
    <div className="student-classes-page">
      {/* Header */}
      <div className="classes-header-card bio-card">
        <div>
          <span className="badge badge-green">Live Schedule & Recordings</span>
          <h1 className="classes-title">48-Class Academic Schedule</h1>
          <p className="classes-sub">
            Join live Google Meet sessions or review past recorded classes and lecture handouts.
          </p>
        </div>

        <div className="classes-filter-row">
          <div className="search-wrap">
            <Search size={16} className="s-icon" />
            <input
              type="text"
              placeholder="Search class topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <select 
            value={filterPaper} 
            onChange={(e) => setFilterPaper(e.target.value)}
            className="form-select filter-select"
          >
            <option value="all">All Papers</option>
            <option value="first-paper">First Paper</option>
            <option value="second-paper">Second Paper</option>
          </select>
        </div>
      </div>

      {/* Classes List */}
      <div className="classes-list-grid">
        {filtered.map((cls) => (
          <div key={cls.id} className="student-class-item bio-card">
            <div className="cls-item-top">
              <span className="cls-pill">Class {cls.classNumber}</span>
              <span className={`badge ${cls.status === 'Completed' ? 'badge-gray' : 'badge-green'}`}>
                {cls.status}
              </span>
            </div>

            <div className="cls-item-body">
              <span className="cls-paper-name">{cls.paper}</span>
              <h3 className="cls-item-title">{cls.title}</h3>
              <p className="cls-item-topic">
                <strong>Chapter:</strong> {cls.chapterName} • <strong>Topic:</strong> {cls.topic}
              </p>
            </div>

            <div className="cls-item-timing">
              <div className="t-row">
                <Calendar size={14} className="t-ico" />
                <span>{cls.date} ({cls.day})</span>
              </div>
              <div className="t-row">
                <Clock size={14} className="t-ico" />
                <span>{cls.time}</span>
              </div>
            </div>

            <div className="cls-item-actions">
              {cls.status === 'Upcoming' ? (
                <a 
                  href={cls.meetLink || "#"} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-primary btn-sm btn-block"
                >
                  <Video size={16} /> Join Live Meet
                </a>
              ) : (
                <button 
                  onClick={() => alert(`Opening lecture recording & PDF notes for ${cls.title}`)}
                  className="btn btn-secondary btn-sm btn-block"
                >
                  <FileText size={16} /> View Notes & Recording
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .student-classes-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .classes-header-card {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .classes-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .classes-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .classes-filter-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .search-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--light-green-subtle);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0.5rem 0.85rem;
        }
        .s-icon {
          color: var(--text-muted);
        }
        .search-input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.88rem;
          width: 180px;
        }
        .filter-select {
          padding: 0.5rem 0.85rem;
          font-size: 0.88rem;
        }

        .classes-list-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .student-class-item {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .cls-item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .cls-pill {
          background: var(--light-green);
          color: var(--dark-green);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
        }
        .cls-paper-name {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
        }
        .cls-item-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-top: 0.25rem;
          margin-bottom: 0.4rem;
        }
        .cls-item-topic {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .cls-item-timing {
          background: var(--light-green-subtle);
          border-radius: var(--radius-md);
          padding: 0.65rem 0.85rem;
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          color: var(--text-dark);
          margin-bottom: 1.25rem;
        }
        .t-row {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .t-ico {
          color: var(--primary-green);
        }
      `}</style>
    </div>
  );
};
