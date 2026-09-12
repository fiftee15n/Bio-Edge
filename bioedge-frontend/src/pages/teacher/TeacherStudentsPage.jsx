import React, { useState } from 'react';
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
  Clock
} from 'lucide-react';

export const TeacherStudentsPage = () => {
  const { students, updateStudentStatus, course, availableSeats } = useCourseData();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredStudents = students.filter(s => {
    const matchStatus = statusFilter === 'all' || s.status.toLowerCase() === statusFilter.toLowerCase();
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
      s.studentId.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="teacher-students-page">
      {/* Header */}
      <div className="students-head-card bio-card">
        <div>
          <span className="badge badge-amber">Roster Management</span>
          <h1 className="s-head-title">Enrolled Students Directory</h1>
          <p className="s-head-sub">
            {students.length} Total Enrolled Students • {availableSeats} Available Seats in {course.batchName}
          </p>
        </div>

        <div className="s-head-filters">
          <div className="search-wrap">
            <Search size={16} className="s-icon" />
            <input
              type="text"
              placeholder="Search student name, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="table-container">
        <table className="bio-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Student ID</th>
              <th>Enrollment Date</th>
              <th>Course Progress</th>
              <th>Avg Score</th>
              <th>Last Active</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((std) => (
              <tr key={std.id}>
                <td>
                  <div className="std-cell-profile">
                    <div className="std-table-avatar">{std.name.charAt(0)}</div>
                    <div>
                      <strong className="std-table-name">{std.name}</strong>
                      <span className="std-table-email">{std.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="std-id-badge">{std.studentId}</span>
                </td>
                <td>
                  <span className="std-date">{std.enrollmentDate}</span>
                </td>
                <td style={{ minWidth: '140px' }}>
                  <div className="prog-cell">
                    <span>{std.courseProgress}%</span>
                    <ProgressBar progress={std.courseProgress} height={6} />
                  </div>
                </td>
                <td>
                  <strong className="score-cell-text">{std.averageScore}%</strong>
                </td>
                <td>
                  <span className="last-active-text">{std.lastActive}</span>
                </td>
                <td>
                  <select
                    value={std.status}
                    onChange={(e) => updateStudentStatus(std.id, e.target.value)}
                    className="form-select status-select-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </td>
                <td>
                  <Link to={`/teacher/students/${std.id}`} className="btn btn-ghost btn-sm">
                    Dossier <ExternalLink size={13} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .teacher-students-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .students-head-card {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .s-head-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .s-head-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .s-head-filters {
          display: flex;
          align-items: center;
          gap: 0.75rem;
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
        .search-input {
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.88rem;
          width: 200px;
        }
        .filter-select {
          padding: 0.5rem 0.85rem;
          font-size: 0.88rem;
        }

        .std-cell-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .std-table-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
        }
        .std-table-name {
          font-size: 0.9rem;
          color: var(--text-dark);
          display: block;
        }
        .std-table-email {
          font-size: 0.75rem;
          color: var(--text-muted);
          display: block;
        }
        .std-id-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
        }
        .std-date {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .prog-cell {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: var(--dark-green);
          font-weight: 600;
        }
        .score-cell-text {
          font-size: 0.95rem;
          color: var(--dark-green);
        }
        .last-active-text {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .status-select-sm {
          padding: 0.35rem 0.65rem;
          font-size: 0.8rem;
          border-radius: var(--radius-sm);
        }
      `}</style>
    </div>
  );
};
