import React from 'react';
import { Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  UserCheck, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  ExternalLink,
  BookOpen,
  MessageCircle,
  Layers,
  Sparkles
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { 
    enrollments, 
    pendingEnrollmentsCount, 
    students, 
    approveEnrollment 
  } = useCourseData();

  // Metrics
  const approvedEnrollments = enrollments.filter(e => e.status === 'Approved');
  const rejectedEnrollments = enrollments.filter(e => e.status === 'Rejected');
  const totalRevenue = approvedEnrollments.reduce((acc, curr) => {
    const num = parseInt(curr.amount.replace(/[^0-9]/g, ''), 10) || 0;
    return acc + num;
  }, 0);

  const alphaCohortApproved = approvedEnrollments.filter(e => e.courseKey === 'alpha-cohort').length;
  const ssc2027Approved = approvedEnrollments.filter(e => e.courseKey === 'ssc-2027').length;

  const pendingList = enrollments.filter(e => e.status === 'Pending');

  return (
    <div className="admin-dashboard-page">
      {/* Header Banner */}
      <div className="admin-welcome-header bio-card">
        <div className="welcome-left">
          <span className="admin-pill-badge">
            <ShieldCheck size={13} /> Secure Administrative Hub
          </span>
          <h1 className="welcome-title">Administrative Dashboard</h1>
          <p className="welcome-subtitle">
            Audit student enrollment applications, verify payment transaction IDs (bKash/Nagad/Rocket/Cash), and grant course materials access.
          </p>
        </div>

        <div className="welcome-right">
          <Link to="/admin/enrollments" className="btn btn-primary btn-sm">
            <UserCheck size={16} /> Review Enrollments ({pendingEnrollmentsCount})
          </Link>
          <Link to="/admin/students" className="btn btn-secondary btn-sm">
            <Users size={16} /> Student Roster
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="admin-kpi-grid">
        {/* Pending Card */}
        <div className={`kpi-card bio-card ${pendingEnrollmentsCount > 0 ? 'highlight-pending' : ''}`}>
          <div className="kpi-top">
            <span className="kpi-label">Pending Verification</span>
            <div className={`kpi-icon-circle ${pendingEnrollmentsCount > 0 ? 'red' : 'gray'}`}>
              <Clock size={20} />
            </div>
          </div>
          <div className="kpi-val">{pendingEnrollmentsCount}</div>
          <div className="kpi-footer">
            {pendingEnrollmentsCount > 0 ? (
              <span className="kpi-note alert">Requires immediate review</span>
            ) : (
              <span className="kpi-note green">All submissions reviewed</span>
            )}
          </div>
        </div>

        {/* Active Enrolled */}
        <div className="kpi-card bio-card">
          <div className="kpi-top">
            <span className="kpi-label">Access Granted</span>
            <div className="kpi-icon-circle green">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="kpi-val">{approvedEnrollments.length}</div>
          <div className="kpi-footer">
            <span className="kpi-note">{students.length} total registered students</span>
          </div>
        </div>

        {/* Revenue */}
        <div className="kpi-card bio-card">
          <div className="kpi-top">
            <span className="kpi-label">Verified Revenue</span>
            <div className="kpi-icon-circle emerald">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="kpi-val">৳{totalRevenue.toLocaleString()}</div>
          <div className="kpi-footer">
            <span className="kpi-note">Collected via mobile banking & cash</span>
          </div>
        </div>

        {/* Total Applications */}
        <div className="kpi-card bio-card">
          <div className="kpi-top">
            <span className="kpi-label">Total Submissions</span>
            <div className="kpi-icon-circle blue">
              <Layers size={20} />
            </div>
          </div>
          <div className="kpi-val">{enrollments.length}</div>
          <div className="kpi-footer">
            <span className="kpi-note">{rejectedEnrollments.length} rejected / void</span>
          </div>
        </div>
      </div>

      {/* Course Breakdown Row */}
      <div className="admin-course-breakdown-row">
        <div className="course-stat-card bio-card">
          <div className="course-stat-header">
            <div className="c-stat-title-wrap">
              <span className="c-code-badge">HSC Intensive</span>
              <h3 className="c-stat-title">Alpha Cohort (HSC Biology)</h3>
            </div>
            <span className="c-enrolled-count">{alphaCohortApproved} Enrolled</span>
          </div>
          <p className="c-stat-desc">
            4-Month comprehensive 1st & 2nd paper masterclasses, CQ evaluation, and milestone exams.
          </p>
          <div className="c-stat-progress-line">
            <div 
              className="c-progress-fill" 
              style={{ width: `${Math.min(100, (alphaCohortApproved / 20) * 100)}%` }}
            ></div>
          </div>
          <div className="c-stat-footer">
            <span>Seat Cap: 20 Students</span>
            <strong>{Math.max(0, 20 - alphaCohortApproved)} Seats Available</strong>
          </div>
        </div>

        <div className="course-stat-card bio-card">
          <div className="course-stat-header">
            <div className="c-stat-title-wrap">
              <span className="c-code-badge">SSC Board Prep</span>
              <h3 className="c-stat-title">SSC 2027 Model Test Package</h3>
            </div>
            <span className="c-enrolled-count">{ssc2027Approved} Enrolled</span>
          </div>
          <p className="c-stat-desc">
            20 Full board standard model tests with line-by-line handwritten CQ evaluation.
          </p>
          <div className="c-stat-progress-line">
            <div 
              className="c-progress-fill ssc-color" 
              style={{ width: `${Math.min(100, (ssc2027Approved / 30) * 100)}%` }}
            ></div>
          </div>
          <div className="c-stat-footer">
            <span>Batch Limit: 30 Students</span>
            <strong>{Math.max(0, 30 - ssc2027Approved)} Seats Available</strong>
          </div>
        </div>
      </div>

      {/* Priority Action Queue (Pending Applications) */}
      <div className="admin-queue-section bio-card">
        <div className="queue-header">
          <div>
            <h3 className="queue-title">
              Priority Verification Queue
              {pendingEnrollmentsCount > 0 && (
                <span className="queue-badge">{pendingEnrollmentsCount} Action Required</span>
              )}
            </h3>
            <p className="queue-subtitle">
              Students waiting for administrator confirmation to unlock course materials.
            </p>
          </div>
          <Link to="/admin/enrollments" className="btn btn-outline btn-sm">
            View All ({enrollments.length}) <ArrowRight size={14} />
          </Link>
        </div>

        {pendingList.length === 0 ? (
          <div className="queue-empty-state text-center">
            <CheckCircle2 size={40} className="empty-check-icon" />
            <h4>All Clear! No Pending Submissions</h4>
            <p>Every student enrollment application has been reviewed and granted access.</p>
          </div>
        ) : (
          <div className="queue-items-list">
            {pendingList.slice(0, 5).map((item) => {
              const cleanPhone = item.whatsappNumber.replace(/[^0-9]/g, '');
              const waLink = `https://wa.me/${cleanPhone.startsWith('88') ? cleanPhone : '88' + cleanPhone}?text=${encodeURIComponent(
                `Hello ${item.name}! This is Bio Edge Administration regarding your enrollment for ${item.courseTitle}. We are verifying your payment of ৳${item.amount} (TrxID: ${item.transactionId}).`
              )}`;

              return (
                <div key={item.id} className="queue-item-card">
                  <div className="queue-student-info">
                    <div className="queue-avatar">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="q-name">{item.name}</h4>
                      <p className="q-college">{item.schoolCollege}</p>
                      <span className="q-meta">{item.email} • {item.whatsappNumber}</span>
                    </div>
                  </div>

                  <div className="queue-course-badge-wrap">
                    <span className="q-course-pill">
                      {item.courseTitle}
                    </span>
                    <span className="q-date">
                      {new Date(item.submittedAt).toLocaleDateString()} • {new Date(item.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="queue-payment-box">
                    <div className="q-pay-row">
                      <span className={`pay-pill ${item.paymentMethod.toLowerCase()}`}>{item.paymentMethod}</span>
                      <strong className="q-amount">৳{item.amount}</strong>
                    </div>
                    <span className="q-trx">TrxID: <code>{item.transactionId}</code></span>
                  </div>

                  <div className="queue-actions">
                    <a 
                      href={waLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-secondary btn-sm"
                      title="Verify directly with student via WhatsApp"
                    >
                      <MessageCircle size={15} /> WhatsApp
                    </a>
                    <button 
                      onClick={() => approveEnrollment(item.id)}
                      className="btn btn-primary btn-sm btn-grant-quick"
                    >
                      <CheckCircle2 size={15} /> Grant Access
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .admin-dashboard-page {
          padding: 1.75rem 2rem;
          max-width: 1240px;
          margin: 0 auto;
        }

        .admin-welcome-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.75rem 2rem;
          margin-bottom: 1.5rem;
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
        }

        .admin-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
          margin-bottom: 0.35rem;
        }

        .welcome-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-bottom: 0.25rem;
          font-weight: 700;
        }

        .welcome-subtitle {
          font-size: 0.88rem;
          color: var(--text-muted);
          max-width: 650px;
          line-height: 1.5;
        }

        .welcome-right {
          display: flex;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        /* KPI Grid */
        .admin-kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 1.75rem;
        }

        .kpi-card {
          padding: 1.35rem;
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
        }

        .kpi-card.highlight-pending {
          border-color: #FCA5A5;
          background: #FFFDFD;
        }

        .kpi-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.65rem;
        }

        .kpi-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .kpi-icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .kpi-icon-circle.red { background: #FEF2F2; color: #DC2626; }
        .kpi-icon-circle.green { background: #F0FDF4; color: #16A34A; }
        .kpi-icon-circle.emerald { background: #ECFDF5; color: #059669; }
        .kpi-icon-circle.blue { background: #EFF6FF; color: #2563EB; }
        .kpi-icon-circle.gray { background: #F3F4F6; color: #6B7280; }

        .kpi-val {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--dark-green);
          font-family: var(--font-heading);
          line-height: 1.1;
          margin-bottom: 0.4rem;
        }

        .kpi-footer {
          font-size: 0.76rem;
        }

        .kpi-note { color: var(--text-muted); }
        .kpi-note.alert { color: #DC2626; font-weight: 700; }
        .kpi-note.green { color: #16A34A; font-weight: 600; }

        /* Course Breakdown Row */
        .admin-course-breakdown-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 1.75rem;
        }

        .course-stat-card {
          padding: 1.5rem;
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
        }

        .course-stat-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .c-code-badge {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
        }

        .c-stat-title {
          font-size: 1.15rem;
          color: var(--dark-green);
          font-weight: 700;
        }

        .c-enrolled-count {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--dark-green);
          background: var(--light-green);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
        }

        .c-stat-desc {
          font-size: 0.84rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .c-stat-progress-line {
          height: 8px;
          background: #EEF3F0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.65rem;
        }

        .c-progress-fill {
          height: 100%;
          background: var(--primary-green);
          border-radius: 4px;
          transition: width 0.4s ease;
        }

        .c-progress-fill.ssc-color {
          background: #2563EB;
        }

        .c-stat-footer {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .c-stat-footer strong {
          color: var(--dark-green);
        }

        /* Queue Section */
        .admin-queue-section {
          padding: 1.75rem 2rem;
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
        }

        .queue-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .queue-title {
          font-size: 1.25rem;
          color: var(--dark-green);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .queue-badge {
          font-size: 0.72rem;
          font-weight: 700;
          background: #FEE2E2;
          color: #DC2626;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
        }

        .queue-subtitle {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
        }

        .queue-items-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .queue-item-card {
          display: grid;
          grid-template-columns: 2fr 1.8fr 1.5fr auto;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem 1.25rem;
          background: #FDFEFE;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          transition: all 0.2s ease;
        }

        .queue-item-card:hover {
          border-color: rgba(78, 134, 95, 0.4);
          box-shadow: var(--shadow-sm);
        }

        .queue-student-info {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .queue-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--light-green);
          color: var(--dark-green);
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .q-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--dark-green);
          margin-bottom: 0.1rem;
        }

        .q-college {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .q-meta {
          font-size: 0.74rem;
          color: var(--text-light);
        }

        .queue-course-badge-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .q-course-pill {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--dark-green);
        }

        .q-date {
          font-size: 0.72rem;
          color: var(--text-light);
        }

        .queue-payment-box {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .q-pay-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pay-pill {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.1rem 0.45rem;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .pay-pill.bkash { background: #FDF2F8; color: #BE185D; border: 1px solid #FBCFE8; }
        .pay-pill.nagad { background: #FFF7ED; color: #C2410C; border: 1px solid #FFEDD5; }
        .pay-pill.rocket { background: #FAF5FF; color: #7E22CE; border: 1px solid #F3E8FF; }
        .pay-pill.cash { background: #F0FDF4; color: #15803D; border: 1px solid #DCFCE7; }

        .q-amount {
          font-size: 0.95rem;
          color: var(--text-dark);
        }

        .q-trx {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .q-trx code {
          background: #F3F4F6;
          padding: 0.1rem 0.35rem;
          border-radius: 4px;
          font-weight: 600;
          color: var(--text-dark);
        }

        .queue-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-grant-quick {
          background: linear-gradient(145deg, #16A34A 0%, #15803D 100%) !important;
          color: #FFFFFF !important;
        }

        .btn-grant-quick:hover {
          background: linear-gradient(145deg, #22C55E 0%, #16A34A 100%) !important;
        }

        .queue-empty-state {
          padding: 3rem 1rem;
        }

        .empty-check-icon {
          color: var(--success);
          margin-bottom: 0.75rem;
        }

        .queue-empty-state h4 {
          font-size: 1.2rem;
          color: var(--dark-green);
          margin-bottom: 0.35rem;
        }

        .queue-empty-state p {
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        @media (max-width: 1024px) {
          .admin-kpi-grid { grid-template-columns: repeat(2, 1fr); }
          .admin-course-breakdown-row { grid-template-columns: 1fr; }
          .queue-item-card { grid-template-columns: 1fr; gap: 1rem; }
        }

        @media (max-width: 768px) {
          .admin-welcome-header {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.5rem 1.25rem;
            gap: 1.25rem;
          }

          .welcome-right {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .welcome-right .btn {
            width: 100%;
            justify-content: center;
          }

          .course-stat-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .queue-actions {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
          }

          .queue-actions .btn {
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .admin-dashboard-page {
            padding: 1rem 0.85rem;
            gap: 1.25rem;
          }

          .welcome-title {
            font-size: 1.45rem;
          }

          .admin-kpi-grid {
            grid-template-columns: 1fr;
            gap: 0.85rem;
          }

          .queue-item-card {
            padding: 1rem;
          }

          .queue-actions {
            grid-template-columns: 1fr;
          }

          .c-meta-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};
