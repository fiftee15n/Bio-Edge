import React, { useState } from 'react';
import { useCourseData } from '../../context/CourseDataContext';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { teacher } = useCourseData();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page-wrapper section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-pill">Direct Inquiries</span>
          <h1 className="section-title">Get in Touch with Bio Edge</h1>
          <p className="section-subtitle">
            Have questions about program curriculum, batch schedules, or seat availability?
          </p>
        </div>

        <div className="contact-main-grid">
          {/* Contact Details Card */}
          <div className="contact-info-card bio-card">
            <h3 className="c-title">Direct Academic Contact</h3>
            <p className="c-desc">
              Connect directly with Afroza Tahmina's academic coordinator for batch placement and course counseling.
            </p>

            <div className="c-list">
              <div className="c-item-box">
                <div className="c-icon-circle">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="c-label">Direct Phone / WhatsApp</span>
                  <strong className="c-val">{teacher.contactNumber}</strong>
                </div>
              </div>

              <div className="c-item-box">
                <div className="c-icon-circle">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="c-label">Official Email</span>
                  <strong className="c-val">{teacher.email}</strong>
                </div>
              </div>

              <div className="c-item-box">
                <div className="c-icon-circle">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="c-label">Program Headquarters</span>
                  <strong className="c-val">Dhaka, Bangladesh</strong>
                </div>
              </div>
            </div>

            <div className="hours-box">
              <strong>Counseling Hours:</strong>
              <p>Saturday – Thursday: 10:00 AM – 8:00 PM</p>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-card bio-card">
            {submitted ? (
              <div className="success-state-box text-center">
                <div className="success-check-circle">
                  <CheckCircle2 size={36} />
                </div>
                <h3>Thank You, {form.name}!</h3>
                <p>
                  Your message has been dispatched to Afroza Tahmina's academic team. We will call or WhatsApp you shortly.
                </p>
                <button 
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', college: '', message: '' }); }}
                  className="btn btn-outline mt-3"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="form-card-title">Send Us a Message</h3>
                
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariqul Islam"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Current College / Institution</label>
                  <input
                    type="text"
                    placeholder="e.g. Notre Dame College / Dhaka City College"
                    value={form.college}
                    onChange={(e) => setForm({ ...form, college: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Inquiry / Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ask any questions about the 4-month biology program..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-lg">
                  <Send size={18} /> Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 2.5rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        .contact-info-card {
          padding: 2.5rem;
        }
        .c-title {
          font-size: 1.35rem;
          color: var(--dark-green);
          margin-bottom: 0.5rem;
        }
        .c-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .c-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }
        .c-item-box {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .c-icon-circle {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--light-green);
          color: var(--dark-green);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .c-label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 600;
        }
        .c-val {
          font-size: 0.95rem;
          color: var(--text-dark);
        }
        .hours-box {
          background: var(--light-green-subtle);
          border: 1px solid var(--border-subtle);
          padding: 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          color: var(--text-dark);
        }
        .hours-box strong {
          color: var(--dark-green);
          display: block;
          margin-bottom: 0.2rem;
        }

        .contact-form-card {
          padding: 2.5rem;
        }
        .form-card-title {
          font-size: 1.35rem;
          color: var(--dark-green);
          margin-bottom: 1.5rem;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .success-state-box {
          padding: 2rem 1rem;
        }
        .success-check-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--light-green);
          color: var(--primary-green);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
        }
        .success-state-box h3 {
          font-size: 1.5rem;
          color: var(--dark-green);
          margin-bottom: 0.5rem;
        }
        .success-state-box p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        @media (max-width: 800px) {
          .contact-main-grid {
            grid-template-columns: 1fr;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .contact-info-card,
          .contact-form-card {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};
