import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useCourseData } from '../../context/CourseDataContext';
import { useAuth } from '../../context/AuthContext';
import { 
  CheckCircle2, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  Lock,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const EnrollPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialPlan = searchParams.get('plan') === 'monthly' ? 'monthly' : 'full';

  const { course, availableSeats, enrollStudent } = useCourseData();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState<string>(initialPlan);
  const [step, setStep] = useState<number>(1); // 1: Plan & Info, 2: Account Creation, 3: Confirmation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    hscYear: '2026',
    password: '',
    paymentMethod: 'bKash'
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Create student & register in store
      enrollStudent({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college
      });

      // Login student automatically
      login('student', formData.email, formData.password);

      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setStep(3);
    }
  };

  return (
    <div className="enroll-page-wrapper section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-pill">Online Admission</span>
          <h1 className="section-title">Enroll in Premium Biology Intensive</h1>
          <p className="section-subtitle">
            Secure one of the {availableSeats} remaining seats in Afroza Tahmina's 4-month cohort.
          </p>
        </div>

        {/* Progress Step Indicator */}
        <div className="enroll-steps-indicator">
          <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
            <span className="step-circle">{step > 1 ? <CheckCircle2 size={16} /> : '1'}</span>
            <span className="step-label">Select Plan & Info</span>
          </div>
          <div className="step-connector"></div>
          <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`}>
            <span className="step-circle">{step > 2 ? <CheckCircle2 size={16} /> : '2'}</span>
            <span className="step-label">Account Setup</span>
          </div>
          <div className="step-connector"></div>
          <div className={`step-item ${step === 3 ? 'active' : ''}`}>
            <span className="step-circle">3</span>
            <span className="step-label">Access Granted</span>
          </div>
        </div>

        <div className="enroll-container-card bio-card">
          {step === 1 && (
            <form onSubmit={handleNext}>
              <h3 className="enroll-step-title">Step 1: Choose Your Plan & Student Information</h3>

              {/* Plan Choice */}
              <div className="plans-selection-grid">
                <div 
                  className={`plan-select-box ${selectedPlan === 'full' ? 'selected' : ''}`}
                  onClick={() => setSelectedPlan('full')}
                >
                  <div className="plan-select-radio">
                    <input 
                      type="radio" 
                      name="plan" 
                      checked={selectedPlan === 'full'} 
                      onChange={() => setSelectedPlan('full')} 
                    />
                    <strong>Full 4-Month Course (Recommended)</strong>
                  </div>
                  <div className="plan-price-tag">৳{course.fullCourseFee.toLocaleString()}</div>
                  <p className="plan-note">Save ৳1,500 • Full access to all 48 classes and model tests</p>
                </div>

                <div 
                  className={`plan-select-box ${selectedPlan === 'monthly' ? 'selected' : ''}`}
                  onClick={() => setSelectedPlan('monthly')}
                >
                  <div className="plan-select-radio">
                    <input 
                      type="radio" 
                      name="plan" 
                      checked={selectedPlan === 'monthly'} 
                      onChange={() => setSelectedPlan('monthly')} 
                    />
                    <strong>Monthly Installment</strong>
                  </div>
                  <div className="plan-price-tag">৳{course.monthlyFee.toLocaleString()} / mo</div>
                  <p className="plan-note">Flexible monthly payments per 12 classes</p>
                </div>
              </div>

              {/* Student Fields */}
              <div className="form-group">
                <label className="form-label">Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariqul Islam"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">College / Higher Secondary Institution *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Notre Dame College"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">HSC Exam Year</label>
                  <select
                    value={formData.hscYear}
                    onChange={(e) => setFormData({ ...formData, hscYear: e.target.value })}
                    className="form-select"
                  >
                    <option value="2026">HSC 2026</option>
                    <option value="2027">HSC 2027</option>
                  </select>
                </div>
              </div>

              <div className="enroll-actions-row">
                <button type="submit" className="btn btn-primary btn-lg btn-block">
                  Continue to Account Setup <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext}>
              <h3 className="enroll-step-title">Step 2: Student Portal Account & Verification</h3>

              <div className="review-plan-box">
                <div className="review-item">
                  <span>Selected Program:</span>
                  <strong>{course.title}</strong>
                </div>
                <div className="review-item">
                  <span>Student Name:</span>
                  <strong>{formData.name} ({formData.phone})</strong>
                </div>
                <div className="review-item">
                  <span>Tuition Amount:</span>
                  <strong className="review-price">
                    ৳{selectedPlan === 'full' ? course.fullCourseFee.toLocaleString() : course.monthlyFee.toLocaleString()}
                  </strong>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Create Student Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="form-input"
                />
                <span className="input-hint">You will use this password to log in to the Student Portal.</span>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Payment Verification Method</label>
                <div className="payment-options-row">
                  {['bKash', 'Nagad', 'Rocket', 'Direct Bank Transfer'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: m })}
                      className={`payment-method-pill ${formData.paymentMethod === m ? 'active' : ''}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="step-2-actions">
                <button type="button" onClick={() => setStep(1)} className="btn btn-outline">
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="submit" className="btn btn-primary btn-lg flex-1">
                  Complete Enrollment & Enter Dashboard <Sparkles size={18} />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="confirmation-box text-center">
              <div className="confetti-icon-circle">
                <Sparkles size={40} />
              </div>

              <h2 className="confirm-title">Congratulations, {formData.name || "Student"}!</h2>
              <p className="confirm-subtitle">
                Your admission to the <strong>{course.title}</strong> has been confirmed.
              </p>

              <div className="confirm-meta-card bio-card">
                <div className="c-meta-row">
                  <span>Student ID:</span>
                  <strong>BE-2026-018</strong>
                </div>
                <div className="c-meta-row">
                  <span>Batch:</span>
                  <strong>{course.batchName}</strong>
                </div>
                <div className="c-meta-row">
                  <span>Enrollment Status:</span>
                  <span className="badge badge-green">Active Access</span>
                </div>
              </div>

              <p className="confirm-instructions">
                Your portal account is active. You can now browse all First & Second Paper chapters, view upcoming live classes, and access practice tests.
              </p>

              <div className="confirm-actions">
                <Link to="/student/dashboard" className="btn btn-primary btn-lg">
                  Go to Student Dashboard <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .enroll-steps-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        .step-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .step-item.active {
          color: var(--dark-green);
        }
        .step-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #E2E8F0;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
        }
        .step-item.active .step-circle {
          background: var(--dark-green);
          color: #FFFFFF;
        }
        .step-item.done .step-circle {
          background: var(--primary-green);
          color: #FFFFFF;
        }
        .step-connector {
          width: 40px;
          height: 2px;
          background: #E2E8F0;
        }

        .enroll-container-card {
          max-width: 720px;
          margin: 0 auto;
          padding: 3rem;
        }
        .enroll-step-title {
          font-size: 1.35rem;
          color: var(--dark-green);
          margin-bottom: 1.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .plans-selection-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .plan-select-box {
          border: 2px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .plan-select-box:hover {
          border-color: var(--primary-green);
        }
        .plan-select-box.selected {
          border-color: var(--dark-green);
          background: var(--light-green-subtle);
        }
        .plan-select-radio {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          color: var(--dark-green);
        }
        .plan-price-tag {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--dark-green);
          font-family: var(--font-heading);
          margin-bottom: 0.35rem;
        }
        .plan-note {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .input-hint {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        .review-plan-box {
          background: var(--light-green-subtle);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          margin-bottom: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .review-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--text-dark);
        }
        .review-price {
          color: var(--dark-green);
          font-size: 1.1rem;
        }
        .payment-options-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .payment-method-pill {
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-dark);
        }
        .payment-method-pill.active {
          background: var(--dark-green);
          color: #FFFFFF;
          border-color: var(--dark-green);
        }
        .step-2-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }
        .flex-1 {
          flex: 1;
        }

        /* Step 3 Confirmation */
        .confetti-icon-circle {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: var(--light-green);
          color: var(--dark-green);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .confirm-title {
          font-size: 2rem;
          color: var(--dark-green);
          margin-bottom: 0.5rem;
        }
        .confirm-subtitle {
          font-size: 1.05rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }
        .confirm-meta-card {
          background: var(--light-green-subtle);
          padding: 1.5rem;
          max-width: 440px;
          margin: 0 auto 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .c-meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }
        .confirm-instructions {
          font-size: 0.92rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .plans-selection-grid {
            grid-template-columns: 1fr;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
          }
          .enroll-container-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};
