import React, { useState } from 'react';
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
  Phone
} from 'lucide-react';

export const AdminStudentsPage: React.FC = () => {
  const { students, enrollments, updateStudentStatus } = useCourseData();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [courseFilter, setCourseFilter] = useState<string>('All');

  // Match students with their verified enrollment courses
  const studentsWithCourses = students.map((student) => {
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

  const filteredStudents = studentsWithCourses.filter((s) => {
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
      if (!matchName && !matchEmail && !matchId && !matchCollege) return false;
    }

    return true;
  });

  const activeCount = students.filter(s => s.status === 'Active').length;
  const pendingCount = students.filter(s => s.status === 'Pending').length;

  return (
    <div className="admin-students-page">
      {/* Header Banner */}
      <div className="page-header-row bio-card">
        <div>
          <span className="admin-pill-badge">
            <Users size={13} /> Student Directory
          </span>
          <h1 className="page-title">Enrolled Students & Course Allocation</h1>
          <p className="page-subtitle">
            View all registered student accounts, their assigned course access, and activation statuses.
          </p>
        </div>

        <div className="stats-pill-group">
          <span className="stat-pill green">
            <CheckCircle2 size={14} /> {activeCount} Active Access
          </span>
          <span className="stat-pill amber">
            <Clock size={14} /> {pendingCount} Pending Access
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="admin-controls-card bio-card">
        <div className="filters-search-row">
          <div className="search-input-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by student name, email, ID, or college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input search-input"
            />
          </div>

          <div className="select-filter-wrap">
            <Filter size={15} className="filter-icon" />
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="form-select filter-select"
            >
              <option value="All">All Courses</option>
              <option value="Alpha">Alpha Cohort (HSC Biology)</option>
              <option value="SSC">SSC 2027 Model Test Package</option>
            </select>
          </div>

          <div className="select-filter-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select filter-select"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active (Access Granted)</option>
              <option value="Pending">Pending Verification</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="admin-records-container bio-card">
        <div className="enrollments-table-wrap">
          <table className="enrollments-table">
            <thead>
              <tr>
                <th>Student ID & Name</th>
                <th>Institution</th>
                <th>Contact Info</th>
                <th>Authorized Courses</th>
                <th>Enrollment Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  {/* ID & Name */}
                  <td>
                    <div className="student-profile-cell">
                      <div className="student-avatar-badge">
                        {student.name.charAt(0)}
                      </div>
                      <div className="student-meta-col">
                        <strong className="student-name-text">{student.name}</strong>
                        <span className="student-id-sub">{student.studentId || 'ID Pending'}</span>
                      </div>
                    </div>
                  </td>

                  {/* Institution */}
                  <td>
                    <span className="student-college-text">
                      {student.institution || student.college || 'Not specified'}
                    </span>
                  </td>

                  {/* Contact */}
                  <td>
                    <div className="student-contact-col">
                      <span className="c-item"><Mail size={12} /> {student.email}</span>
                      <span className="c-item"><Phone size={12} /> {student.phone}</span>
                    </div>
                  </td>

                  {/* Authorized Courses */}
                  <td>
                    <div className="courses-tags-cluster">
                      {student.verifiedCourses.map((c, i) => (
                        <span 
                          key={i} 
                          className={`course-badge-pill ${c.toLowerCase().includes('ssc') ? 'ssc-2027' : 'alpha-cohort'}`}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Enrollment Date */}
                  <td>
                    <span className="date-sub">{student.enrollmentDate || 'Recent'}</span>
                  </td>

                  {/* Status */}
                  <td>
                    <span className={`status-badge ${student.status.toLowerCase()}`}>
                      {student.status === 'Active' ? 'Active' : 'Pending Verification'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="text-right">
                    {student.status === 'Pending' ? (
                      <button
                        type="button"
                        onClick={() => updateStudentStatus(student.id, 'Active')}
                        className="btn btn-primary btn-sm"
                      >
                        Activate
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => updateStudentStatus(student.id, 'Pending')}
                        className="btn btn-outline btn-sm btn-revoke"
                      >
                        Suspend
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .admin-students-page {
          padding: 1.75rem 2rem;
          max-width: 1300px;
          margin: 0 auto;
        }

        .stats-pill-group {
          display: flex;
          gap: 0.65rem;
        }

        .stat-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.35rem 0.8rem;
          border-radius: var(--radius-full);
        }

        .stat-pill.green { background: #EAF8EE; color: #15803D; }
        .stat-pill.amber { background: #FEF7E6; color: #B45309; }

        .student-id-sub {
          font-size: 0.72rem;
          color: var(--text-light);
          font-family: monospace;
        }

        .student-contact-col {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .c-item {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .courses-tags-cluster {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .date-sub {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        @media (max-width: 640px) {
          .admin-students-page { padding: 1.25rem 1rem; }
        }
      `}</style>
    </div>
  );
};
