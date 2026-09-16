import React, { useState } from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { EnrollmentRecord } from '../../types';
import { 
  UserCheck, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Copy, 
  Check, 
  MessageCircle, 
  ExternalLink, 
  ShieldCheck, 
  Eye, 
  X, 
  RotateCcw,
  Sparkles,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export const AdminEnrollmentsPage: React.FC = () => {
  const { 
    enrollments, 
    approveEnrollment, 
    rejectEnrollment, 
    revokeEnrollment,
    pendingEnrollmentsCount 
  } = useCourseData();

  const [activeTab, setActiveTab] = useState<'Pending' | 'All' | 'Approved' | 'Rejected'>('Pending');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [courseFilter, setCourseFilter] = useState<string>('All');
  const [paymentFilter, setPaymentFilter] = useState<string>('All');

  // Selected for Details Modal
  const [selectedRecord, setSelectedRecord] = useState<EnrollmentRecord | null>(null);
  const [copiedTrxId, setCopiedTrxId] = useState<string | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string>('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTrxId(id);
    setTimeout(() => setCopiedTrxId(null), 2000);
  };

  const handleApprove = (id: string, name: string, courseTitle: string) => {
    approveEnrollment(id);
    setActionSuccessMsg(`Access granted for ${name} to "${courseTitle}"!`);
    if (selectedRecord && selectedRecord.id === id) {
      setSelectedRecord({
        ...selectedRecord,
        status: 'Approved',
        reviewedAt: new Date().toISOString(),
        reviewedBy: 'admin.nioedge@gmail.com'
      });
    }
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  const handleReject = (id: string, name: string) => {
    const reason = window.prompt(`Enter rejection reason for ${name}:`, 'Payment transaction could not be verified on mobile statement.');
    if (reason !== null) {
      rejectEnrollment(id, reason);
      setActionSuccessMsg(`Application for ${name} has been rejected.`);
      if (selectedRecord && selectedRecord.id === id) {
        setSelectedRecord({
          ...selectedRecord,
          status: 'Rejected',
          notes: reason
        });
      }
      setTimeout(() => setActionSuccessMsg(''), 4000);
    }
  };

  const handleRevoke = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to revoke course access for ${name}?`)) {
      revokeEnrollment(id);
      setActionSuccessMsg(`Course access revoked for ${name}.`);
      if (selectedRecord && selectedRecord.id === id) {
        setSelectedRecord({
          ...selectedRecord,
          status: 'Pending'
        });
      }
      setTimeout(() => setActionSuccessMsg(''), 4000);
    }
  };

  // Filter Logic
  const filteredEnrollments = enrollments.filter((item) => {
    // Tab filter
    if (activeTab === 'Pending' && item.status !== 'Pending') return false;
    if (activeTab === 'Approved' && item.status !== 'Approved') return false;
    if (activeTab === 'Rejected' && item.status !== 'Rejected') return false;

    // Course filter
    if (courseFilter !== 'All' && item.courseKey !== courseFilter) return false;

    // Payment method filter
    if (paymentFilter !== 'All' && item.paymentMethod !== paymentFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchEmail = item.email.toLowerCase().includes(q);
      const matchCollege = item.schoolCollege.toLowerCase().includes(q);
      const matchPhone = item.whatsappNumber.includes(q) || item.paymentNumber.includes(q);
      const matchTrx = item.transactionId.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchCollege && !matchPhone && !matchTrx) {
        return false;
      }
    }

    return true;
  });

  const approvedCount = enrollments.filter(e => e.status === 'Approved').length;
  const rejectedCount = enrollments.filter(e => e.status === 'Rejected').length;

  return (
    <div className="admin-enrollments-page">
      {/* Top Header */}
      <div className="page-header-row bio-card">
        <div>
          <span className="admin-pill-badge">
            <UserCheck size={13} /> Course Access Control
          </span>
          <h1 className="page-title">Enrollment Approvals & Verification</h1>
          <p className="page-subtitle">
            Review submitted student payment details. When you grant access, the student immediately receives access to the course materials for that specific course only.
          </p>
        </div>

        {actionSuccessMsg && (
          <div className="admin-success-toast">
            <CheckCircle2 size={16} />
            <span>{actionSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-controls-card bio-card">
        {/* Status Tabs */}
        <div className="status-tabs-row">
          <button
            type="button"
            onClick={() => setActiveTab('Pending')}
            className={`status-tab ${activeTab === 'Pending' ? 'active alert' : ''}`}
          >
            <Clock size={16} />
            <span>Pending Review</span>
            {pendingEnrollmentsCount > 0 && (
              <span className="tab-badge-pending">{pendingEnrollmentsCount}</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('All')}
            className={`status-tab ${activeTab === 'All' ? 'active' : ''}`}
          >
            <span>All Applications</span>
            <span className="tab-badge">{enrollments.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('Approved')}
            className={`status-tab ${activeTab === 'Approved' ? 'active success' : ''}`}
          >
            <CheckCircle2 size={16} />
            <span>Access Granted</span>
            <span className="tab-badge">{approvedCount}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('Rejected')}
            className={`status-tab ${activeTab === 'Rejected' ? 'active gray' : ''}`}
          >
            <XCircle size={16} />
            <span>Rejected</span>
            <span className="tab-badge">{rejectedCount}</span>
          </button>
        </div>

        {/* Search & Select Filters */}
        <div className="filters-search-row">
          <div className="search-input-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by student name, email, phone, or TrxID..."
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
              <option value="alpha-cohort">Alpha Cohort (HSC Biology)</option>
              <option value="ssc-2027">SSC 2027 Model Test Package</option>
            </select>
          </div>

          <div className="select-filter-wrap">
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="form-select filter-select"
            >
              <option value="All">All Payment Options</option>
              <option value="bKash">bKash</option>
              <option value="Nagad">Nagad</option>
              <option value="Rocket">Rocket</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Records Table / Cards */}
      <div className="admin-records-container bio-card">
        {filteredEnrollments.length === 0 ? (
          <div className="empty-results-box text-center">
            <AlertCircle size={36} className="empty-icon" />
            <h3>No Enrollment Applications Found</h3>
            <p>
              {searchQuery || courseFilter !== 'All' || paymentFilter !== 'All'
                ? 'Try adjusting your search criteria or filter options.'
                : 'No enrollment applications under this tab at present.'}
            </p>
          </div>
        ) : (
          <div className="enrollments-table-wrap">
            <table className="enrollments-table">
              <thead>
                <tr>
                  <th>Student Profile</th>
                  <th>Course Applied For</th>
                  <th>Payment Option & TrxID</th>
                  <th>Amount</th>
                  <th>Date Submitted</th>
                  <th>Status</th>
                  <th className="text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments.map((item) => {
                  const cleanPhone = item.whatsappNumber.replace(/[^0-9]/g, '');
                  const waLink = `https://wa.me/${cleanPhone.startsWith('88') ? cleanPhone : '88' + cleanPhone}?text=${encodeURIComponent(
                    `Hello ${item.name}! This is Bio Edge Administration verifying your enrollment for ${item.courseTitle}. We are checking your payment of ৳${item.amount} (TrxID: ${item.transactionId}).`
                  )}`;

                  return (
                    <tr key={item.id} className={`enrollment-row ${item.status.toLowerCase()}`}>
                      {/* Student Profile */}
                      <td>
                        <div className="student-profile-cell">
                          <div className="student-avatar-badge">
                            {item.name.charAt(0)}
                          </div>
                          <div className="student-meta-col">
                            <strong className="student-name-text">{item.name}</strong>
                            <span className="student-college-text">{item.schoolCollege}</span>
                            <span className="student-contact-text">{item.email}</span>
                            <span className="student-phone-text">
                              WhatsApp: {item.whatsappNumber}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Course */}
                      <td>
                        <div className="course-cell">
                          <span className={`course-badge-pill ${item.courseKey}`}>
                            {item.courseKey === 'ssc-2027' ? 'SSC 2027' : 'Alpha Cohort'}
                          </span>
                          <span className="course-full-title">{item.courseTitle}</span>
                          <span className="plan-sub-tag">Plan: {item.plan === 'monthly' ? 'Monthly Installment' : 'Full Course'}</span>
                        </div>
                      </td>

                      {/* Payment Option & TrxID */}
                      <td>
                        <div className="payment-cell">
                          <div className="pay-method-row">
                            <span className={`pay-pill ${item.paymentMethod.toLowerCase()}`}>
                              {item.paymentMethod}
                            </span>
                            <span className="pay-number-text">{item.paymentNumber}</span>
                          </div>

                          <div className="trx-copy-row">
                            <span className="trx-code">
                              TrxID: <code>{item.transactionId}</code>
                            </span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(item.transactionId, item.id)}
                              className="copy-btn"
                              title="Copy Transaction ID"
                            >
                              {copiedTrxId === item.id ? (
                                <Check size={13} className="text-success" />
                              ) : (
                                <Copy size={13} />
                              )}
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Amount */}
                      <td>
                        <div className="amount-cell">
                          <strong className="amount-text">৳{item.amount}</strong>
                        </div>
                      </td>

                      {/* Submitted Date */}
                      <td>
                        <div className="date-cell">
                          <span>{new Date(item.submittedAt).toLocaleDateString()}</span>
                          <span className="time-sub">
                            {new Date(item.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <div className="status-cell">
                          {item.status === 'Approved' ? (
                            <span className="status-badge approved">
                              <CheckCircle2 size={13} /> Access Granted
                            </span>
                          ) : item.status === 'Pending' ? (
                            <span className="status-badge pending">
                              <span className="pulse-dot"></span> Pending Verification
                            </span>
                          ) : (
                            <span className="status-badge rejected">
                              <XCircle size={13} /> Rejected
                            </span>
                          )}

                          {item.reviewedAt && (
                            <span className="reviewed-by-tag">
                              Verified {new Date(item.reviewedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Admin Actions */}
                      <td className="text-right">
                        <div className="actions-cluster">
                          {/* 1. Direct WhatsApp Verification Link */}
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-action-icon whatsapp"
                            title="Chat on WhatsApp to verify payment"
                          >
                            <MessageCircle size={16} />
                          </a>

                          {/* 2. View Details Modal */}
                          <button
                            type="button"
                            onClick={() => setSelectedRecord(item)}
                            className="btn-action-icon inspect"
                            title="View Full Application Record"
                          >
                            <Eye size={16} />
                          </button>

                          {/* 3. Primary Give Access Button */}
                          {item.status !== 'Approved' ? (
                            <button
                              type="button"
                              onClick={() => handleApprove(item.id, item.name, item.courseTitle)}
                              className="btn btn-primary btn-sm btn-grant"
                              title="Authorize full access to this course materials"
                            >
                              <CheckCircle2 size={15} /> Grant Access
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleRevoke(item.id, item.name)}
                              className="btn btn-outline btn-sm btn-revoke"
                              title="Revoke course access"
                            >
                              <RotateCcw size={14} /> Revoke
                            </button>
                          )}

                          {/* 4. Reject Button */}
                          {item.status === 'Pending' && (
                            <button
                              type="button"
                              onClick={() => handleReject(item.id, item.name)}
                              className="btn-action-icon reject"
                              title="Reject Application"
                            >
                              <X size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detailed Modal Dialog */}
      {selectedRecord && (
        <div className="modal-backdrop" onClick={() => setSelectedRecord(null)}>
          <div className="modal-dialog bio-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <span className="modal-tag">Application #{selectedRecord.id}</span>
                <h3 className="modal-title">{selectedRecord.name}</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setSelectedRecord(null)}
                className="modal-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-section-grid">
                <div className="detail-block">
                  <span className="detail-label">Institution / College</span>
                  <strong className="detail-value">{selectedRecord.schoolCollege}</strong>
                </div>

                <div className="detail-block">
                  <span className="detail-label">Email Address</span>
                  <span className="detail-value">{selectedRecord.email}</span>
                </div>

                <div className="detail-block">
                  <span className="detail-label">WhatsApp Number</span>
                  <span className="detail-value">{selectedRecord.whatsappNumber}</span>
                </div>

                <div className="detail-block">
                  <span className="detail-label">Payment Option</span>
                  <span className="detail-value font-bold">{selectedRecord.paymentMethod}</span>
                </div>

                <div className="detail-block">
                  <span className="detail-label">Payment Phone / Sender</span>
                  <span className="detail-value">{selectedRecord.paymentNumber}</span>
                </div>

                <div className="detail-block">
                  <span className="detail-label">Transaction ID (TrxID)</span>
                  <span className="detail-value code-value">{selectedRecord.transactionId}</span>
                </div>

                <div className="detail-block">
                  <span className="detail-label">Amount Paid</span>
                  <span className="detail-value price-value">৳{selectedRecord.amount}</span>
                </div>

                <div className="detail-block">
                  <span className="detail-label">Target Course Authorized</span>
                  <span className="detail-value course-val">{selectedRecord.courseTitle}</span>
                </div>
              </div>

              {selectedRecord.notes && (
                <div className="modal-notes-box">
                  <span className="notes-label">Administrative Notes / Audit Log:</span>
                  <p className="notes-text">{selectedRecord.notes}</p>
                </div>
              )}

              <div className="modal-status-bar">
                <span className="status-head">Current Status:</span>
                <strong className={`status-pill-big ${selectedRecord.status.toLowerCase()}`}>
                  {selectedRecord.status === 'Approved' ? 'Access Granted (Active Student)' : selectedRecord.status}
                </strong>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="btn btn-outline"
              >
                Close
              </button>

              {selectedRecord.status !== 'Approved' ? (
                <button
                  type="button"
                  onClick={() => handleApprove(selectedRecord.id, selectedRecord.name, selectedRecord.courseTitle)}
                  className="btn btn-primary"
                >
                  <CheckCircle2 size={16} /> Grant Course Access
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRevoke(selectedRecord.id, selectedRecord.name)}
                  className="btn btn-outline btn-revoke"
                >
                  <RotateCcw size={16} /> Revoke Access
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-enrollments-page {
          padding: 1.75rem 2rem;
          max-width: 1300px;
          margin: 0 auto;
        }

        .page-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
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

        .page-title {
          font-size: 1.65rem;
          color: var(--dark-green);
          margin-bottom: 0.25rem;
          font-weight: 700;
        }

        .page-subtitle {
          font-size: 0.88rem;
          color: var(--text-muted);
          max-width: 700px;
          line-height: 1.5;
        }

        .admin-success-toast {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #F0FDF4;
          border: 1px solid #BBF7D0;
          color: #15803D;
          font-weight: 600;
          font-size: 0.85rem;
          padding: 0.6rem 1rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          animation: slideInDown 0.3s ease;
        }

        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Controls Card */
        .admin-controls-card {
          padding: 1.25rem 1.75rem;
          margin-bottom: 1.5rem;
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .status-tabs-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .status-tab {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 1rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          background: #FFFFFF;
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .status-tab:hover {
          border-color: var(--primary-green);
          background: var(--light-green-subtle);
        }

        .status-tab.active {
          background: var(--dark-green);
          color: #FFFFFF;
          border-color: var(--dark-green);
        }

        .status-tab.active.alert {
          background: #DC2626;
          border-color: #DC2626;
        }

        .tab-badge {
          background: #EEF3F0;
          color: var(--dark-green);
          font-size: 0.72rem;
          padding: 0.1rem 0.45rem;
          border-radius: var(--radius-full);
          font-weight: 700;
        }

        .status-tab.active .tab-badge {
          background: rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
        }

        .tab-badge-pending {
          background: #DC2626;
          color: #FFFFFF;
          font-size: 0.72rem;
          padding: 0.1rem 0.5rem;
          border-radius: var(--radius-full);
          font-weight: 700;
          animation: pulseSubtle 1.8s infinite;
        }

        .filters-search-row {
          display: grid;
          grid-template-columns: 1fr 220px 200px;
          gap: 1rem;
        }

        .search-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-light);
          pointer-events: none;
        }

        .search-input {
          padding-left: 2.65rem !important;
          height: 42px;
          border-radius: var(--radius-md);
        }

        .select-filter-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .filter-icon {
          position: absolute;
          left: 0.85rem;
          color: var(--text-light);
          pointer-events: none;
        }

        .filter-select {
          height: 42px;
          border-radius: var(--radius-md);
        }

        /* Records Table */
        .admin-records-container {
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          overflow: hidden;
        }

        .enrollments-table-wrap {
          overflow-x: auto;
        }

        .enrollments-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.88rem;
        }

        .enrollments-table th {
          background: #F9FBFA;
          padding: 0.95rem 1.25rem;
          color: var(--dark-green);
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          border-bottom: 1.5px solid var(--border-color);
        }

        .enrollments-table td {
          padding: 1.15rem 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          vertical-align: middle;
        }

        .enrollment-row:hover {
          background: #FAFCFA;
        }

        .enrollment-row.pending {
          background: #FFFEFB;
        }

        /* Profile Cell */
        .student-profile-cell {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }

        .student-avatar-badge {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--light-green);
          color: var(--dark-green);
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .student-meta-col {
          display: flex;
          flex-direction: column;
          line-height: 1.35;
        }

        .student-name-text {
          font-size: 0.94rem;
          color: var(--dark-green);
        }

        .student-college-text {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .student-contact-text {
          font-size: 0.74rem;
          color: var(--text-light);
        }

        .student-phone-text {
          font-size: 0.74rem;
          color: var(--primary-green);
          font-weight: 600;
        }

        /* Course Cell */
        .course-cell {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .course-badge-pill {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.1rem 0.45rem;
          border-radius: var(--radius-full);
          width: fit-content;
        }

        .course-badge-pill.alpha-cohort { background: #ECFDF5; color: #047857; }
        .course-badge-pill.ssc-2027 { background: #EFF6FF; color: #1D4ED8; }

        .course-full-title {
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--text-dark);
        }

        .plan-sub-tag {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        /* Payment Cell */
        .payment-cell {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .pay-method-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .pay-pill {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .pay-pill.bkash { background: #FDF2F8; color: #BE185D; border: 1px solid #FBCFE8; }
        .pay-pill.nagad { background: #FFF7ED; color: #C2410C; border: 1px solid #FFEDD5; }
        .pay-pill.rocket { background: #FAF5FF; color: #7E22CE; border: 1px solid #F3E8FF; }
        .pay-pill.cash { background: #F0FDF4; color: #15803D; border: 1px solid #DCFCE7; }

        .pay-number-text {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .trx-copy-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .trx-code code {
          background: #F3F4F6;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-dark);
        }

        .copy-btn {
          color: var(--text-light);
          padding: 0.15rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
        }

        .copy-btn:hover {
          color: var(--primary-green);
        }

        .amount-cell {
          font-size: 1.05rem;
          color: var(--text-dark);
          font-weight: 800;
        }

        .date-cell {
          display: flex;
          flex-direction: column;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .time-sub {
          font-size: 0.72rem;
          color: var(--text-light);
        }

        /* Status Badges */
        .status-cell {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          width: fit-content;
        }

        .status-badge.approved { background: #EAF8EE; color: #15803D; }
        .status-badge.pending { background: #FEF7E6; color: #B45309; }
        .status-badge.rejected { background: #FEF0F0; color: #B91C1C; }

        .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #D97706;
          animation: pulseSubtle 1.8s infinite;
        }

        .reviewed-by-tag {
          font-size: 0.68rem;
          color: var(--text-light);
        }

        /* Actions Cluster */
        .actions-cluster {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.45rem;
        }

        .btn-action-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .btn-action-icon.whatsapp {
          color: #16A34A;
          border-color: #DCFCE7;
          background: #F0FDF4;
        }

        .btn-action-icon.whatsapp:hover {
          background: #22C55E;
          color: #FFFFFF;
        }

        .btn-action-icon.inspect:hover {
          background: var(--light-green);
          color: var(--dark-green);
          border-color: var(--primary-green);
        }

        .btn-action-icon.reject {
          color: #DC2626;
        }

        .btn-action-icon.reject:hover {
          background: #DC2626;
          color: #FFFFFF;
          border-color: #DC2626;
        }

        .btn-grant {
          background: linear-gradient(145deg, #16A34A 0%, #15803D 100%) !important;
          color: #FFFFFF !important;
          box-shadow: 0 2px 6px rgba(22, 163, 74, 0.25);
        }

        .btn-grant:hover {
          background: linear-gradient(145deg, #22C55E 0%, #16A34A 100%) !important;
          transform: translateY(-1px);
        }

        .btn-revoke {
          font-size: 0.78rem;
          color: #B91C1C;
        }

        .btn-revoke:hover {
          border-color: #DC2626;
          background: #FEF2F2;
        }

        .empty-results-box {
          padding: 4rem 1.5rem;
        }

        .empty-icon {
          color: var(--text-light);
          margin-bottom: 0.75rem;
        }

        /* Modal Dialog */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(15, 30, 20, 0.45);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1.5rem;
        }

        .modal-dialog {
          width: 100%;
          max-width: 600px;
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          padding: 2rem;
          max-height: 90vh;
          overflow-y: auto;
          animation: modalSlide 0.25s ease;
        }

        @keyframes modalSlide {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .modal-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
        }

        .modal-title {
          font-size: 1.4rem;
          color: var(--dark-green);
        }

        .modal-close-btn {
          color: var(--text-light);
          cursor: pointer;
          background: none;
          border: none;
          padding: 0.25rem;
        }

        .modal-close-btn:hover {
          color: var(--text-dark);
        }

        .detail-section-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .detail-block {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .detail-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 600;
        }

        .detail-value {
          font-size: 0.92rem;
          color: var(--text-dark);
        }

        .code-value {
          font-family: monospace;
          background: #F3F4F6;
          padding: 0.2rem 0.45rem;
          border-radius: 4px;
          width: fit-content;
        }

        .price-value {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--primary-green);
        }

        .course-val {
          font-weight: 700;
          color: var(--dark-green);
        }

        .modal-notes-box {
          background: var(--light-green-subtle);
          border: 1px solid var(--border-color);
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
        }

        .notes-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--dark-green);
          display: block;
          margin-bottom: 0.25rem;
        }

        .notes-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .modal-status-bar {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.75rem 0;
          border-top: 1px solid var(--border-subtle);
          margin-bottom: 1.5rem;
        }

        .status-head {
          font-size: 0.84rem;
          color: var(--text-muted);
        }

        .status-pill-big {
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
        }

        .status-pill-big.approved { background: #EAF8EE; color: #15803D; }
        .status-pill-big.pending { background: #FEF7E6; color: #B45309; }
        .status-pill-big.rejected { background: #FEF0F0; color: #B91C1C; }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
        }

        @media (max-width: 900px) {
          .filters-search-row { grid-template-columns: 1fr; }
          .detail-section-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .admin-enrollments-page { padding: 1.25rem 1rem; }
          .page-header-row { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }
      `}</style>
    </div>
  );
};
