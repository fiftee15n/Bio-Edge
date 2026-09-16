import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCourseData } from '../../context/CourseDataContext';
import { ProgressBar } from '../../components/common/ProgressBar';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Target, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  ChevronRight, 
  Video,
  FileText,
  AlertCircle
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { 
    course, 
    papers, 
    classes, 
    tests, 
    feedbacks, 
    nextClass,
    completedClassesCount,
    totalClassesCount,
    overallProgressPercentage
  } = useCourseData();

  // Dynamic progress stats
  const totalChaptersCount = papers.reduce((acc, p) => acc + p.chapters.length, 0);
  const completedChaptersCount = papers.reduce((acc, p) => acc + p.chapters.filter(c => c.status === 'Completed').length, 0);
  const remainingChaptersCount = Math.max(0, totalChaptersCount - completedChaptersCount);

  const completedTestsCount = tests.filter(t => t.status === 'Completed').length;
  const remainingTestsCount = tests.filter(t => t.status !== 'Completed').length;

  const firstPaper = papers.find(p => p.id === 'first-paper') || papers[0];
  const secondPaper = papers.find(p => p.id === 'second-paper') || papers[1];

  const recentFeedback = feedbacks[0];

  return (
    <div className="student-dashboard-page">
      {/* 9.1 Dashboard Greeting Header */}
      <div className="dashboard-welcome-header bio-card">
        <div className="welcome-left">
          <div className="welcome-greeting-row">
            <h1 className="welcome-title">Good Morning, {user?.name || "Student"}</h1>
            <span className="badge badge-green active-pill">
              <span className="dot"></span> Active Enrollment
            </span>
          </div>
          <p className="welcome-course-name">{course.title} • {course.batchName}</p>
        </div>
        <div className="welcome-right">
          <Link to="/student/practice" className="btn btn-primary btn-sm">
            <Target size={16} /> Start Practice
          </Link>
          <Link to="/student/classes" className="btn btn-secondary btn-sm">
            <Calendar size={16} /> View Schedule
          </Link>
        </div>
      </div>

      {/* Main Dashboard Top Grid (Progress + Next Class) */}
      <div className="dashboard-top-grid">
        {/* 9.2 Overall Progress Card */}
        <div className="overall-progress-card bio-card">
          <div className="dash-card-header">
            <span className="dash-card-badge">Academic Milestones</span>
            <span className="progress-num-big">{overallProgressPercentage}%</span>
          </div>
          <h3 className="dash-card-title">Overall Course Progress</h3>

          <div className="main-progress-bar-wrap">
            <ProgressBar progress={overallProgressPercentage} height={10} variant="dark" />
          </div>

          <div className="progress-stats-triplet">
            <div className="p-stat-box">
              <span className="p-stat-label">Classes</span>
              <strong className="p-stat-val">{completedClassesCount} / {totalClassesCount}</strong>
              <span className="p-stat-sub">{Math.max(0, totalClassesCount - completedClassesCount)} Remaining</span>
            </div>

            <div className="p-stat-box">
              <span className="p-stat-label">Tests</span>
              <strong className="p-stat-val">{completedTestsCount} Done</strong>
              <span className="p-stat-sub">{remainingTestsCount} Pending</span>
            </div>

            <div className="p-stat-box">
              <span className="p-stat-label">Chapters</span>
              <strong className="p-stat-val">{completedChaptersCount} / {totalChaptersCount}</strong>
              <span className="p-stat-sub">{remainingChaptersCount} Remaining</span>
            </div>
          </div>
        </div>

        {/* 9.3 Next Scheduled Class Card */}
        <div className="next-class-card bio-card">
          <div className="dash-card-header">
            <span className="badge badge-green">
              <Clock size={13} /> Upcoming Live Session
            </span>
            <span className="next-class-badge">Class {nextClass?.classNumber || 18}</span>
          </div>

          <div className="next-class-meta">
            <span className="next-paper-tag">{nextClass?.paper}</span>
            <h3 className="next-class-title">{nextClass?.title}</h3>
            <p className="next-class-topic">
              <strong>Chapter:</strong> {nextClass?.chapterName} • <strong>Topic:</strong> {nextClass?.topic}
            </p>
          </div>

          <div className="next-class-timing-box">
            <div className="timing-cell">
              <Calendar size={16} className="t-icon" />
              <span>{nextClass?.date} ({nextClass?.day})</span>
            </div>
            <div className="timing-cell">
              <Clock size={16} className="t-icon" />
              <span>{nextClass?.time}</span>
            </div>
          </div>

          <div className="next-class-actions">
            <a 
              href={nextClass?.meetLink || "#"} 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-primary btn-block"
            >
              <Video size={16} /> Enter Live Google Meet
            </a>
          </div>
        </div>
      </div>

      {/* Middle Grid: Upcoming Schedule + Recent Feedback */}
      <div className="dashboard-middle-grid">
        {/* 9.4 Upcoming Schedule */}
        <div className="upcoming-schedule-card bio-card">
          <div className="dash-card-header">
            <h3 className="dash-card-title">Upcoming Schedule Timeline</h3>
            <Link to="/student/classes" className="view-all-link">
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div className="schedule-timeline-list">
            {classes.filter(c => c.status === 'Upcoming').slice(0, 3).map((item) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                </div>
                <div className="timeline-body">
                  <div className="timeline-top">
                    <span className="tl-type badge badge-green">Live Class</span>
                    <span className="tl-time">{item.date} • {item.time}</span>
                  </div>
                  <h4 className="tl-title">{item.title}</h4>
                  <p className="tl-sub">{item.paper} • {item.chapterName}</p>
                </div>
              </div>
            ))}

            {/* Test Event */}
            <div className="timeline-item">
              <div className="timeline-marker">
                <div className="timeline-dot test-dot"></div>
              </div>
              <div className="timeline-body">
                <div className="timeline-top">
                  <span className="tl-type badge badge-amber">Chapter Test</span>
                  <span className="tl-time">Upcoming Sunday</span>
                </div>
                <h4 className="tl-title">Chapter 04 MCQ Intensive Quiz</h4>
                <p className="tl-sub">15 Questions • 20 Mins</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Teacher Feedback Widget */}
        <div className="recent-feedback-widget bio-card">
          <div className="dash-card-header">
            <h3 className="dash-card-title">Recent Teacher Feedback</h3>
            <Link to="/student/feedback" className="view-all-link">
              All Feedback <ChevronRight size={14} />
            </Link>
          </div>

          {recentFeedback ? (
            <div className="feedback-snippet-box">
              <div className="fb-tag-row">
                <span className="badge badge-amber">{recentFeedback.category} Focus</span>
                <span className="fb-date">{recentFeedback.date}</span>
              </div>
              <h4 className="fb-title">{recentFeedback.title}</h4>
              <p className="fb-message">"{recentFeedback.message}"</p>
              <div className="fb-author-row">
                <div className="fb-author-avatar">
                  <img 
                    src="/assets/hero/teacher_afroza_card.jpg" 
                    alt={recentFeedback.teacherName} 
                    className="fb-avatar-img" 
                  />
                </div>
                <div>
                  <span className="fb-author-name">{recentFeedback.teacherName}</span>
                  <span className="fb-target">Target: {recentFeedback.attachedTo}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="empty-fb-text">No feedback received yet.</p>
          )}

          <div className="pending-tests-prompt">
            <div className="prompt-left">
              <Target size={20} className="prompt-icon" />
              <div>
                <strong>Recommended Next Action</strong>
                <p>Complete Chapter 04 MCQ Test to calibrate your accuracy.</p>
              </div>
            </div>
            <Link to="/student/practice/test-02" className="btn btn-outline btn-sm">
              Start Test
            </Link>
          </div>
        </div>
      </div>

      {/* 9.5 Chapter Progress Section */}
      <div className="dashboard-chapters-section bio-card">
        <div className="dash-card-header">
          <div>
            <h3 className="dash-card-title">Chapter Completion Progress</h3>
            <p className="dash-card-sub">Track syllabus coverage across First and Second Paper</p>
          </div>
          <Link to="/student/course" className="btn btn-outline btn-sm">
            Explore Full Curriculum <ArrowRight size={14} />
          </Link>
        </div>

        <div className="papers-progress-split-grid">
          {/* First Paper Progress List */}
          <div className="paper-ch-column">
            <div className="ch-col-header">
              <BookOpen size={18} className="col-icon" />
              <h4>{firstPaper.name}</h4>
            </div>

            <div className="ch-items-list">
              {firstPaper.chapters.slice(0, 5).map((ch) => (
                <div key={ch.id} className="ch-progress-item">
                  <div className="ch-p-row">
                    <span className="ch-label">Chapter {ch.number}: {ch.name}</span>
                    <span className={`badge ${ch.status === 'Completed' ? 'badge-green' : ch.status === 'In Progress' ? 'badge-amber' : 'badge-gray'}`}>
                      {ch.progress}% {ch.status}
                    </span>
                  </div>
                  <ProgressBar progress={ch.progress} height={6} />
                </div>
              ))}
            </div>
          </div>

          {/* Second Paper Progress List */}
          <div className="paper-ch-column">
            <div className="ch-col-header">
              <BookOpen size={18} className="col-icon" />
              <h4>{secondPaper.name}</h4>
            </div>

            <div className="ch-items-list">
              {secondPaper.chapters.slice(0, 5).map((ch) => (
                <div key={ch.id} className="ch-progress-item">
                  <div className="ch-p-row">
                    <span className="ch-label">Chapter {ch.number}: {ch.name}</span>
                    <span className={`badge ${ch.status === 'Completed' ? 'badge-green' : ch.status === 'In Progress' ? 'badge-amber' : 'badge-gray'}`}>
                      {ch.progress}% {ch.status}
                    </span>
                  </div>
                  <ProgressBar progress={ch.progress} height={6} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .student-dashboard-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* 9.1 Welcome Header */
        .dashboard-welcome-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.75rem 2rem;
          background: linear-gradient(135deg, #FFFFFF 0%, #FAFDFB 100%);
        }
        .welcome-greeting-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 0.35rem;
        }
        .welcome-title {
          font-size: 1.65rem;
          color: var(--dark-green);
        }
        .active-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }
        .active-pill .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--success);
        }
        .welcome-course-name {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .welcome-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        /* Dashboard Top Grid */
        .dashboard-top-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 1.75rem;
        }
        .dash-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }
        .dash-card-badge {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--primary-green);
        }
        .progress-num-big {
          font-size: 1.75rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--dark-green);
        }
        .dash-card-title {
          font-size: 1.2rem;
          color: var(--dark-green);
          margin-bottom: 0.25rem;
        }
        .dash-card-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .main-progress-bar-wrap {
          margin: 1rem 0 1.5rem;
        }
        .progress-stats-triplet {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        .p-stat-box {
          background: var(--light-green-subtle);
          border: 1px solid var(--border-subtle);
          padding: 0.75rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
        }
        .p-stat-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
        }
        .p-stat-val {
          font-size: 1.05rem;
          color: var(--dark-green);
          margin: 0.15rem 0;
        }
        .p-stat-sub {
          font-size: 0.72rem;
          color: var(--primary-green);
          font-weight: 500;
        }

        /* Next Class Card */
        .next-class-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .next-class-badge {
          background: var(--dark-green);
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
        }
        .next-paper-tag {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--primary-green);
        }
        .next-class-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-dark);
          margin: 0.25rem 0 0.4rem;
        }
        .next-class-topic {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .next-class-timing-box {
          background: var(--light-green-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 1rem 0;
          font-size: 0.82rem;
          color: var(--text-dark);
        }
        .timing-cell {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .t-icon {
          color: var(--primary-green);
        }

        /* Middle Grid */
        .dashboard-middle-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.75rem;
        }
        .view-all-link {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.82rem;
          color: var(--primary-green);
          font-weight: 600;
        }
        .view-all-link:hover {
          color: var(--dark-green);
        }

        /* Timeline */
        .schedule-timeline-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 1rem;
        }
        .timeline-item {
          display: flex;
          gap: 1rem;
        }
        .timeline-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .timeline-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--primary-green);
          margin-top: 0.35rem;
        }
        .test-dot {
          background: var(--warning);
        }
        .timeline-body {
          flex: 1;
        }
        .timeline-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.25rem;
        }
        .tl-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .tl-title {
          font-size: 0.95rem;
          color: var(--text-dark);
          font-weight: 600;
        }
        .tl-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        /* Feedback Widget */
        .feedback-snippet-box {
          background: var(--light-green-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          margin: 0.75rem 0 1.25rem;
        }
        .fb-tag-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .fb-date {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .fb-title {
          font-size: 0.95rem;
          color: var(--dark-green);
          margin-bottom: 0.35rem;
        }
        .fb-message {
          font-size: 0.85rem;
          color: var(--text-dark);
          font-style: italic;
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        .fb-author-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          border-top: 1px solid var(--border-subtle);
          padding-top: 0.6rem;
        }
        .fb-author-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--dark-green);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          overflow: hidden;
        }
        .fb-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }
        .fb-author-name {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--dark-green);
        }
        .fb-target {
          display: block;
          font-size: 0.7rem;
          color: var(--text-muted);
        }
        .pending-tests-prompt {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #FFFFFF;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0.85rem 1rem;
        }
        .prompt-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .prompt-icon {
          color: var(--warning);
          flex-shrink: 0;
        }
        .prompt-left strong {
          display: block;
          font-size: 0.82rem;
          color: var(--text-dark);
        }
        .prompt-left p {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Chapters Section */
        .papers-progress-split-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 1.5rem;
        }
        .paper-ch-column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .ch-col-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .col-icon {
          color: var(--primary-green);
        }
        .ch-col-header h4 {
          font-size: 1.05rem;
          color: var(--dark-green);
        }
        .ch-items-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .ch-progress-item {
          background: var(--light-green-subtle);
          border: 1px solid var(--border-subtle);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
        }
        .ch-p-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.4rem;
        }
        .ch-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-dark);
        }

        @media (max-width: 900px) {
          .dashboard-welcome-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .dashboard-top-grid {
            grid-template-columns: 1fr;
          }
          .dashboard-middle-grid {
            grid-template-columns: 1fr;
          }
          .papers-progress-split-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .dashboard-welcome-header {
            padding: 1.25rem 1rem;
          }
          .welcome-title {
            font-size: 1.35rem;
          }
          .progress-stats-triplet {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
          .welcome-right {
            flex-wrap: wrap;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
