import React, { useState } from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { Modal } from '../../components/common/Modal';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit3, 
  Trash2, 
  Video, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';

export const TeacherClassesPage = () => {
  const { classes, addClass, updateClass, deleteClass, papers, teacher } = useCourseData();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    title: '',
    paper: 'Biology First Paper',
    chapterName: 'Chapter 05: Algae and Fungi',
    topic: '',
    date: '2026-09-24',
    time: '7:00 PM – 8:30 PM',
    day: 'Thursday',
    meetLink: 'https://meet.bioedge.edu/live-session'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addClass(newClass);
    setIsAddModalOpen(false);
    setNewClass({
      title: '',
      paper: 'Biology First Paper',
      chapterName: 'Chapter 05: Algae and Fungi',
      topic: '',
      date: '2026-09-24',
      time: '7:00 PM – 8:30 PM',
      day: 'Thursday',
      meetLink: 'https://meet.bioedge.edu/live-session'
    });
  };

  return (
    <div className="teacher-classes-page">
      {/* Header */}
      <div className="classes-admin-header bio-card">
        <div>
          <span className="badge badge-amber">Class Management</span>
          <h1 className="admin-cls-title">Live Classes & Timetable</h1>
          <p className="admin-cls-sub">
            {classes.length} Total Classes • Schedule live Google Meet links, topics, and completion states.
          </p>
        </div>

        <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary btn-sm">
          <Plus size={16} /> Schedule New Class
        </button>
      </div>

      {/* Classes Table */}
      <div className="table-container">
        <table className="bio-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Paper & Chapter</th>
              <th>Topic</th>
              <th>Date & Day</th>
              <th>Timing</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id}>
                <td>
                  <span className="cls-number-tag">Class {cls.classNumber}</span>
                </td>
                <td>
                  <strong className="table-paper-strong">{cls.paper}</strong>
                  <span className="table-ch-span">{cls.chapterName}</span>
                </td>
                <td>
                  <span className="table-topic-text">{cls.topic}</span>
                </td>
                <td>
                  <div className="table-date-cell">
                    <Calendar size={13} className="t-icon" />
                    <span>{cls.date} ({cls.day})</span>
                  </div>
                </td>
                <td>
                  <div className="table-date-cell">
                    <Clock size={13} className="t-icon" />
                    <span>{cls.time}</span>
                  </div>
                </td>
                <td>
                  <select
                    value={cls.status}
                    onChange={(e) => updateClass(cls.id, { status: e.target.value })}
                    className="form-select status-select-sm"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                    <option value="Rescheduled">Rescheduled</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete Class ${cls.classNumber}: ${cls.title}?`)) {
                        deleteClass(cls.id);
                      }
                    }}
                    className="btn btn-ghost btn-sm delete-btn"
                    title="Delete Class"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Class Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule New Live Class"
        subtitle="Specify the topic, paper, chapter, and timing for the new class."
      >
        <form onSubmit={handleAddSubmit}>
          <div className="form-group">
            <label className="form-label">Class Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Class 21: Pteris Sporophyte & Prothallus Morphology"
              value={newClass.title}
              onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Paper *</label>
              <select
                value={newClass.paper}
                onChange={(e) => setNewClass({ ...newClass, paper: e.target.value })}
                className="form-select"
              >
                <option value="Biology First Paper">Biology First Paper</option>
                <option value="Biology Second Paper">Biology Second Paper</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Chapter Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Chapter 06: Bryophytes & Pteridophytes"
                value={newClass.chapterName}
                onChange={(e) => setNewClass({ ...newClass, chapterName: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Topic Covered *</label>
            <input
              type="text"
              required
              placeholder="e.g. Pteris Anatomy & Alternation of Generation"
              value={newClass.topic}
              onChange={(e) => setNewClass({ ...newClass, topic: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Date (YYYY-MM-DD)</label>
              <input
                type="date"
                required
                value={newClass.date}
                onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Day of Week</label>
              <select
                value={newClass.day}
                onChange={(e) => setNewClass({ ...newClass, day: e.target.value })}
                className="form-select"
              >
                <option value="Sunday">Sunday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Thursday">Thursday</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Time Slot</label>
            <input
              type="text"
              value={newClass.time}
              onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Live Google Meet URL</label>
            <input
              type="url"
              value={newClass.meetLink}
              onChange={(e) => setNewClass({ ...newClass, meetLink: e.target.value })}
              className="form-input"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg mt-3">
            <Plus size={18} /> Schedule Class
          </button>
        </form>
      </Modal>

      <style>{`
        .teacher-classes-page {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .classes-admin-header {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .admin-cls-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-top: 0.35rem;
          margin-bottom: 0.25rem;
        }
        .admin-cls-sub {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .cls-number-tag {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
        }
        .table-paper-strong {
          display: block;
          font-size: 0.88rem;
          color: var(--dark-green);
        }
        .table-ch-span {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .table-topic-text {
          font-size: 0.85rem;
          color: var(--text-dark);
        }
        .table-date-cell {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .t-icon {
          color: var(--primary-green);
        }
        .status-select-sm {
          padding: 0.35rem 0.65rem;
          font-size: 0.8rem;
        }
        .delete-btn {
          color: var(--error);
        }
        .delete-btn:hover {
          background: var(--error-bg);
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
};
