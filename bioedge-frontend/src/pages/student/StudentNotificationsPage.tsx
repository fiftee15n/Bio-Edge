import React from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  Bell, 
  Calendar, 
  Target, 
  MessageSquare, 
  FileText, 
  CheckCircle2 
} from 'lucide-react';

export const StudentNotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead } = useCourseData();

  const getIcon = (type: string) => {
    switch (type) {
      case 'class': return Calendar;
      case 'test': return Target;
      case 'feedback': return MessageSquare;
      default: return FileText;
    }
  };

  return (
    <div className="student-notifications-page">
      <div className="notif-hero-card bio-card">
        <div>
          <span className="badge badge-green">Alert Center</span>
          <h1 className="notif-title">Academic Notifications</h1>
          <p className="notif-sub">
            Real-time updates regarding class schedules, test releases, and feedback postings.
          </p>
        </div>
      </div>

      <div className="notifications-list">
        {notifications.map((notif) => {
          const Icon = getIcon(notif.type);
          return (
            <div 
              key={notif.id} 
              className={`notif-item-card bio-card ${notif.read ? 'read' : 'unread'}`}
              onClick={() => markNotificationRead(notif.id)}
            >
              <div className="notif-icon-circle">
                <Icon size={18} />
              </div>

              <div className="notif-body">
                <div className="notif-header-row">
                  <h3 className="notif-item-title">{notif.title}</h3>
                  <span className="notif-time">{notif.date}</span>
                </div>
                <p className="notif-message-text">{notif.message}</p>
              </div>

              {!notif.read && (
                <span className="unread-dot-badge" title="Unread notification"></span>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .student-notifications-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 860px;
          margin: 0 auto;
        }
        .notif-hero-card {
          padding: 2.25rem;
        }
        .notif-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .notif-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .notif-item-card {
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          cursor: pointer;
          transition: all 0.15s ease;
          position: relative;
        }
        .notif-item-card.unread {
          background: #FFFFFF;
          border-color: var(--primary-green);
          box-shadow: var(--shadow-sm);
        }
        .notif-item-card.read {
          background: var(--light-green-subtle);
          border-color: var(--border-subtle);
          opacity: 0.85;
        }
        .notif-icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--light-green);
          color: var(--dark-green);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .notif-body {
          flex: 1;
        }
        .notif-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.35rem;
        }
        .notif-item-title {
          font-size: 1rem;
          color: var(--dark-green);
          font-weight: 700;
        }
        .notif-time {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .notif-message-text {
          font-size: 0.88rem;
          color: var(--text-dark);
          line-height: 1.5;
        }
        .unread-dot-badge {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary-green);
          align-self: center;
        }

        @media (max-width: 600px) {
          .notif-hero-card {
            padding: 1.25rem 1rem;
          }
          .notif-item-card {
            padding: 1rem 0.85rem;
            gap: 0.75rem;
          }
          .notif-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.2rem;
          }
        }
      `}</style>
    </div>
  );
};
