import React, { useState } from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { Calendar, Clock, BookOpen, Search, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SchedulePage: React.FC = () => {
  const { classes, teacher, course } = useCourseData();
  const [filterPaper, setFilterPaper] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredClasses = classes.filter(cls => {
    const matchPaper = filterPaper === 'all' || 
      (filterPaper === 'first-paper' && cls.paper.includes('First')) ||
      (filterPaper === 'second-paper' && cls.paper.includes('Second'));
    const matchStatus = filterStatus === 'all' || cls.status.toLowerCase() === filterStatus.toLowerCase();
    const matchSearch = cls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.chapterName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPaper && matchStatus && matchSearch;
  });

  return (
    <div className="schedule-page-wrapper section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-pill">Academic Schedule</span>
          <h1 className="section-title">Complete 48-Class Schedule</h1>
          <p className="section-subtitle">
            Live classes are held every Sunday, Tuesday, and Thursday from 7:00 PM to 8:30 PM.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="schedule-filters-card bio-card">
          <div className="search-bar-wrap">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by topic, chapter name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-group-row">
            <div className="filter-item">
              <label className="filter-label">Paper:</label>
              <select 
                value={filterPaper} 
                onChange={(e) => setFilterPaper(e.target.value)}
                className="form-select filter-select"
              >
                <option value="all">All Papers</option>
                <option value="first-paper">First Paper (Botany & Cell)</option>
                <option value="second-paper">Second Paper (Zoology & Physiology)</option>
              </select>
            </div>

            <div className="filter-item">
              <label className="filter-label">Status:</label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="form-select filter-select"
              >
                <option value="all">All Statuses</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="schedule-cards-grid">
          {filteredClasses.length === 0 ? (
            <div className="no-classes-found bio-card text-center">
              <p>No scheduled classes match your current search and filter criteria.</p>
            </div>
          ) : (
            filteredClasses.map((cls) => (
              <div key={cls.id} className="schedule-card-item bio-card">
                <div className="s-card-top">
                  <span className="s-class-num">Class {cls.classNumber}</span>
                  <span className={`badge ${cls.status === 'Completed' ? 'badge-gray' : 'badge-green'}`}>
                    {cls.status}
                  </span>
                </div>

                <div className="s-card-body">
                  <span className="s-paper-tag">{cls.paper}</span>
                  <h3 className="s-title">{cls.title}</h3>
                  <div className="s-chapter-row">
                    <strong>{cls.chapterName}</strong>
                  </div>
                  <p className="s-topic">Topic: {cls.topic}</p>
                </div>

                <div className="s-card-footer">
                  <div className="s-timing">
                    <Calendar size={14} className="s-icon" />
                    <span>{cls.date} ({cls.day})</span>
                  </div>
                  <div className="s-timing">
                    <Clock size={14} className="s-icon" />
                    <span>{cls.time}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Enrollment Reminder */}
        <div className="schedule-cta text-center">
          <Link to="/enroll" className="btn btn-primary btn-lg">
            Enroll to Access Live Meet Links & Class Recordings
          </Link>
        </div>
      </div>

      <style>{`
        .schedule-filters-card {
          padding: 1.5rem;
          margin-bottom: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .search-bar-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          min-width: 280px;
          background: var(--light-green-subtle);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0.6rem 1rem;
        }
        .search-icon {
          color: var(--text-muted);
        }
        .search-input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 0.92rem;
        }
        .filters-group-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .filter-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .filter-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-dark);
        }
        .filter-select {
          padding: 0.5rem 0.85rem;
          font-size: 0.88rem;
          min-width: 140px;
        }

        .schedule-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3.5rem;
        }
        .schedule-card-item {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .s-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .s-class-num {
          background: var(--light-green);
          color: var(--dark-green);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
        }
        .s-paper-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
        }
        .s-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.5rem;
        }
        .s-chapter-row {
          font-size: 0.85rem;
          color: var(--text-dark);
          margin-bottom: 0.25rem;
        }
        .s-topic {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }
        .s-card-footer {
          border-top: 1px solid var(--border-subtle);
          padding-top: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .s-timing {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .s-icon {
          color: var(--primary-green);
        }
        .no-classes-found {
          grid-column: 1 / -1;
          padding: 3rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};
