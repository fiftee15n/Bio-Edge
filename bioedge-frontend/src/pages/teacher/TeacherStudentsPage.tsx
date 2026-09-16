import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { ProgressBar } from '../../components/common/ProgressBar';
import { 
  Users, 
  Search, 
  Filter, 
  UserCheck, 
  ExternalLink, 
  CheckCircle2, 
  XCircle,
  Clock,
  LayoutGrid,
  List,
  GraduationCap,
  Mail,
  Phone,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Sparkles,
  X,
  MessageCircle
} from 'lucide-react';

export const TeacherStudentsPage: React.FC = () => {
  const { students, updateStudentStatus, course, availableSeats } = useCourseData();
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [scoreFilter, setScoreFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // KPI Calculations
  const totalStudents = students.length;
  const activeStudentsCount = students.filter(s => s.status.toLowerCase() === 'active').length;
  const pendingStudentsCount = students.filter(s => s.status.toLowerCase() === 'pending').length;
  const inactiveStudentsCount = students.filter(s => s.status.toLowerCase() === 'inactive').length;

  const averageClassScore = useMemo(() => {
    if (students.length === 0) return 0;
    const sum = students.reduce((acc, s) => acc + (s.averageScore || 0), 0);
    return Math.round(sum / students.length);
  }, [students]);

  const averageClassProgress = useMemo(() => {
    if (students.length === 0) return 0;
    const sum = students.reduce((acc, s) => acc + (s.courseProgress || 0), 0);
    return Math.round(sum / students.length);
  }, [students]);

  // Filtering & Sorting
  const filteredStudents = useMemo(() => {
    return students
      .filter(s => {
        // Status filter
        if (statusFilter !== 'all' && s.status.toLowerCase() !== statusFilter.toLowerCase()) {
          return false;
        }

        // Score filter
        if (scoreFilter === 'high' && (s.averageScore || 0) < 85) return false;
        if (scoreFilter === 'mid' && ((s.averageScore || 0) < 70 || (s.averageScore || 0) >= 85)) return false;
        if (scoreFilter === 'low' && (s.averageScore || 0) >= 70) return false;

        // Search query
        if (search.trim()) {
          const q = search.toLowerCase();
          const matchName = s.name.toLowerCase().includes(q);
          const matchId = (s.studentId || '').toLowerCase().includes(q);
          const matchEmail = (s.email || '').toLowerCase().includes(q);
          const matchCollege = (s.college || s.institution || '').toLowerCase().includes(q);
          const matchPhone = (s.phone || '').includes(q);
          if (!matchName && !matchId && !matchEmail && !matchCollege && !matchPhone) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'score-high') return (b.averageScore || 0) - (a.averageScore || 0);
        if (sortBy === 'score-low') return (a.averageScore || 0) - (b.averageScore || 0);
        if (sortBy === 'progress') return (b.courseProgress || 0) - (a.courseProgress || 0);
        if (sortBy === 'recent') return (b.lastActive || '').localeCompare(a.lastActive || '');
        return 0;
      });
  }, [students, search, statusFilter, scoreFilter, sortBy]);

  const handleClearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setScoreFilter('all');
    setSortBy('name');
  };

  return (
    <div className="teacher-students-page">
      {/* Top Banner & Header */}
      <div className="students-header-banner bio-card">
        <div className="header-left">
          <div className="header-badge-row">
            <span className="roster-pill">
              <Users size={13} /> Cohort Student Directory
            </span>
            <span className="batch-tag">{course.batchName || 'Alpha Cohort (HSC Biology)'}</span>
          </div>
          <h1 className="header-main-title">Enrolled Students Roster</h1>
          <p className="header-sub-text">
            Monitor student progress, diagnostic scores, written exam evaluations, and academic milestones in real-time.
          </p>
        </div>

        <div className="header-right-actions">
          {/* View Switcher: Grid vs Table */}
          <div className="view-toggle-pill">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              title="Card Grid View"
            >
              <LayoutGrid size={16} />
              <span>Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              title="Table View"
            >
              <List size={16} />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Overview Metrics Cards */}
      <div className="students-kpi-grid">
        <div className="kpi-card bio-card">
          <div className="kpi-icon-wrap emerald">
            <Users size={22} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Total Enrolled</span>
            <div className="kpi-value-row">
              <span className="kpi-value">{totalStudents}</span>
              <span className="kpi-capacity-badge">
                {availableSeats} seats left
              </span>
            </div>
            <p className="kpi-sub">Max Batch Limit: {course.seatLimit || 20} students</p>
          </div>
        </div>

        <div className="kpi-card bio-card">
          <div className="kpi-icon-wrap teal">
            <CheckCircle2 size={22} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Active Learners</span>
            <div className="kpi-value-row">
              <span className="kpi-value">{activeStudentsCount}</span>
              <span className="kpi-pulse-dot" title="Active in Cohort"></span>
            </div>
            <p className="kpi-sub">{Math.round((activeStudentsCount / (totalStudents || 1)) * 100)}% active participation</p>
          </div>
        </div>

        <div className="kpi-card bio-card">
          <div className="kpi-icon-wrap amber">
            <Award size={22} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Class Avg Score</span>
            <div className="kpi-value-row">
              <span className="kpi-value">{averageClassScore}%</span>
              <span className="kpi-tag green">Board Ready</span>
            </div>
            <p className="kpi-sub">Across Chapter & Model Tests</p>
          </div>
        </div>

        <div className="kpi-card bio-card">
          <div className="kpi-icon-wrap blue">
            <TrendingUp size={22} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Avg Syllabus Progress</span>
            <div className="kpi-value-row">
              <span className="kpi-value">{averageClassProgress}%</span>
            </div>
            <div className="kpi-progress-bar">
              <ProgressBar progress={averageClassProgress} height={6} />
            </div>
          </div>
        </div>
      </div>

      {/* Spacious Controls & Filters Bar */}
      <div className="students-controls-card bio-card">
        {/* Search & Main Filter Controls */}
        <div className="controls-top-row">
          <div className="search-box-wrap">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by student name, ID, college, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="students-search-input"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="search-clear-btn"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="dropdown-filters-wrap">
            <div className="filter-select-group">
              <Filter size={15} className="select-icon" />
              <select
                value={scoreFilter}
                onChange={(e) => setScoreFilter(e.target.value)}
                className="form-select filter-dropdown"
              >
                <option value="all">All Performance Levels</option>
                <option value="high">Top Performers (≥ 85%)</option>
                <option value="mid">Average Scores (70% - 84%)</option>
                <option value="low">Needs Attention (&lt; 70%)</option>
              </select>
            </div>

            <div className="filter-select-group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select filter-dropdown"
              >
                <option value="name">Sort by: Name (A-Z)</option>
                <option value="score-high">Sort by: Highest Score</option>
                <option value="score-low">Sort by: Lowest Score</option>
                <option value="progress">Sort by: Highest Progress</option>
                <option value="recent">Sort by: Recently Active</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status Pill Tabs & Counter */}
        <div className="status-tabs-row">
          <div className="status-tabs-list">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`status-tab ${statusFilter === 'all' ? 'active' : ''}`}
            >
              All Students
              <span className="tab-count">{totalStudents}</span>
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('active')}
              className={`status-tab ${statusFilter === 'active' ? 'active' : ''}`}
            >
              <span className="status-indicator-dot green"></span>
              Active
              <span className="tab-count">{activeStudentsCount}</span>
            </button>
            {pendingStudentsCount > 0 && (
              <button
                type="button"
                onClick={() => setStatusFilter('pending')}
                className={`status-tab ${statusFilter === 'pending' ? 'active' : ''}`}
              >
                <span className="status-indicator-dot amber"></span>
                Pending
                <span className="tab-count">{pendingStudentsCount}</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setStatusFilter('inactive')}
              className={`status-tab ${statusFilter === 'inactive' ? 'active' : ''}`}
            >
              <span className="status-indicator-dot gray"></span>
              Inactive
              <span className="tab-count">{inactiveStudentsCount}</span>
            </button>
          </div>

          <div className="results-count-text">
            Showing <strong>{filteredStudents.length}</strong> of {totalStudents} enrolled students
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredStudents.length === 0 ? (
        /* Empty State */
        <div className="empty-students-card bio-card text-center">
          <div className="empty-icon-wrap">
            <Users size={36} />
          </div>
          <h3 className="empty-title">No Students Found</h3>
          <p className="empty-desc">
            No enrolled student matching your current search or filters was found in this cohort.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="btn btn-secondary btn-sm"
          >
            Clear Filters & Show All
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Modern Cards Grid View */
        <div className="students-cards-grid">
          {filteredStudents.map((std) => {
            const scoreColor = (std.averageScore || 0) >= 85 
              ? 'score-high' 
              : (std.averageScore || 0) >= 70 
                ? 'score-mid' 
                : 'score-low';

            return (
              <div key={std.id} className="student-profile-card bio-card">
                {/* Card Top: Avatar, Name, ID & Status */}
                <div className="card-top-row">
                  <div className="student-avatar">
                    {std.name.charAt(0)}
                  </div>
                  <div className="student-info-meta">
                    <div className="student-name-row">
                      <h3 className="student-name">{std.name}</h3>
                      <span className={`student-status-badge ${std.status.toLowerCase()}`}>
                        {std.status}
                      </span>
                    </div>
                    <div className="student-id-row">
                      <span className="student-id-pill">{std.studentId}</span>
                      <span className="enroll-date">Joined {std.enrollmentDate}</span>
                    </div>
                  </div>
                </div>

                {/* College / Institution */}
                <div className="student-college-row">
                  <GraduationCap size={15} className="college-icon" />
                  <span className="college-name">
                    {std.college || std.institution || 'Notre Dame College, Dhaka'}
                  </span>
                </div>

                {/* Contact Information */}
                <div className="student-contact-grid">
                  <div className="contact-item">
                    <Mail size={13} className="contact-icon" />
                    <span className="contact-text" title={std.email}>{std.email}</span>
                  </div>
                  <div className="contact-item">
                    <Phone size={13} className="contact-icon" />
                    <span className="contact-text">{std.phone}</span>
                    {std.phone && (
                      <a 
                        href={`https://wa.me/${std.phone.replace(/[^0-9]/g, '')}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="whatsapp-quick-link"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle size={12} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Progress Bar Section */}
                <div className="card-progress-section">
                  <div className="progress-header">
                    <span className="progress-label">Course Syllabus Completion</span>
                    <span className="progress-pct">{std.courseProgress}%</span>
                  </div>
                  <ProgressBar progress={std.courseProgress} height={7} />
                  <div className="progress-sub-row">
                    <span>Attendance: {std.classesAttended || Math.round((std.courseProgress / 100) * 48)} / 48 classes</span>
                    <span>Tests: {std.testsCompleted || Math.round((std.courseProgress / 100) * 12)} / 12 taken</span>
                  </div>
                </div>

                {/* Performance Metrics Banner */}
                <div className="card-metrics-ribbon">
                  <div className="ribbon-metric">
                    <span className="ribbon-label">Avg Diagnostic Score</span>
                    <span className={`ribbon-value ${scoreColor}`}>
                      {std.averageScore}%
                    </span>
                  </div>
                  <div className="ribbon-metric text-right">
                    <span className="ribbon-label">Last Activity</span>
                    <span className="ribbon-sub">
                      <Clock size={12} className="inline-clock" /> {std.lastActive}
                    </span>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="card-action-footer">
                  <div className="status-selector-wrap">
                    <label className="status-select-label">Status:</label>
                    <select
                      value={std.status}
                      onChange={(e) => updateStudentStatus(std.id, e.target.value)}
                      className="form-select status-select-modern"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <Link 
                    to={`/teacher/students/${std.id}`} 
                    className="btn btn-secondary btn-sm dossier-btn"
                  >
                    <span>View Dossier</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Modern Un-congested Table View */
        <div className="table-responsive-wrapper bio-card">
          <table className="spacious-students-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Student Profile</th>
                <th style={{ width: '22%' }}>Contact & College</th>
                <th style={{ width: '20%' }}>Syllabus Progress</th>
                <th style={{ width: '12%' }}>Avg Score</th>
                <th style={{ width: '10%' }}>Status</th>
                <th style={{ width: '8%' }} className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((std) => {
                const scoreColor = (std.averageScore || 0) >= 85 
                  ? 'score-high' 
                  : (std.averageScore || 0) >= 70 
                    ? 'score-mid' 
                    : 'score-low';

                return (
                  <tr key={std.id}>
                    {/* Student Profile */}
                    <td>
                      <div className="tbl-profile-cell">
                        <div className="tbl-avatar">{std.name.charAt(0)}</div>
                        <div className="tbl-profile-meta">
                          <strong className="tbl-student-name">{std.name}</strong>
                          <div className="tbl-id-date-row">
                            <span className="tbl-id-pill">{std.studentId}</span>
                            <span className="tbl-enroll-date">Joined {std.enrollmentDate}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact & College */}
                    <td>
                      <div className="tbl-contact-cell">
                        <span className="tbl-college-text">
                          <GraduationCap size={13} /> {std.college || std.institution || 'Notre Dame College'}
                        </span>
                        <span className="tbl-email-text">{std.email}</span>
                        <span className="tbl-phone-text">{std.phone}</span>
                      </div>
                    </td>

                    {/* Progress */}
                    <td>
                      <div className="tbl-progress-cell">
                        <div className="tbl-progress-num">
                          <span>{std.courseProgress}% completed</span>
                          <span className="tbl-classes-count">{std.classesAttended || Math.round((std.courseProgress / 100) * 48)}/48 classes</span>
                        </div>
                        <ProgressBar progress={std.courseProgress} height={6} />
                      </div>
                    </td>

                    {/* Avg Score */}
                    <td>
                      <div className="tbl-score-cell">
                        <strong className={`score-badge ${scoreColor}`}>
                          {std.averageScore}%
                        </strong>
                        <span className="last-seen-sub">Active: {std.lastActive}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      <select
                        value={std.status}
                        onChange={(e) => updateStudentStatus(std.id, e.target.value)}
                        className={`tbl-status-dropdown ${std.status.toLowerCase()}`}
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="text-right">
                      <Link 
                        to={`/teacher/students/${std.id}`} 
                        className="btn btn-ghost btn-sm tbl-action-btn"
                        title="Open Student Academic Dossier"
                      >
                        <span>Dossier</span>
                        <ExternalLink size={13} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Scoped Modern Styles */}
      <style>{`
        .teacher-students-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1360px;
          margin: 0 auto;
          padding: 0.25rem 0 2rem;
        }

        /* Top Header Banner */
        .students-header-banner {
          padding: 2rem 2.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }

        .header-badge-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.5rem;
        }

        .roster-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }

        .batch-tag {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
          background: #F1F5F3;
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
        }

        .header-main-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--dark-green);
          margin-bottom: 0.35rem;
          letter-spacing: -0.02em;
        }

        .header-sub-text {
          font-size: 0.92rem;
          color: var(--text-muted);
          max-width: 680px;
          line-height: 1.5;
        }

        /* View Mode Toggle Pill */
        .view-toggle-pill {
          display: flex;
          background: #F1F5F3;
          padding: 0.3rem;
          border-radius: var(--radius-full);
          gap: 0.25rem;
          border: 1px solid var(--border-color);
        }

        .view-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.84rem;
          font-weight: 600;
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-full);
          border: none;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-toggle-btn.active {
          background: #FFFFFF;
          color: var(--dark-green);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        /* KPI Metric Cards */
        .students-kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        .kpi-card {
          padding: 1.4rem 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 1.15rem;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .kpi-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .kpi-icon-wrap {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .kpi-icon-wrap.emerald { background: #EAF8EE; color: #15803D; }
        .kpi-icon-wrap.teal { background: #E6F6F4; color: #0D9488; }
        .kpi-icon-wrap.amber { background: #FEF7E6; color: #B45309; }
        .kpi-icon-wrap.blue { background: #EFF6FF; color: #2563EB; }

        .kpi-content {
          flex: 1;
        }

        .kpi-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .kpi-value-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin: 0.25rem 0;
        }

        .kpi-value {
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--dark-green);
          line-height: 1.2;
        }

        .kpi-capacity-badge {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.15rem 0.5rem;
          background: #EAF8EE;
          color: #15803D;
          border-radius: var(--radius-full);
        }

        .kpi-pulse-dot {
          width: 10px;
          height: 10px;
          background: #22C55E;
          border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
          display: inline-block;
        }

        .kpi-tag.green {
          font-size: 0.72rem;
          font-weight: 700;
          color: #15803D;
          background: #DCFCE7;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }

        .kpi-sub {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin: 0;
        }

        .kpi-progress-bar {
          margin-top: 0.45rem;
        }

        /* Controls & Filter Bar */
        .students-controls-card {
          padding: 1.5rem 1.75rem;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .controls-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .search-box-wrap {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 280px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: #9CA3AF;
          pointer-events: none;
        }

        .students-search-input {
          width: 100%;
          padding: 0.75rem 2.5rem 0.75rem 2.85rem;
          font-size: 0.9rem;
          background: #F8FAF9;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          outline: none;
          transition: all 0.2s ease;
        }

        .students-search-input:focus {
          background: #FFFFFF;
          border-color: var(--primary-green);
          box-shadow: 0 0 0 3px rgba(41, 78, 54, 0.12);
        }

        .search-clear-btn {
          position: absolute;
          right: 0.85rem;
          background: none;
          border: none;
          color: #9CA3AF;
          cursor: pointer;
          padding: 0.25rem;
        }

        .search-clear-btn:hover {
          color: var(--text-dark);
        }

        .dropdown-filters-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .filter-select-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .select-icon {
          position: absolute;
          left: 0.85rem;
          color: #6B7280;
          pointer-events: none;
        }

        .filter-dropdown {
          padding: 0.7rem 1rem 0.7rem 2.35rem;
          font-size: 0.86rem;
          font-weight: 600;
          background-color: #F8FAF9;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-dark);
          cursor: pointer;
        }

        .filter-dropdown:focus {
          border-color: var(--primary-green);
        }

        /* Status Tabs Row */
        .status-tabs-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .status-tabs-list {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .status-tab {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.84rem;
          font-weight: 600;
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          background: #FFFFFF;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .status-tab:hover {
          background: #F8FAF9;
          color: var(--dark-green);
        }

        .status-tab.active {
          background: var(--dark-green);
          color: #FFFFFF;
          border-color: var(--dark-green);
        }

        .tab-count {
          font-size: 0.74rem;
          padding: 0.1rem 0.45rem;
          border-radius: var(--radius-full);
          background: rgba(0, 0, 0, 0.08);
        }

        .status-tab.active .tab-count {
          background: rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
        }

        .status-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .status-indicator-dot.green { background: #22C55E; }
        .status-indicator-dot.amber { background: #F59E0B; }
        .status-indicator-dot.gray { background: #9CA3AF; }

        .results-count-text {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        /* Modern Grid Cards View */
        .students-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1.5rem;
        }

        .student-profile-card {
          padding: 1.75rem;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .student-profile-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.07);
          border-color: #CBD5E1;
        }

        .card-top-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .student-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--dark-green) 0%, #1E3E2B 100%);
          color: #FFFFFF;
          font-size: 1.25rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(41, 78, 54, 0.18);
        }

        .student-info-meta {
          flex: 1;
          min-width: 0;
        }

        .student-name-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }

        .student-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--dark-green);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .student-status-badge {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
          flex-shrink: 0;
        }

        .student-status-badge.active { background: #DCFCE7; color: #15803D; }
        .student-status-badge.pending { background: #FEF3C7; color: #B45309; }
        .student-status-badge.inactive { background: #F3F4F6; color: #6B7280; }

        .student-id-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .student-id-pill {
          font-size: 0.74rem;
          font-weight: 700;
          font-family: monospace;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .enroll-date {
          font-size: 0.78rem;
          color: var(--text-light);
        }

        .student-college-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.86rem;
          font-weight: 500;
          color: var(--text-dark);
          background: #F9FAF9;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
        }

        .college-icon {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .college-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .student-contact-grid {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .contact-icon {
          color: #9CA3AF;
          flex-shrink: 0;
        }

        .contact-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .whatsapp-quick-link {
          display: inline-flex;
          align-items: center;
          color: #25D366;
          padding: 0.15rem;
          border-radius: 50%;
          transition: transform 0.15s ease;
        }

        .whatsapp-quick-link:hover {
          transform: scale(1.15);
        }

        /* Card Progress Bar Section */
        .card-progress-section {
          background: #FAFCFA;
          border: 1px solid var(--border-subtle);
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.4rem;
        }

        .progress-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .progress-pct {
          font-size: 0.86rem;
          font-weight: 800;
          color: var(--dark-green);
        }

        .progress-sub-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.45rem;
          font-size: 0.76rem;
          color: var(--text-muted);
        }

        /* Performance Ribbon */
        .card-metrics-ribbon {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0.85rem;
          background: #F8FAF8;
          border-radius: var(--radius-sm);
        }

        .ribbon-metric {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .ribbon-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-light);
          text-transform: uppercase;
        }

        .ribbon-value {
          font-size: 1.1rem;
          font-weight: 800;
        }

        .ribbon-value.score-high { color: #15803D; }
        .ribbon-value.score-mid { color: #D97706; }
        .ribbon-value.score-low { color: #DC2626; }

        .ribbon-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .inline-clock {
          color: #9CA3AF;
        }

        /* Card Action Footer */
        .card-action-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-subtle);
        }

        .status-selector-wrap {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .status-select-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .status-select-modern {
          padding: 0.35rem 0.65rem;
          font-size: 0.8rem;
          font-weight: 600;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: #FFFFFF;
          cursor: pointer;
        }

        .dossier-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.84rem;
          font-weight: 700;
          padding: 0.45rem 0.95rem;
        }

        /* Spacious Table View */
        .table-responsive-wrapper {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          overflow-x: auto;
        }

        .spacious-students-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .spacious-students-table thead th {
          background: #F8FAF9;
          padding: 1.15rem 1.35rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          border-bottom: 1px solid var(--border-color);
          white-space: nowrap;
        }

        .spacious-students-table tbody tr {
          border-bottom: 1px solid var(--border-subtle);
          transition: background-color 0.15s ease;
        }

        .spacious-students-table tbody tr:hover {
          background-color: #F9FBF9;
        }

        .spacious-students-table tbody td {
          padding: 1.25rem 1.35rem;
          vertical-align: middle;
        }

        .tbl-profile-cell {
          display: flex;
          align-items: center;
          gap: 0.95rem;
        }

        .tbl-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .tbl-profile-meta {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .tbl-student-name {
          font-size: 0.96rem;
          font-weight: 700;
          color: var(--dark-green);
        }

        .tbl-id-date-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tbl-id-pill {
          font-size: 0.72rem;
          font-weight: 700;
          font-family: monospace;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.1rem 0.45rem;
          border-radius: var(--radius-sm);
        }

        .tbl-enroll-date {
          font-size: 0.75rem;
          color: var(--text-light);
        }

        .tbl-contact-cell {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .tbl-college-text {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 600;
          color: var(--text-dark);
        }

        .tbl-progress-cell {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          min-width: 160px;
        }

        .tbl-progress-num {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--dark-green);
        }

        .tbl-classes-count {
          color: var(--text-light);
          font-weight: normal;
        }

        .tbl-score-cell {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .score-badge {
          font-size: 1.05rem;
          font-weight: 800;
        }

        .score-badge.score-high { color: #15803D; }
        .score-badge.score-mid { color: #D97706; }
        .score-badge.score-low { color: #DC2626; }

        .last-seen-sub {
          font-size: 0.74rem;
          color: var(--text-light);
        }

        .tbl-status-dropdown {
          padding: 0.35rem 0.65rem;
          font-size: 0.82rem;
          font-weight: 700;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          cursor: pointer;
        }

        .tbl-status-dropdown.active { background: #DCFCE7; color: #15803D; border-color: #86EFAC; }
        .tbl-status-dropdown.pending { background: #FEF3C7; color: #B45309; border-color: #FCD34D; }
        .tbl-status-dropdown.inactive { background: #F3F4F6; color: #6B7280; border-color: #D1D5DB; }

        .tbl-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--dark-green);
          padding: 0.4rem 0.75rem;
        }

        /* Empty State */
        .empty-students-card {
          padding: 4rem 2rem;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
        }

        .empty-icon-wrap {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: #F1F5F3;
          color: var(--text-light);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
        }

        .empty-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-bottom: 0.5rem;
        }

        .empty-desc {
          font-size: 0.92rem;
          color: var(--text-muted);
          max-width: 420px;
          margin: 0 auto 1.5rem;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .students-kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .students-header-banner {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.5rem 1.25rem;
          }
          .students-kpi-grid {
            grid-template-columns: 1fr;
          }
          .controls-top-row {
            flex-direction: column;
            align-items: stretch;
          }
          .dropdown-filters-wrap {
            flex-direction: column;
            align-items: stretch;
          }
          .filter-dropdown {
            width: 100%;
          }
          .students-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
