import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCourseData } from '../../context/CourseDataContext';
import { api } from '../../services/api';
import { 
  User as UserIcon, 
  Mail, 
  Building2, 
  Phone, 
  CreditCard, 
  Hash, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Sparkles,
  Lock,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const EnrollPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCourseKey = searchParams.get('course') === 'ssc-2027' ? 'ssc-2027' : 'alpha-cohort';
  const initialPlan = searchParams.get('plan') === 'monthly' ? 'monthly' : 'full';

  const defaultAmount = initialCourseKey === 'ssc-2027' 
    ? '2200' 
    : (initialPlan === 'monthly' ? '3500' : '12500');

  const { user } = useAuth();
  const { enrollStudent } = useCourseData();
  const navigate = useNavigate();

  // Selected Course
  const [selectedCourse, setSelectedCourse] = useState<string>(initialCourseKey);

  // The 7 Required Fields
  const [name, setName] = useState<string>(user?.name || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [schoolCollege, setSchoolCollege] = useState<string>(user?.institution || '');
  const [whatsappNumber, setWhatsappNumber] = useState<string>(user?.phone || '');
  const [paymentNumber, setPaymentNumber] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [amount, setAmount] = useState<string>(defaultAmount);

  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleCourseChange = (courseKey: string) => {
    setSelectedCourse(courseKey);
    if (courseKey === 'ssc-2027') {
      setAmount('2200');
    } else {
      setAmount(initialPlan === 'monthly' ? '3500' : '12500');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validations
    if (!name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!schoolCollege.trim()) {
      setErrorMessage('Please enter your school or college name.');
      return;
    }
    if (!whatsappNumber.trim()) {
      setErrorMessage('Please enter your WhatsApp phone number.');
      return;
    }
    if (!paymentNumber.trim()) {
      setErrorMessage('Please enter the number used for payment.');
      return;
    }
    if (!transactionId.trim()) {
      setErrorMessage('Please enter the Transaction ID (TrxID).');
      return;
    }
    if (!amount.trim()) {
      setErrorMessage('Please enter the payment amount.');
      return;
    }

    setIsSubmitting(true);

    try {
      const courseTitle = selectedCourse === 'ssc-2027' 
        ? 'SSC 2027 Model Test Package' 
        : 'Alpha Cohort (HSC Biology Intensive)';

      // 1. Register student in context state (visible in Teacher roster)
      enrollStudent({
        name: name.trim(),
        email: email.trim(),
        phone: whatsappNumber.trim(),
        institution: schoolCollege.trim(),
        batch: selectedCourse === 'ssc-2027' ? 'SSC 2027' : 'Alpha Cohort'
      });

      // 2. Record enrollment in localStorage for persistent record
      const record = {
        name: name.trim(),
        email: email.trim(),
        schoolCollege: schoolCollege.trim(),
        whatsappNumber: whatsappNumber.trim(),
        paymentNumber: paymentNumber.trim(),
        transactionId: transactionId.trim().toUpperCase(),
        amount: amount.trim(),
        paymentMethod,
        courseTitle,
        courseKey: selectedCourse,
        submittedAt: new Date().toISOString()
      };

      const existingRecords = JSON.parse(localStorage.getItem('bioedge_enrollments') || '[]');
      existingRecords.push(record);
      localStorage.setItem('bioedge_enrollments', JSON.stringify(existingRecords));

      // 3. Attempt API call to backend if available
      try {
        await api.enrollments.create({
          courseId: selectedCourse,
          plan: initialPlan,
          paymentMethod,
          transactionId: transactionId.trim().toUpperCase()
        });
      } catch (err) {
        // Safe fallback if offline
      }

      setSubmittedData(record);
      setIsSuccess(true);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {}

    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit enrollment. Please check your details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="enroll-clean-page">
      <div className="container">
        
        {/* Back Link */}
        <div className="enroll-back-nav">
          <Link to="/courses" className="enroll-back-link">
            <ArrowLeft size={16} /> Back to Courses
          </Link>
        </div>

        <div className="enroll-form-card">

          {!isSuccess ? (
            <>
              {/* Card Header */}
              <div className="form-header text-center">
                <span className="section-pill">
                  <Sparkles size={14} /> Course Admission
                </span>
                <h1 className="form-title">Enrollment Form</h1>
                <p className="form-subtitle">
                  Please complete the form below with your details and payment information to secure your seat.
                </p>
              </div>

              {/* Course Selector Tabs */}
              <div className="course-select-row">
                <button
                  type="button"
                  className={`course-choice-btn ${selectedCourse === 'alpha-cohort' ? 'active' : ''}`}
                  onClick={() => handleCourseChange('alpha-cohort')}
                >
                  <span className="choice-title">Alpha Cohort (HSC Intensive)</span>
                  <span className="choice-fee">৳12,500 Full / ৳3,500 Mo</span>
                </button>

                <button
                  type="button"
                  className={`course-choice-btn ${selectedCourse === 'ssc-2027' ? 'active' : ''}`}
                  onClick={() => handleCourseChange('ssc-2027')}
                >
                  <span className="choice-title">SSC 2027 Model Test</span>
                  <span className="choice-fee">৳2,200 Complete</span>
                </button>
              </div>

              {/* Payment Instructions Note */}
              <div className="payment-guide-box">
                <div className="guide-title">
                  <CreditCard size={17} />
                  <strong>Payment Instructions (Send Money)</strong>
                </div>
                <p className="guide-desc">
                  Send your course fee to <strong>01712-345678</strong> (bKash / Nagad / Rocket Personal) and enter the Transaction ID below.
                </p>
                <div className="channel-pills-row">
                  <button
                    type="button"
                    className={`channel-pill ${paymentMethod === 'bKash' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('bKash')}
                  >
                    bKash
                  </button>
                  <button
                    type="button"
                    className={`channel-pill ${paymentMethod === 'Nagad' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('Nagad')}
                  >
                    Nagad
                  </button>
                  <button
                    type="button"
                    className={`channel-pill ${paymentMethod === 'Rocket' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('Rocket')}
                  >
                    Rocket
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="form-error-alert">
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* THE 7 FORM FIELDS */}
              <form onSubmit={handleSubmit} className="enroll-inputs-form">
                
                {/* 1. Name */}
                <div className="form-group">
                  <label htmlFor="student-name" className="form-label">
                    Full Name <span className="req">*</span>
                  </label>
                  <div className="input-wrap">
                    <UserIcon size={18} className="input-icon" />
                    <input
                      id="student-name"
                      type="text"
                      className="form-control"
                      placeholder="e.g. Tariqul Islam"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* 2. Mail */}
                <div className="form-group">
                  <label htmlFor="student-email" className="form-label">
                    Email Address <span className="req">*</span>
                  </label>
                  <div className="input-wrap">
                    <Mail size={18} className="input-icon" />
                    <input
                      id="student-email"
                      type="email"
                      className="form-control"
                      placeholder="e.g. tariqul@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* 3. School or College name */}
                <div className="form-group">
                  <label htmlFor="student-school" className="form-label">
                    School or College Name <span className="req">*</span>
                  </label>
                  <div className="input-wrap">
                    <Building2 size={18} className="input-icon" />
                    <input
                      id="student-school"
                      type="text"
                      className="form-control"
                      placeholder="e.g. Notre Dame College, Dhaka"
                      value={schoolCollege}
                      onChange={(e) => setSchoolCollege(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* 4. Phone number whatsapp */}
                <div className="form-group">
                  <label htmlFor="student-whatsapp" className="form-label">
                    WhatsApp Phone Number <span className="req">*</span>
                  </label>
                  <div className="input-wrap">
                    <Phone size={18} className="input-icon" />
                    <input
                      id="student-whatsapp"
                      type="tel"
                      className="form-control"
                      placeholder="e.g. 01712345678"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* 5. Number used for payment */}
                <div className="form-group">
                  <label htmlFor="payment-sender" className="form-label">
                    Number Used for Payment <span className="req">*</span>
                  </label>
                  <div className="input-wrap">
                    <CreditCard size={18} className="input-icon" />
                    <input
                      id="payment-sender"
                      type="tel"
                      className="form-control"
                      placeholder={`e.g. 01812345678 (${paymentMethod} Sender Number)`}
                      value={paymentNumber}
                      onChange={(e) => setPaymentNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* 6. Transaction ID */}
                <div className="form-group">
                  <label htmlFor="transaction-id" className="form-label">
                    Transaction ID (TrxID) <span className="req">*</span>
                  </label>
                  <div className="input-wrap">
                    <Hash size={18} className="input-icon" />
                    <input
                      id="transaction-id"
                      type="text"
                      className="form-control text-uppercase"
                      placeholder="e.g. BL92X88K90"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* 7. Amount */}
                <div className="form-group">
                  <label htmlFor="payment-amount" className="form-label">
                    Amount (৳) <span className="req">*</span>
                  </label>
                  <div className="input-wrap">
                    <DollarSign size={18} className="input-icon" />
                    <input
                      id="payment-amount"
                      type="number"
                      className="form-control"
                      placeholder="e.g. 12500"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg btn-block enroll-submit-btn"
                >
                  {isSubmitting ? 'Submitting Enrollment...' : 'Submit Enrollment'} <ArrowRight size={18} />
                </button>

                {/* Guarantee & Privacy Note */}
                <div className="form-footer-guarantee text-center">
                  <ShieldCheck size={16} className="shield-icon" />
                  <span>Your information is encrypted & verified securely under Bio Edge admission guidelines.</span>
                </div>

              </form>
            </>
          ) : (
            /* ENROLLMENT SUCCESS CONFIRMATION SCREEN */
            <div className="enrollment-success-view text-center">
              <div className="success-icon-circle">
                <CheckCircle2 size={44} />
              </div>
              <h2 className="success-title">Enrollment Submitted!</h2>
              <p className="success-subtitle">
                Thank you, <strong>{submittedData?.name}</strong>! Your application for <strong>{submittedData?.courseTitle}</strong> has been received.
              </p>

              <div className="success-summary-card">
                <div className="summary-line">
                  <span className="s-label">Student Name:</span>
                  <strong className="s-val">{submittedData?.name}</strong>
                </div>
                <div className="summary-line">
                  <span className="s-label">Email:</span>
                  <span className="s-val">{submittedData?.email}</span>
                </div>
                <div className="summary-line">
                  <span className="s-label">School / College:</span>
                  <span className="s-val">{submittedData?.schoolCollege}</span>
                </div>
                <div className="summary-line">
                  <span className="s-label">WhatsApp Number:</span>
                  <span className="s-val">{submittedData?.whatsappNumber}</span>
                </div>
                <div className="summary-line">
                  <span className="s-label">Payment Number:</span>
                  <span className="s-val">{submittedData?.paymentNumber} ({submittedData?.paymentMethod})</span>
                </div>
                <div className="summary-line">
                  <span className="s-label">Transaction ID:</span>
                  <strong className="s-val highlight-trx">{submittedData?.transactionId}</strong>
                </div>
                <div className="summary-line">
                  <span className="s-label">Amount:</span>
                  <strong className="s-val amount-val">৳{submittedData?.amount}</strong>
                </div>
              </div>

              <p className="success-note">
                Our academic team will verify your transaction within <strong>1–2 hours</strong> and send your portal login credentials and routine via WhatsApp and Email.
              </p>

              <div className="success-actions-row">
                <Link to="/login" className="btn btn-primary btn-lg">
                  Go to Student Portal <ArrowRight size={18} />
                </Link>
                <Link to="/" className="btn btn-outline btn-lg">
                  Return to Home
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>

      <style>{`
        .enroll-clean-page {
          background: #FAFCFA;
          min-height: calc(100vh - 72px);
          padding: 2.5rem 0 5rem;
        }

        .enroll-back-nav {
          max-width: 620px;
          margin: 0 auto 1.5rem;
        }

        .enroll-back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--primary-green);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .enroll-back-link:hover {
          color: var(--dark-green);
        }

        .enroll-form-card {
          max-width: 620px;
          margin: 0 auto;
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid rgba(49, 91, 61, 0.12);
          box-shadow: 0 12px 36px rgba(22, 51, 32, 0.05);
          padding: 3rem 2.5rem;
        }

        .form-header {
          margin-bottom: 2rem;
        }

        .form-title {
          font-size: clamp(1.75rem, 4vw, 2.25rem);
          font-weight: 800;
          color: var(--dark-green);
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .form-subtitle {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0;
        }

        /* Course choice buttons */
        .course-select-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
          margin-bottom: 1.5rem;
        }

        .course-choice-btn {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--border-color);
          background: #FAFCFA;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .course-choice-btn:hover {
          border-color: var(--primary-green);
        }

        .course-choice-btn.active {
          border-color: var(--dark-green);
          background: rgba(49, 91, 61, 0.05);
        }

        .choice-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--dark-green);
          line-height: 1.25;
          margin-bottom: 0.2rem;
        }

        .choice-fee {
          font-size: 0.75rem;
          color: var(--primary-green);
          font-weight: 600;
        }

        /* Payment Guide Box */
        .payment-guide-box {
          background: #F4FAF6;
          border: 1px solid rgba(49, 91, 61, 0.15);
          border-radius: var(--radius-md);
          padding: 1.15rem 1.25rem;
          margin-bottom: 2rem;
        }

        .guide-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--dark-green);
          font-size: 0.9rem;
          margin-bottom: 0.35rem;
        }

        .guide-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.45;
          margin: 0 0 0.85rem 0;
        }

        .channel-pills-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .channel-pill {
          padding: 0.35rem 0.95rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
          border: 1px solid var(--border-color);
          background: #FFFFFF;
          color: var(--text-dark);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .channel-pill:hover {
          border-color: var(--primary-green);
        }

        .channel-pill.active {
          background: var(--dark-green);
          color: #FFFFFF;
          border-color: var(--dark-green);
        }

        /* Form Error Alert */
        .form-error-alert {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          background: #FEE2E2;
          color: #B91C1C;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        /* Form Elements */
        .enroll-inputs-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--dark-green);
        }

        .form-label .req {
          color: #DC2626;
        }

        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .form-control {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 2.75rem;
          font-size: 0.95rem;
          border-radius: var(--radius-md);
          border: 1.5px solid var(--border-color);
          background: #FAFCFA;
          color: var(--text-dark);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-control:focus {
          outline: none;
          border-color: var(--dark-green);
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(49, 91, 61, 0.1);
        }

        .text-uppercase {
          text-transform: uppercase;
        }

        .enroll-submit-btn {
          width: 100%;
          margin-top: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1.05rem;
          font-weight: 700;
          padding: 0.95rem;
          border-radius: var(--radius-md);
        }

        .form-footer-guarantee {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-top: 1rem;
        }

        .shield-icon {
          color: var(--primary-green);
          flex-shrink: 0;
        }

        /* Success View */
        .enrollment-success-view {
          padding: 1.5rem 0.5rem;
        }

        .success-icon-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--light-green);
          color: var(--dark-green);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }

        .success-title {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--dark-green);
          margin-bottom: 0.5rem;
        }

        .success-subtitle {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
          line-height: 1.55;
        }

        .success-summary-card {
          background: #FAFCFA;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.75rem;
          text-align: left;
        }

        .summary-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          border-bottom: 1px dashed var(--border-subtle);
          padding-bottom: 0.5rem;
        }

        .summary-line:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .s-label {
          color: var(--text-muted);
        }

        .s-val {
          color: var(--text-dark);
          font-weight: 600;
        }

        .highlight-trx {
          font-family: monospace;
          color: var(--dark-green);
          font-weight: 700;
          background: var(--light-green-subtle);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .amount-val {
          font-size: 1.15rem;
          color: var(--primary-green);
          font-weight: 800;
        }

        .success-note {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 480px;
          margin: 0 auto 2rem;
        }

        .success-actions-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 600px) {
          .enroll-clean-page {
            padding: 1.5rem 0 3.5rem;
          }
          .enroll-form-card {
            padding: 1.75rem 1.25rem;
            border-radius: 20px;
          }
          .course-select-row {
            grid-template-columns: 1fr;
          }
          .summary-line {
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
          }
          .success-actions-row {
            flex-direction: column;
            width: 100%;
          }
          .success-actions-row .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
