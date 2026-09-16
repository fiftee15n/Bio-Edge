import React, { useState, useMemo } from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  GraduationCap, 
  ShieldCheck,
  Mail,
  Phone,
  LayoutGrid,
  List,
  X,
  MessageCircle,
  Sparkles,
  UserCheck,
  UserX
} from 'lucide-react';

export const AdminStudentsPage: React.FC = () => {
  const { students, enrollments, updateStudentStatus } = useCourseData();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [courseFilter, setCourseFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Match students with their verified enrollment courses
  const studentsWithCourses = useMemo(() => {
    return students.map((student) => {
      const studentEnrollments = enrollments.filter(
        e => e.email.toLowerCase() === student.email.toLowerCase() && e.status === 'Approved'
      );
      const verifiedCourses = studentEnrollments.map(e => e.courseTitle);

      return {
        ...student,
        verifiedCourses: verifiedCourses.length > 0 
          ? verifiedCourses 
          : (student.batch ? [student.batch] : ['General Enrollment'])
      };
    });
  }, [students, enrollments]);

  const filteredStudents = useMemo(() => {
    return studentsWithCourses.filter((s) => {
      if (statusFilter !== 'All' && s.status !== statusFilter) return false;

      if (courseFilter !== 'All') {
        const matchCourse = s.verifiedCourses.some(c => c.toLowerCase().includes(courseFilter.toLowerCase()));
        if (!matchCourse) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = s.name.toLowerCase().includes(q);
        const matchEmail = s.email.toLowerCase().includes(q);
        const matchId = (s.studentId || '').toLowerCase().includes(q);
        const matchCollege = (s.institution || s.college || '').toLowerCase().includes(q);
        const matchPhone = (s.phone || '').includes(q);
        if (!matchName && !matchEmail && !matchId && !matchCollege && !matchPhone) return false;
      }

      return true;
    });
  }, [studentsWithCourses, statusFilter, courseFilter, searchQuery]);

  const totalCount = students.length;
  const activeCount = students.filter(s => s.status === 'Active').length;
  const pendingCount = students.filter(s => s.status === 'Pending').length;
  const inactiveCount = students.filter(s => s.status === 'Inactive').length;

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setCourseFilter('All');
  };

  return (
    <div className="admin-students-page">
      {/* Header Banner */}
      <div className="admin-page-header bio-card">
        <div className="header-meta">
          <div className="admin-badge-row">
            <span className="admin-pill-badge">
              <Users size={13} /> Student Roster & Authorization
            </span>
            <span className="admin-sub-tag">System Directory</span>
          </div>
          <h1 className="admin-page-title">Enrolled Students & Course Allocation</h1>
          <p className="admin-page-sub">
            Manage student registrations, grant or suspend course access, and inspect institutional affiliations.
          </p>
        </div>

        <div className="header-actions-row">
          {/* View Toggle Pill */}
          <div className="view-toggle-pill">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              title="Cards Grid View"
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

      {/* KPI Cards Row */}
      <div className="admin-kpi-grid">
        <div className="kpi-box bio-card">
          <div className="kpi-icon emerald">
            <Users size={22} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Registered Students</span>
            <div className="kpi-num-row">
              <strong className="kpi-num">{totalCount}</strong>
              <span className="kpi-pill">Total Directory</span>
            </div>
            <p className="kpi-hint">Across all academic sessions</p>
          </div>
        </div>

        <div className="kpi-box bio-card">
          <div className="kpi-icon green">
            <CheckCircle2 size={22} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Active Access Granted</span>
            <div className="kpi-num-row">
              <strong className="kpi-num text-green">{activeCount}</strong>
              <span className="kpi-pill green">Full Course Unlocked</span>
            </div>
            <p className="kpi-hint">{Math.round((activeCount / (totalCount || 1)) * 100)}% authorized learners</p>
          </div>
        </div>

        <div className="kpi-box bio-card">
          <div className="kpi-icon amber">
            <Clock size={22} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Pending Verification</span>
            <div className="kpi-num-row">
              <strong className="kpi-num text-amber">{pendingCount}</strong>
              {pendingCount > 0 && <span className="kpi-pill amber">Needs Audit</span>}
            </div>
            <p className="kpi-hint">Awaiting payment cross-check</p>
          </div>
        </div>

        <div className="kpi-box bio-card">
          <div className="kpi-icon teal">
            <BookOpen size={22} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Course Allocations</span>
            <div className="kpi-num-row">
              <strong className="kpi-num">2 Programs</strong>
            </div>
            <p className="kpi-hint">Alpha Cohort & SSC 2027</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="admin-controls-card bio-card">
        <div className="controls-search-row">
          <div className="search-bar-wrap">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by student name, email, ID, phone, or institution..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="search-clear-btn"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="filter-dropdowns-wrap">
            <div className="filter-item">
              <Filter size={15} className="f-icon" />
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="form-select filter-dropdown"
              >
                <option value="All">All Courses</option>
                <option value="Alpha">Alpha Cohort (HSC Biology)</option>
                <option value="SSC">SSC 2027 Model Test Package</option>
              </select>
            </div>

            <div className="filter-item">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select filter-dropdown"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active (Access Granted)</option>
                <option value="Pending">Pending Verification</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Filter Tabs */}
        <div className="controls-bottom-row">
          <div className="status-pills-list">
            <button
              type="button"
              onClick={() => setStatusFilter('All')}
              className={`filter-pill ${statusFilter === 'All' ? 'active' : ''}`}
            >
              All Students ({totalCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('Active')}
              className={`filter-pill ${statusFilter === 'Active' ? 'active' : ''}`}
            >
              <span className="dot green"></span> Active Access ({activeCount})
            </button>
            {pendingCount > 0 && (
              <button
                type="button"
                onClick={() => setStatusFilter('Pending')}
                className={`filter-pill ${statusFilter === 'Pending' ? 'active' : ''}`}
              >
                <span className="dot amber"></span> Pending Verification ({pendingCount})
              </button>
            )}
            {inactiveCount > 0 && (
              <button
                type="button"
                onClick={() => setStatusFilter('Inactive')}
                className={`filter-pill ${statusFilter === 'Inactive' ? 'active' : ''}`}
              >
                <span className="dot gray"></span> Inactive ({inactiveCount})
              </button>
            )}
          </div>

          <div className="results-count">
            Showing <strong>{filteredStudents.length}</strong> of {totalCount} records
          </div>
        </div>
      </div>

      {/* Main Content View */}
      {filteredStudents.length === 0 ? (
        <div className="empty-state-card bio-card text-center">
          <div className="empty-icon">
            <Users size={36} />
          </div>
          <h3 className="empty-title">No Students Found</h3>
          <p className="empty-text">No student matched your search filters. Try clearing your search or filter tags.</p>
          <button type="button" onClick={handleClearFilters} className="btn btn-secondary btn-sm">
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Cards View */
        <div className="admin-students-grid">
          {filteredStudents.map((student) => {
            return (
              <div key={student.id} className="admin-student-card bio-card">
                {/* Header */}
                <div className="card-header-row">
                  <div className="student-avatar-wrap">
                    {student.name.charAt(0)}
                  </div>
                  <div className="student-title-block">
                    <div className="name-and-status">
                      <h3 className="student-name">{student.name}</h3>
                      <span className={`status-tag ${student.status.toLowerCase()}`}>
                        {student.status === 'Active' ? 'Active Access' : 'Pending'}
                      </span>
                    </div>
                    <div className="id-date-meta">
                      <span className="id-tag">{student.studentId || 'BE-2026-001'}</span>
                      <span className="enroll-date">Joined {student.enrollmentDate || 'Recent'}</span>
                    </div>
                  </div>
                </div>

                {/* College */}
                <div className="college-block">
                  <GraduationCap size={14} className="icon-college" />
                  <span className="college-text">{student.institution || student.college || 'Notre Dame College, Dhaka'}</span>
                </div>

                {/* Contact */}
                <div className="contact-block">
                  <div className="contact-row">
                    <Mail size={13} className="contact-icon" />
                    <span className="contact-val" title={student.email}>{student.email}</span>
                  </div>
                  <div className="contact-row">
                    <Phone size={13} className="contact-icon" />
                    <span className="contact-val">{student.phone}</span>
                    {student.phone && (
                      <a
                        href={`https://wa.me/${student.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="wa-link"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle size={13} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Authorized Courses */}
                <div className="courses-block">
                  <span className="courses-label">Authorized Courses:</span>
                  <div className="courses-tags">
                    {student.verifiedCourses.map((c, i) => (
                      <span 
                        key={i} 
                        className={`course-pill ${c.toLowerCase().includes('ssc') ? 'ssc' : 'alpha'}`}
                      >
                        <BookOpen size={11} /> {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="card-footer-row">
                  <span className="footer-status-label">
                    {student.status === 'Active' ? (
                      <span className="text-green-flex"><CheckCircle2 size={13} /> Full Access</span>
                    ) : (
                      <span className="text-amber-flex"><Clock size={13} /> Access Locked</span>
                    )}
                  </span>

                  {student.status === 'Pending' ? (
                    <button
                      type="button"
                      onClick={() => updateStudentStatus(student.id, 'Active')}
                      className="btn btn-primary btn-sm access-action-btn"
                    >
                      <UserCheck size={14} /> Grant Access
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => updateStudentStatus(student.id, 'Pending')}
                      className="btn btn-outline btn-sm access-action-btn suspend-btn"
                    >
                      <UserX size={14} /> Suspend Access
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="admin-table-wrap bio-card">
          <table className="spacious-admin-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Student Profile</th>
                <th style={{ width: '24%' }}>Institution & Contact</th>
                <th style={{ width: '22%' }}>Authorized Courses</th>
                <th style={{ width: '12%' }}>Enrollment Date</th>
                <th style={{ width: '14%' }} className="text-right">Access Status & Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  {/* Profile */}
                  <td>
                    <div className="tbl-profile-flex">
                      <div className="tbl-avatar">{student.name.charAt(0)}</div>
                      <div className="tbl-name-col">
                        <strong className="tbl-name">{student.name}</strong>
                        <span className="tbl-id">{student.studentId || 'ID Pending'}</span>
                      </div>
                    </div>
                  </td>

                  {/* College & Contact */}
                  <td>
                    <div className="tbl-meta-flex">
                      <span className="tbl-college">
                        <GraduationCap size={13} /> {student.institution || student.college || 'Notre Dame College'}
                      </span>
                      <span className="tbl-contact-line">
                        <Mail size={12} /> {student.email}
                      </span>
                      <span className="tbl-contact-line">
                        <Phone size={12} /> {student.phone}
                      </span>
                    </div>
                  </td>

                  {/* Courses */}
                  <td>
                    <div className="tbl-courses-tags">
                      {student.verifiedCourses.map((c, i) => (
                        <span 
                          key={i} 
                          className={`course-pill ${c.toLowerCase().includes('ssc') ? 'ssc' : 'alpha'}`}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Date */}
                  <td>
                    <span className="tbl-date">{student.enrollmentDate || 'Recent'}</span>
                  </td>

                  {/* Actions */}
                  <td className="text-right">
                    <div className="tbl-actions-flex">
                      <span className={`status-tag ${student.status.toLowerCase()}`}>
                        {student.status === 'Active' ? 'Active' : 'Pending'}
                      </span>

                      {student.status === 'Pending' ? (
                        <button
                          type="button"
                          onClick={() => updateStudentStatus(student.id, 'Active')}
                          className="btn btn-primary btn-sm"
                        >
                          Authorize
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => updateStudentStatus(student.id, 'Pending')}
                          className="btn btn-outline btn-sm suspend-btn"
                        >
                          Suspend
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Scoped CSS */}
      <style>{`
        .admin-students-page {
          padding: 2rem 2.25rem;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        /* Header Banner */
        .admin-page-header {
          padding: 2rem 2.25rem;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          box-shadow: var(--shadow-sm);
        }

        .admin-badge-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.5rem;
        }

        .admin-pill-badge {
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

        .admin-sub-tag {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
          background: #F1F5F3;
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
        }

        .admin-page-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--dark-green);
          margin-bottom: 0.35rem;
          letter-spacing: -0.02em;
        }

        .admin-page-sub {
          font-size: 0.92rem;
          color: var(--text-muted);
          max-width: 680px;
          line-height: 1.5;
        }

        /* View Toggle Pill */
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

        /* KPI Cards */
        .admin-kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        .kpi-box {
          padding: 1.4rem 1.5rem;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          display: flex;
          align-items: flex-start;
          gap: 1.15rem;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .kpi-box:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .kpi-icon {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .kpi-icon.emerald { background: #EAF8EE; color: #15803D; }
        .kpi-icon.green { background: #DCFCE7; color: #16A34A; }
        .kpi-icon.amber { background: #FEF7E6; color: #B45309; }
        .kpi-icon.teal { background: #E6F6F4; color: #0D9488; }

        .kpi-info { flex: 1; }

        .kpi-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .kpi-num-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin: 0.25rem 0;
        }

        .kpi-num {
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--dark-green);
        }

        .kpi-num.text-green { color: #15803D; }
        .kpi-num.text-amber { color: #B45309; }

        .kpi-pill {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.15rem 0.5rem;
          background: #F1F5F3;
          color: var(--text-muted);
          border-radius: var(--radius-full);
        }
        .kpi-pill.green { background: #DCFCE7; color: #15803D; }
        .kpi-pill.amber { background: #FEF3C7; color: #B45309; }

        .kpi-hint {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin: 0;
        }

        /* Controls Card */
        .admin-controls-card {
          padding: 1.5rem 1.75rem;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: var(--shadow-sm);
        }

        .controls-search-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .search-bar-wrap {
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

        .search-input {
          width: 100%;
          padding: 0.75rem 2.5rem 0.75rem 2.85rem;
          font-size: 0.9rem;
          background: #F8FAF9;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input:focus {
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

        .filter-dropdowns-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .filter-item {
          position: relative;
          display: flex;
          align-items: center;
        }

        .f-icon {
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

        .controls-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .status-pills-list {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-pill {
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

        .filter-pill:hover {
          background: #F8FAF9;
          color: var(--dark-green);
        }

        .filter-pill.active {
          background: var(--dark-green);
          color: #FFFFFF;
          border-color: var(--dark-green);
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .dot.green { background: #22C55E; }
        .dot.amber { background: #F59E0B; }
        .dot.gray { background: #9CA3AF; }

        .results-count {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        /* Cards Grid View */
        .admin-students-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1.5rem;
        }

        .admin-student-card {
          padding: 1.75rem;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .admin-student-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.07);
        }

        .card-header-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .student-avatar-wrap {
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
        }

        .student-title-block {
          flex: 1;
          min-width: 0;
        }

        .name-and-status {
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

        .status-tag {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
          flex-shrink: 0;
        }
        .status-tag.active { background: #DCFCE7; color: #15803D; }
        .status-tag.pending { background: #FEF3C7; color: #B45309; }
        .status-tag.inactive { background: #F3F4F6; color: #6B7280; }

        .id-date-meta {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .id-tag {
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

        .college-block {
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

        .icon-college {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        .college-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .contact-block {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .contact-row {
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

        .contact-val {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .wa-link {
          color: #25D366;
          display: inline-flex;
          align-items: center;
          transition: transform 0.15s ease;
        }
        .wa-link:hover { transform: scale(1.15); }

        .courses-block {
          background: #FAFCFA;
          border: 1px solid var(--border-subtle);
          padding: 0.75rem 0.95rem;
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .courses-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-light);
          text-transform: uppercase;
        }

        .courses-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .course-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
        }

        .course-pill.alpha { background: #EAF8EE; color: #15803D; border: 1px solid #BBF7D0; }
        .course-pill.ssc { background: #EFF6FF; color: #2563EB; border: 1px solid #BFDBFE; }

        .card-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-subtle);
        }

        .footer-status-label {
          font-size: 0.82rem;
          font-weight: 600;
        }

        .text-green-flex {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #15803D;
        }

        .text-amber-flex {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #B45309;
        }

        .access-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .suspend-btn {
          color: #DC2626;
          border-color: #FECACA;
        }
        .suspend-btn:hover {
          background-color: #FEF2F2;
          color: #B91C1C;
        }

        /* Spacious Table View */
        .admin-table-wrap {
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          overflow-x: auto;
        }

        .spacious-admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .spacious-admin-table thead th {
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

        .spacious-admin-table tbody tr {
          border-bottom: 1px solid var(--border-subtle);
          transition: background-color 0.15s ease;
        }

        .spacious-admin-table tbody tr:hover {
          background-color: #F9FBF9;
        }

        .spacious-admin-table tbody td {
          padding: 1.25rem 1.35rem;
          vertical-align: middle;
        }

        .tbl-profile-flex {
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

        .tbl-name-col {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .tbl-name {
          font-size: 0.96rem;
          font-weight: 700;
          color: var(--dark-green);
        }

        .tbl-id {
          font-size: 0.72rem;
          font-family: monospace;
          color: var(--text-light);
        }

        .tbl-meta-flex {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .tbl-college {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 600;
          color: var(--text-dark);
        }

        .tbl-contact-line {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .tbl-courses-tags {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .tbl-date {
          font-size: 0.84rem;
          color: var(--text-muted);
        }

        .tbl-actions-flex {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        /* Empty State */
        .empty-state-card {
          padding: 4rem 2rem;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
        }

        .empty-icon {
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

        .empty-text {
          font-size: 0.92rem;
          color: var(--text-muted);
          max-width: 420px;
          margin: 0 auto 1.5rem;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .admin-kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .admin-students-page { padding: 1.25rem 1rem; }
          .admin-page-header {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.5rem 1.25rem;
            gap: 1.25rem;
          }
          .header-actions-row {
            width: 100%;
          }
          .view-toggle-pill {
            width: 100%;
            justify-content: center;
          }
          .view-toggle-btn {
            flex: 1;
            justify-content: center;
          }
          .admin-kpi-grid {
            grid-template-columns: 1fr;
          }
          .controls-search-row {
            flex-direction: column;
            align-items: stretch;
          }
          .filter-dropdowns-wrap {
            flex-direction: column;
            align-items: stretch;
          }
          .filter-dropdown {
            width: 100%;
          }
          .admin-students-grid {
            grid-template-columns: 1fr;
          }
          .spacious-admin-table {
            min-width: 780px;
          }
        }

        @media (max-width: 640px) {
          .admin-students-page {
            padding: 1rem 0.85rem;
            gap: 1.25rem;
          }

          .admin-page-title {
            font-size: 1.45rem;
          }

          .admin-student-card {
            padding: 1.25rem 1rem;
          }

          .controls-bottom-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .status-pills-list {
            gap: 0.35rem;
          }

          .filter-pill {
            padding: 0.4rem 0.75rem;
            font-size: 0.8rem;
          }

          .card-footer-row {
            flex-direction: column;
            align-items: stretch;
            gap: 0.75rem;
          }

          .access-action-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};
