import React, { useState } from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { SyllabusCurriculumExplorer } from '../../components/home/SyllabusCurriculumExplorer';
import { Calendar, Clock, BookOpen, Search, CheckCircle2, ChevronRight, Layers, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SchedulePage: React.FC = () => {
  const { classes, teacher, course } = useCourseData();
  const [filterPaper, setFilterPaper] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterMonth, setFilterMonth] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scheduleView, setScheduleView] = useState<'blueprint' | 'cards'>('blueprint');

  const filteredClasses = classes.filter(cls => {
    const matchPaper = filterPaper === 'all' || 
      (filterPaper === 'first-paper' && cls.paper.includes('First')) ||
      (filterPaper === 'second-paper' && cls.paper.includes('Second'));
    const matchStatus = filterStatus === 'all' || cls.status.toLowerCase() === filterStatus.toLowerCase();
    
    let matchMonth = true;
    if (filterMonth === 'm1') matchMonth = cls.classNumber <= 12;
    else if (filterMonth === 'm2') matchMonth = cls.classNumber >= 13 && cls.classNumber <= 24;
    else if (filterMonth === 'm3') matchMonth = cls.classNumber >= 25 && cls.classNumber <= 36;
    else if (filterMonth === 'm4') matchMonth = cls.classNumber >= 37;

    const matchSearch = cls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.chapterName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPaper && matchStatus && matchMonth && matchSearch;
  });

  return (
    <div className="schedule-page-wrapper section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-pill">Academic Schedule</span>
          <h1 className="section-title">HSC Biology 48-Class Schedule</h1>
          <p className="section-subtitle">
            4 Months • 48 Intensive Live Classes • 3 Classes / Week (Sun, Tue, Thu 7:00 PM – 8:30 PM)
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="schedule-view-toggle-bar">
          <button
            type="button"
            className={`view-toggle-btn ${scheduleView === 'blueprint' ? 'active' : ''}`}
            onClick={() => setScheduleView('blueprint')}
          >
            <Layers size={16} />
            <span>4-Month Academic Blueprint</span>
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${scheduleView === 'cards' ? 'active' : ''}`}
            onClick={() => setScheduleView('cards')}
          >
            <LayoutGrid size={16} />
            <span>Live Class Cards</span>
          </button>
        </div>

        {scheduleView === 'blueprint' ? (
          <div className="schedule-blueprint-container">
            <SyllabusCurriculumExplorer />
          </div>
        ) : (
          <>
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
                  <label className="filter-label">Month:</label>
                  <select 
                    value={filterMonth} 
                    onChange={(e) => setFilterMonth(e.target.value)}
                    className="form-select filter-select"
                  >
                    <option value="all">All 4 Months</option>
                    <option value="m1">Month 1 (Classes 01–12)</option>
                    <option value="m2">Month 2 (Classes 13–24)</option>
                    <option value="m3">Month 3 (Classes 25–36)</option>
                    <option value="m4">Month 4 (Classes 37–48)</option>
                  </select>
                </div>

                <div className="filter-item">
                  <label className="filter-label">Paper:</label>
                  <select 
                    value={filterPaper} 
                    onChange={(e) => setFilterPaper(e.target.value)}
                    className="form-select filter-select"
                  >
                    <option value="all">All Papers</option>
                    <option value="first-paper">1st Paper (Botany)</option>
                    <option value="second-paper">2nd Paper (Zoology)</option>
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
        </>
        )}

        {/* Enrollment Reminder */}
        <div className="schedule-cta text-center">
          <Link to="/enroll" className="btn btn-primary btn-lg">
            Enroll to Access Live Meet Links & Class Recordings
          </Link>
        </div>
      </div>

      <style>{`
        .schedule-view-toggle-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }

        .view-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          border-radius: var(--radius-full);
          border: 1.5px solid var(--border-color);
          background: #FFFFFF;
          color: var(--text-dark);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-toggle-btn:hover {
          border-color: var(--primary-green);
        }

        .view-toggle-btn.active {
          background: var(--dark-green);
          color: #FFFFFF;
          border-color: var(--dark-green);
          box-shadow: 0 4px 12px rgba(49, 91, 61, 0.15);
        }

        .schedule-blueprint-container {
          margin-bottom: 3rem;
        }
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
