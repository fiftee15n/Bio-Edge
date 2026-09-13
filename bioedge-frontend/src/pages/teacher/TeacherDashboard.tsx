import React from 'react';
import { Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  FileCheck2, 
  TrendingUp, 
  MessageSquare, 
  Plus, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Award
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { 
    course, 
    teacher, 
    students, 
    classes, 
    tests, 
    feedbacks, 
    availableSeats, 
    activeStudentsCount,
    completedClassesCount,
    totalClassesCount
  } = useCourseData();

  const nextUpcomingClass = classes.find(c => c.status === 'Upcoming') || classes[0];

  return (
    <div className="teacher-dashboard-page">
      {/* Welcome Banner */}
      <div className="teacher-welcome-banner bio-card">
        <div className="t-wel-left">
          <span className="badge badge-amber">Faculty Control Center</span>
          <h1 className="t-wel-title">Welcome back, {teacher.name}</h1>
          <p className="t-wel-sub">
            {course.title} • {course.batchName} Management Dashboard
          </p>
        </div>

        <div className="t-wel-actions">
          <Link to="/teacher/classes" className="btn btn-primary btn-sm">
            <Plus size={16} /> Schedule Class
          </Link>
          <Link to="/teacher/tests/create" className="btn btn-secondary btn-sm">
            <Plus size={16} /> Create Test
          </Link>
          <Link to="/teacher/feedback" className="btn btn-outline btn-sm">
            <MessageSquare size={16} /> Post Feedback
          </Link>
        </div>
      </div>

      {/* 23. Key Metrics Cards Grid */}
      <div className="teacher-kpi-grid">
        <div className="kpi-card bio-card">
          <div className="kpi-top">
            <span className="kpi-label">Cohort Enrollment</span>
            <Users size={18} className="kpi-icon green" />
          </div>
          <strong className="kpi-val">{activeStudentsCount} / {course.seatLimit}</strong>
          <span className="kpi-sub highlight">{availableSeats} Seats Available</span>
        </div>

        <div className="kpi-card bio-card">
          <div className="kpi-top">
            <span className="kpi-label">Class Progress</span>
            <Calendar size={18} className="kpi-icon dark" />
          </div>
          <strong className="kpi-val">{completedClassesCount} / {totalClassesCount}</strong>
          <span className="kpi-sub">{Math.max(0, totalClassesCount - completedClassesCount)} Classes Remaining</span>
        </div>

        <div className="kpi-card bio-card">
          <div className="kpi-top">
            <span className="kpi-label">Tests Conducted</span>
            <FileCheck2 size={18} className="kpi-icon amber" />
          </div>
          <strong className="kpi-val">{tests.length} Active</strong>
          <span className="kpi-sub">MCQ, CQ & Model Tests</span>
        </div>

        <div className="kpi-card bio-card">
          <div className="kpi-top">
            <span className="kpi-label">Batch Average</span>
            <TrendingUp size={18} className="kpi-icon green" />
          </div>
          <strong className="kpi-val">84.6%</strong>
          <span className="kpi-sub">High Distinction Average</span>
        </div>
      </div>

      {/* Middle Grid: Next Session Manager + Enrolled Students Preview */}
      <div className="teacher-mid-grid">
        {/* Next Class Spotlight Manager */}
        <div className="next-session-manager-card bio-card">
          <div className="card-top-title-row">
            <h3 className="section-title-sm">Next Scheduled Session</h3>
            <span className="badge badge-green">Upcoming Live</span>
          </div>

          <div className="session-details-block">
            <span className="session-paper-badge">{nextUpcomingClass?.paper}</span>
            <h4 className="session-title">{nextUpcomingClass?.title}</h4>
            <p className="session-meta">
              <strong>Chapter:</strong> {nextUpcomingClass?.chapterName} • <strong>Topic:</strong> {nextUpcomingClass?.topic}
            </p>
          </div>

          <div className="session-timing-bar">
            <div className="t-bar-item">
              <Calendar size={15} className="t-icon" />
              <span>{nextUpcomingClass?.date} ({nextUpcomingClass?.day})</span>
            </div>
            <div className="t-bar-item">
              <Clock size={15} className="t-icon" />
              <span>{nextUpcomingClass?.time}</span>
            </div>
          </div>

          <div className="session-actions-row">
            <a 
              href={nextUpcomingClass?.meetLink || "#"} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-primary btn-sm flex-1"
            >
              Start Class Meet Link
            </a>
            <Link to="/teacher/classes" className="btn btn-outline btn-sm">
              Edit / Reschedule
            </Link>
          </div>
        </div>

        {/* Quick Student Roster Alert */}
        <div className="student-roster-summary-card bio-card">
          <div className="card-top-title-row">
            <h3 className="section-title-sm">Recent Student Activity</h3>
            <Link to="/teacher/students" className="link-sm">View All ({students.length})</Link>
          </div>

          <div className="mini-students-table">
            {students.slice(0, 4).map((std) => (
              <div key={std.id} className="mini-student-row">
                <div className="mini-std-avatar">{std.name.charAt(0)}</div>
                <div className="mini-std-meta">
                  <h5 className="mini-std-name">{std.name}</h5>
                  <span className="mini-std-id">{std.studentId} • {std.college || "Notre Dame College"}</span>
                </div>
                <div className="mini-std-score">
                  <strong>{std.averageScore}%</strong>
                  <span className="mini-prog">{std.courseProgress}% progress</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="quick-management-hub bio-card">
        <h3 className="section-title-sm mb-3">Management Shortcuts</h3>
        <div className="hub-buttons-grid">
          <Link to="/teacher/chapters" className="hub-btn">
            <BookOpen size={20} />
            <div>
              <strong>Manage Curriculum</strong>
              <p>Add/edit 1st & 2nd paper chapters and topics</p>
            </div>
          </Link>

          <Link to="/teacher/questions" className="hub-btn">
            <FileCheck2 size={20} />
            <div>
              <strong>Question Bank</strong>
              <p>Add MCQ options and CQ marking rubrics</p>
            </div>
          </Link>

          <Link to="/teacher/pricing" className="hub-btn">
            <Award size={20} />
            <div>
              <strong>Pricing & Capacity</strong>
              <p>Update fees and batch seat thresholds</p>
            </div>
          </Link>

          <Link to="/teacher/results" className="hub-btn">
            <TrendingUp size={20} />
            <div>
              <strong>Results & Evaluation</strong>
              <p>Grade written CQ submissions</p>
            </div>
          </Link>
        </div>
      </div>

      <style>{`
        .teacher-dashboard-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .teacher-welcome-banner {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          background: linear-gradient(135deg, #FAF6ED 0%, #FFFFFF 100%);
          border-color: #E8DECE;
        }
        .t-wel-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.2rem;
        }
        .t-wel-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .t-wel-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .teacher-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        .kpi-card {
          padding: 1.75rem;
        }
        .kpi-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .kpi-label {
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .kpi-icon.green { color: var(--primary-green); }
        .kpi-icon.amber { color: #B45309; }
        .kpi-icon.dark { color: var(--dark-green); }
        .kpi-val {
          font-size: 1.85rem;
          color: var(--dark-green);
          display: block;
          font-family: var(--font-heading);
          line-height: 1.1;
          margin-bottom: 0.25rem;
        }
        .kpi-sub {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .kpi-sub.highlight {
          color: #B45309;
          font-weight: 600;
        }

        .teacher-mid-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 1.75rem;
        }
        .card-top-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .section-title-sm {
          font-size: 1.15rem;
          color: var(--dark-green);
        }
        .link-sm {
          font-size: 0.82rem;
          color: var(--primary-green);
          font-weight: 600;
        }
        .link-sm:hover {
          color: var(--dark-green);
        }

        .next-session-manager-card, .student-roster-summary-card {
          padding: 2rem;
        }
        .session-details-block {
          margin-bottom: 1.25rem;
        }
        .session-paper-badge {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
        }
        .session-title {
          font-size: 1.1rem;
          color: var(--text-dark);
          margin: 0.25rem 0 0.4rem;
        }
        .session-meta {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .session-timing-bar {
          background: var(--light-green-subtle);
          border-radius: var(--radius-md);
          padding: 0.75rem 1rem;
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          font-size: 0.82rem;
        }
        .t-bar-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .session-actions-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .flex-1 { flex: 1; }

        .mini-students-table {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .mini-student-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.65rem 0.85rem;
          background: var(--light-green-subtle);
          border-radius: var(--radius-md);
        }
        .mini-std-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        .mini-std-meta {
          flex: 1;
        }
        .mini-std-name {
          font-size: 0.88rem;
          color: var(--text-dark);
        }
        .mini-std-id {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .mini-std-score {
          text-align: right;
        }
        .mini-std-score strong {
          display: block;
          font-size: 0.95rem;
          color: var(--dark-green);
        }
        .mini-prog {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .quick-management-hub {
          padding: 2rem;
        }
        .mb-3 { margin-bottom: 1.25rem; }
        .hub-buttons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1rem;
        }
        .hub-btn {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          padding: 1.25rem;
          background: var(--light-green-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-dark);
          transition: all 0.2s ease;
        }
        .hub-btn:hover {
          background: var(--light-green);
          border-color: var(--primary-green);
          transform: translateY(-1px);
        }
        .hub-btn strong {
          font-size: 0.95rem;
          color: var(--dark-green);
          display: block;
          margin-bottom: 0.2rem;
        }
        .hub-btn p {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        @media (max-width: 850px) {
          .teacher-mid-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .teacher-welcome-banner {
            padding: 1.25rem 1rem;
          }
          .t-wel-actions {
            width: 100%;
          }
          .t-wel-actions .btn {
            flex: 1;
            justify-content: center;
          }
          .teacher-kpi-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .kpi-card {
            padding: 1.25rem 1rem;
          }
          .quick-management-hub {
            padding: 1.25rem 1rem;
          }
          .hub-buttons-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
