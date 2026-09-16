import React, { useState } from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight, 
  Sparkles, 
  User, 
  GraduationCap, 
  HelpCircle,
  RotateCcw
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { teacher } = useCourseData();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    academicLevel: 'HSC 2026 (Comprehensive Foundation)',
    inquiryTopic: 'Batch Enrollment & Seat Availability',
    message: ''
  });

  const rawPhone = teacher.contactNumber || '+8801712345678';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('88') ? cleanPhone : '88' + cleanPhone}?text=${encodeURIComponent(
    `Hello Afroza Ma'am & Bio Edge Team! I have an inquiry regarding the Biology program.`
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({
      name: '',
      phone: '',
      email: '',
      academicLevel: 'HSC 2026 (Comprehensive Foundation)',
      inquiryTopic: 'Batch Enrollment & Seat Availability',
      message: ''
    });
  };

  return (
    <div className="contact-page-wrapper section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-pill">
            <MessageSquare size={13} /> Direct Academic Communication
          </span>
          <h1 className="section-title">Get in Touch with Bio Edge</h1>
          <p className="section-subtitle">
            Have questions about cohort placement, syllabus coverage, or seat availability? Connect directly with Afroza Tahmina's academic team.
          </p>
        </div>

        {/* Main Grid: 2 Columns */}
        <div className="contact-main-grid">
          {/* Left Column: Academic Communication Hub */}
          <div className="contact-info-card bio-card">
            {/* Faculty Identity Badge */}
            <div className="faculty-desk-badge">
              <div className="desk-avatar-circle">
                <span>AT</span>
              </div>
              <div className="desk-details">
                <div className="desk-tag">
                  <ShieldCheck size={13} /> Verified Academic Helpdesk
                </div>
                <h3 className="desk-name">{teacher.name}</h3>
                <p className="desk-role">{teacher.designation}</p>
              </div>
            </div>

            <p className="contact-intro-text">
              Our academic coordination desk provides fast, direct support for prospective students and guardians. Choose your preferred channel below:
            </p>

            {/* Direct Action Channel Cards */}
            <div className="contact-channels-list">
              {/* WhatsApp Action Card */}
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="channel-action-card whatsapp-channel"
              >
                <div className="channel-icon-circle whatsapp-icon">
                  <MessageCircle size={20} />
                </div>
                <div className="channel-content">
                  <div className="channel-header-row">
                    <span className="channel-label">Instant WhatsApp Chat</span>
                    <span className="channel-pill-tag">Fastest</span>
                  </div>
                  <strong className="channel-val">{teacher.contactNumber}</strong>
                  <span className="channel-note">Direct counselor response • ~30 mins</span>
                </div>
                <ArrowUpRight size={18} className="channel-external-icon" />
              </a>

              {/* Direct Phone Call Card */}
              <a 
                href={`tel:${teacher.contactNumber}`} 
                className="channel-action-card"
              >
                <div className="channel-icon-circle">
                  <Phone size={19} />
                </div>
                <div className="channel-content">
                  <span className="channel-label">Voice Call Counseling</span>
                  <strong className="channel-val">{teacher.contactNumber}</strong>
                  <span className="channel-note">Saturday – Thursday • 10:00 AM – 8:00 PM</span>
                </div>
                <ArrowUpRight size={18} className="channel-external-icon" />
              </a>

              {/* Email Desk Card */}
              <a 
                href={`mailto:${teacher.email}`} 
                className="channel-action-card"
              >
                <div className="channel-icon-circle">
                  <Mail size={19} />
                </div>
                <div className="channel-content">
                  <span className="channel-label">Official Academic Email</span>
                  <strong className="channel-val">{teacher.email}</strong>
                  <span className="channel-note">Formal inquiries & documentation</span>
                </div>
                <ArrowUpRight size={18} className="channel-external-icon" />
              </a>
            </div>

            {/* Counseling Hours & Headquarters Box */}
            <div className="counseling-hours-box">
              <div className="hours-header">
                <div className="hours-title">
                  <Clock size={16} /> Academic Desk Schedule
                </div>
                <span className="status-live-pill">
                  <span className="status-dot"></span> Inquiries Open
                </span>
              </div>
              <div className="hours-grid">
                <div className="hours-row">
                  <span className="day-name">Sat – Thu:</span>
                  <span className="day-time">10:00 AM – 8:00 PM</span>
                </div>
                <div className="hours-row">
                  <span className="day-name">Friday:</span>
                  <span className="day-time">Urgent WhatsApp Only</span>
                </div>
              </div>

              <div className="location-footer-row">
                <MapPin size={15} className="location-pin-icon" />
                <span>Program Headquarters: <strong>Dhaka, Bangladesh</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card */}
          <div className="contact-form-card bio-card">
            {submitted ? (
              <div className="success-state-box text-center">
                <div className="success-check-circle">
                  <CheckCircle2 size={40} />
                </div>
                <div className="success-badge-pill">
                  <Sparkles size={13} /> Message Dispatched
                </div>
                <h3 className="success-title">Thank You, {form.name}!</h3>
                <p className="success-desc">
                  Your inquiry regarding <strong>"{form.inquiryTopic}"</strong> has been delivered directly to Afroza Tahmina's academic team.
                </p>

                <div className="success-dispatch-summary">
                  <div className="summary-item">
                    <span className="sum-label">Target Level:</span>
                    <span className="sum-val">{form.academicLevel}</span>
                  </div>
                  <div className="summary-item">
                    <span className="sum-label">Contact Phone:</span>
                    <span className="sum-val">{form.phone}</span>
                  </div>
                  {form.email && (
                    <div className="summary-item">
                      <span className="sum-label">Email:</span>
                      <span className="sum-val">{form.email}</span>
                    </div>
                  )}
                </div>

                <div className="success-action-group">
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-block"
                  >
                    <MessageCircle size={17} /> Chat Immediately on WhatsApp
                  </a>
                  <button 
                    onClick={handleReset}
                    className="btn btn-outline btn-block mt-2"
                  >
                    <RotateCcw size={16} /> Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="inquiry-form">
                <div className="form-card-header">
                  <h3 className="form-card-title">Send Us a Direct Message</h3>
                  <p className="form-card-subtitle">
                    Fill out this quick form and our academic counselor will respond promptly on WhatsApp or phone.
                  </p>
                </div>

                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span className="text-required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <User size={17} className="input-icon" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariqul Islam"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="form-input has-icon"
                    />
                  </div>
                </div>

                {/* Phone & Email Row */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">
                      Phone Number (WhatsApp preferred) <span className="text-required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Phone size={17} className="input-icon" />
                      <input
                        type="tel"
                        required
                        placeholder="017XXXXXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="form-input has-icon"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Email Address <span className="text-optional">(Optional)</span>
                    </label>
                    <div className="input-with-icon">
                      <Mail size={17} className="input-icon" />
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="form-input has-icon"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Level & Inquiry Topic Row */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">
                      Academic Level / Target <span className="text-required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <GraduationCap size={17} className="input-icon" />
                      <select
                        value={form.academicLevel}
                        onChange={(e) => setForm({ ...form, academicLevel: e.target.value })}
                        className="form-select has-icon"
                      >
                        <option value="HSC 2026 (Comprehensive Foundation)">HSC 2026 (Foundation & Full Syllabus)</option>
                        <option value="HSC 2025 (Board & Medical Pre-prep)">HSC 2025 (Board & Medical Prep)</option>
                        <option value="Medical Admission Biology">Medical Admission Biology Specialist</option>
                        <option value="SSC Biology Foundation">SSC Biology Advanced Foundation</option>
                        <option value="Guardian / Parent Inquiry">Guardian / Parent Inquiry</option>
                        <option value="Other Academic Queries">Other Academic Queries</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Inquiry Topic <span className="text-required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <HelpCircle size={17} className="input-icon" />
                      <select
                        value={form.inquiryTopic}
                        onChange={(e) => setForm({ ...form, inquiryTopic: e.target.value })}
                        className="form-select has-icon"
                      >
                        <option value="Batch Enrollment & Seat Availability">Batch Enrollment & Seat Availability</option>
                        <option value="Curriculum & Syllabus Details">Curriculum & Syllabus Details</option>
                        <option value="Class Timings & Schedule">Class Timings & Schedule</option>
                        <option value="Course Fee & Payment Options">Course Fee & Payment Options</option>
                        <option value="1-on-1 Mentorship with Afroza Ma'am">1-on-1 Mentorship Counseling</option>
                        <option value="General Academic Question">General Academic Question</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message Box */}
                <div className="form-group">
                  <label className="form-label">
                    Your Question or Notes <span className="text-required">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ask any specific question regarding chapter progression, MCQ/CQ evaluation, or batch timings..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="form-textarea"
                  />
                  <span className="form-helper-text">
                    Our academic counselor will review this note prior to reaching out.
                  </span>
                </div>

                {/* Submit Action */}
                <button type="submit" className="btn btn-primary btn-block btn-lg submit-inquiry-btn">
                  <Send size={18} /> Submit Academic Inquiry
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick Resolution & FAQ Highlights */}
        <div className="contact-quick-resolutions">
          <div className="resolution-card bio-card">
            <div className="res-icon-circle">
              <GraduationCap size={20} />
            </div>
            <h4 className="res-title">Batch Placement Guidance</h4>
            <p className="res-desc">
              Unsure whether your student should begin with Paper 1 Botany or Paper 2 Zoology? Our faculty reviews current preparation to recommend the ideal pacing.
            </p>
          </div>

          <div className="resolution-card bio-card">
            <div className="res-icon-circle">
              <MessageCircle size={20} />
            </div>
            <h4 className="res-title">Rapid WhatsApp Turnaround</h4>
            <p className="res-desc">
              Messages received on WhatsApp during counseling hours are typically addressed within 30 to 60 minutes by our dedicated batch coordinator.
            </p>
          </div>

          <div className="resolution-card bio-card">
            <div className="res-icon-circle">
              <Clock size={20} />
            </div>
            <h4 className="res-title">Guardian Consultations</h4>
            <p className="res-desc">
              Parents are warmly invited to book weekly counseling appointments to inspect line-by-line CQ evaluations and attendance track records.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .contact-page-wrapper {
          background-color: var(--bg-color);
        }

        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr 1.32fr;
          gap: 2.25rem;
          max-width: 1120px;
          margin: 0 auto 3.5rem;
          align-items: stretch;
        }

        /* Left Column: Academic Hub */
        .contact-info-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
        }

        .faculty-desk-badge {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 1.25rem;
        }

        .desk-avatar-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--dark-green) 0%, var(--primary-green) 100%);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: -0.5px;
          box-shadow: 0 4px 12px rgba(41, 78, 54, 0.2);
          flex-shrink: 0;
        }

        .desk-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary-green);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.2rem;
        }

        .desk-name {
          font-size: 1.25rem;
          color: var(--dark-green);
          margin-bottom: 0.15rem;
          font-weight: 700;
        }

        .desk-role {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .contact-intro-text {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        /* Action Channels List */
        .contact-channels-list {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          margin-bottom: 1.75rem;
        }

        .channel-action-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.15rem;
          border-radius: var(--radius-md);
          background: var(--light-green-subtle);
          border: 1.5px solid var(--border-subtle);
          text-decoration: none;
          color: inherit;
          transition: all 0.22s ease;
          position: relative;
        }

        .channel-action-card:hover {
          transform: translateY(-2px);
          border-color: var(--primary-green);
          box-shadow: var(--shadow-sm);
          background: #FFFFFF;
        }

        .channel-action-card.whatsapp-channel {
          background: #F0FDF4;
          border-color: #DCFCE7;
        }

        .channel-action-card.whatsapp-channel:hover {
          border-color: #22C55E;
          background: #FFFFFF;
        }

        .channel-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--light-green);
          color: var(--dark-green);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .channel-action-card:hover .channel-icon-circle {
          transform: scale(1.06);
        }

        .channel-icon-circle.whatsapp-icon {
          background: #DCFCE7;
          color: #16A34A;
        }

        .channel-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .channel-header-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .channel-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .channel-pill-tag {
          font-size: 0.65rem;
          font-weight: 700;
          background: #DCFCE7;
          color: #15803D;
          padding: 0.1rem 0.45rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }

        .channel-val {
          font-size: 1rem;
          color: var(--text-dark);
          font-weight: 700;
          margin: 0.1rem 0 0.15rem;
        }

        .channel-note {
          font-size: 0.76rem;
          color: var(--text-muted);
        }

        .channel-external-icon {
          color: var(--text-light);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .channel-action-card:hover .channel-external-icon {
          color: var(--primary-green);
          transform: translate(2px, -2px);
        }

        /* Counseling Hours Box */
        .counseling-hours-box {
          margin-top: auto;
          background: #F9FBFA;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem;
        }

        .hours-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .hours-title {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--dark-green);
        }

        .status-live-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.74rem;
          font-weight: 600;
          background: #EAF8EE;
          color: #15803D;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #16A34A;
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.35);
          animation: pulseDot 2s infinite;
        }

        @keyframes pulseDot {
          0% { transform: scale(0.95); opacity: 0.85; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.85; }
        }

        .hours-grid {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          font-size: 0.84rem;
          margin-bottom: 0.85rem;
        }

        .hours-row {
          display: flex;
          justify-content: space-between;
          color: var(--text-dark);
        }

        .day-name {
          color: var(--text-muted);
        }

        .day-time {
          font-weight: 600;
        }

        .location-footer-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          color: var(--text-muted);
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-subtle);
        }

        .location-pin-icon {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        /* Right Column: Inquiry Form Card */
        .contact-form-card {
          padding: 2.5rem;
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
        }

        .form-card-header {
          margin-bottom: 1.75rem;
        }

        .form-card-title {
          font-size: 1.4rem;
          color: var(--dark-green);
          margin-bottom: 0.4rem;
          font-weight: 700;
        }

        .form-card-subtitle {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .text-required {
          color: var(--error);
        }

        .text-optional {
          font-size: 0.75rem;
          color: var(--text-light);
          font-weight: 400;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-with-icon .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-light);
          pointer-events: none;
          transition: color 0.2s ease;
        }

        .input-with-icon .form-input.has-icon,
        .input-with-icon .form-select.has-icon {
          padding-left: 2.75rem;
        }

        .input-with-icon:focus-within .input-icon {
          color: var(--primary-green);
        }

        .submit-inquiry-btn {
          margin-top: 0.5rem;
          height: 50px;
        }

        /* Form Success State */
        .success-state-box {
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-check-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #EAF8EE;
          color: #16A34A;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          box-shadow: 0 8px 24px rgba(22, 163, 74, 0.16);
          animation: popScale 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes popScale {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .success-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--primary-green);
          background: var(--light-green);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .success-title {
          font-size: 1.55rem;
          color: var(--dark-green);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .success-desc {
          font-size: 0.94rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 440px;
          margin-bottom: 1.75rem;
        }

        .success-dispatch-summary {
          width: 100%;
          max-width: 420px;
          background: var(--light-green-subtle);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          margin-bottom: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          text-align: left;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
        }

        .sum-label {
          color: var(--text-muted);
        }

        .sum-val {
          font-weight: 600;
          color: var(--text-dark);
        }

        .success-action-group {
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        /* Bottom Strip: 3 Quick Resolution Cards */
        .contact-quick-resolutions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          max-width: 1120px;
          margin: 0 auto;
        }

        .resolution-card {
          padding: 1.75rem;
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .resolution-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: rgba(78, 134, 95, 0.3);
        }

        .res-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--light-green);
          color: var(--dark-green);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.15rem;
        }

        .res-title {
          font-size: 1.08rem;
          color: var(--dark-green);
          font-weight: 700;
          margin-bottom: 0.45rem;
        }

        .res-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .contact-main-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .contact-quick-resolutions {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        @media (max-width: 600px) {
          .contact-info-card,
          .contact-form-card {
            padding: 1.75rem 1.25rem;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};
