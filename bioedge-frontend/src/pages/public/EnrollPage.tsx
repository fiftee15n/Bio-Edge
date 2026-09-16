import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
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
  DollarSign,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const EnrollPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const courseKey = searchParams.get('course') === 'ssc-2027' ? 'ssc-2027' : 'alpha-cohort';
  const plan = searchParams.get('plan') === 'monthly' ? 'monthly' : 'full';

  const defaultAmount = courseKey === 'ssc-2027' 
    ? '2200' 
    : (plan === 'monthly' ? '3500' : '12500');

  const courseTitle = courseKey === 'ssc-2027'
    ? 'SSC 2027 Model Test Package'
    : 'Alpha Cohort (HSC Biology Intensive)';

  const { user } = useAuth();
  const { enrollStudent } = useCourseData();

  // The 7 Required Fields
  const [name, setName] = useState<string>(user?.name || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [schoolCollege, setSchoolCollege] = useState<string>(user?.institution || '');
  const [whatsappNumber, setWhatsappNumber] = useState<string>(user?.phone || '');
  const [paymentNumber, setPaymentNumber] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [amount, setAmount] = useState<string>(defaultAmount);

  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Rocket' | 'Cash'>('bKash');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validations
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
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
    if (paymentMethod !== 'Cash' && !paymentNumber.trim()) {
      setErrorMessage('Please enter the number used for payment.');
      return;
    }
    if (paymentMethod !== 'Cash' && !transactionId.trim()) {
      setErrorMessage('Please enter the Transaction ID (TrxID).');
      return;
    }
    if (!amount.trim()) {
      setErrorMessage('Please enter the payment amount.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Register student in context state (visible in Teacher roster)
      enrollStudent({
        name: name.trim(),
        email: email.trim(),
        phone: whatsappNumber.trim(),
        institution: schoolCollege.trim(),
        batch: courseKey === 'ssc-2027' ? 'SSC 2027' : 'Alpha Cohort'
      });

      const finalPaymentNumber = paymentNumber.trim() || (paymentMethod === 'Cash' ? (whatsappNumber.trim() || 'Cash in Person') : '');
      const finalTransactionId = transactionId.trim().toUpperCase() || (paymentMethod === 'Cash' ? 'CASH' : '');

      // 2. Record enrollment in localStorage for persistence
      const record = {
        name: name.trim(),
        email: email.trim(),
        schoolCollege: schoolCollege.trim(),
        whatsappNumber: whatsappNumber.trim(),
        paymentNumber: finalPaymentNumber,
        transactionId: finalTransactionId,
        amount: amount.trim(),
        paymentMethod,
        courseTitle,
        courseKey,
        submittedAt: new Date().toISOString()
      };

      const existingRecords = JSON.parse(localStorage.getItem('bioedge_enrollments') || '[]');
      existingRecords.push(record);
      localStorage.setItem('bioedge_enrollments', JSON.stringify(existingRecords));

      // 3. Attempt API call to backend if available
      try {
        await api.enrollments.create({
          courseId: courseKey,
          plan,
          paymentMethod,
          transactionId: finalTransactionId
        });
      } catch (err) {
        // Safe fallback
      }

      setSubmittedData(record);
      setIsSuccess(true);

      // Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
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
    <div className="enroll-compact-page">
      <div className="container">
        
        {/* Back Link */}
        <div className="enroll-top-nav">
          <Link to="/courses" className="enroll-top-back">
            <ArrowLeft size={15} /> Back to Courses
          </Link>
        </div>

        <div className="enroll-compact-card">

          {!isSuccess ? (
            <>
              {/* Compact Header */}
              <div className="compact-header">
                <div className="header-badge-row">
                  <span className="course-target-pill">{courseTitle}</span>
                </div>
                <h1 className="compact-title">Enrollment Form</h1>
                <p className="compact-subtitle">
                  Send course fee to <strong>01712-345678</strong> (bKash / Nagad / Rocket) or choose <strong>Cash</strong>, and complete the form below.
                </p>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="compact-error-alert">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* THE FORM FIELDS (COMPACT 2-COLUMN GRID) */}
              <form onSubmit={handleSubmit} className="compact-form">
                
                <div className="form-grid-2col">
                  {/* 1. Name */}
                  <div className="form-item">
                    <label htmlFor="student-name" className="form-label">
                      Name <span className="req">*</span>
                    </label>
                    <div className="input-wrap">
                      <UserIcon size={16} className="input-icon" />
                      <input
                        id="student-name"
                        type="text"
                        className="form-control"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* 2. Mail */}
                  <div className="form-item">
                    <label htmlFor="student-email" className="form-label">
                      Mail <span className="req">*</span>
                    </label>
                    <div className="input-wrap">
                      <Mail size={16} className="input-icon" />
                      <input
                        id="student-email"
                        type="email"
                        className="form-control"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* 3. School or College name */}
                  <div className="form-item">
                    <label htmlFor="student-school" className="form-label">
                      School or College name <span className="req">*</span>
                    </label>
                    <div className="input-wrap">
                      <Building2 size={16} className="input-icon" />
                      <input
                        id="student-school"
                        type="text"
                        className="form-control"
                        placeholder="School or College"
                        value={schoolCollege}
                        onChange={(e) => setSchoolCollege(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* 4. Phone Number (WhatsApp preferred) */}
                  <div className="form-item">
                    <label htmlFor="student-whatsapp" className="form-label">
                      Phone Number (WhatsApp preferred) <span className="req">*</span>
                    </label>
                    <div className="input-wrap">
                      <Phone size={16} className="input-icon" />
                      <input
                        id="student-whatsapp"
                        type="tel"
                        className="form-control"
                        placeholder="017XXXXXXXX"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* 5. Payment Option */}
                  <div className="form-item">
                    <label className="form-label">
                      Payment Option <span className="req">*</span>
                    </label>
                    <div className="payment-options-wrap">
                      {(['bKash', 'Nagad', 'Rocket', 'Cash'] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          className={`pay-opt-pill ${paymentMethod === method ? 'active' : ''}`}
                          onClick={() => setPaymentMethod(method)}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 6. Number used for payment */}
                  <div className="form-item">
                    <label htmlFor="payment-sender" className="form-label">
                      {paymentMethod === 'Cash' ? 'Contact / Reference No.' : 'Number used for payment'}{' '}
                      {paymentMethod === 'Cash' ? <span className="opt-tag">(Optional)</span> : <span className="req">*</span>}
                    </label>
                    <div className="input-wrap">
                      <CreditCard size={16} className="input-icon" />
                      <input
                        id="payment-sender"
                        type={paymentMethod === 'Cash' ? 'text' : 'tel'}
                        className="form-control"
                        placeholder={paymentMethod === 'Cash' ? 'e.g. Phone or Cash in Person' : `Sender ${paymentMethod} number`}
                        value={paymentNumber}
                        onChange={(e) => setPaymentNumber(e.target.value)}
                        required={paymentMethod !== 'Cash'}
                      />
                    </div>
                  </div>

                  {/* 7. Transaction ID */}
                  <div className="form-item">
                    <label htmlFor="transaction-id" className="form-label">
                      Transaction ID{' '}
                      {paymentMethod === 'Cash' ? <span className="opt-tag">(Receipt or CASH)</span> : <span className="req">*</span>}
                    </label>
                    <div className="input-wrap">
                      <Hash size={16} className="input-icon" />
                      <input
                        id="transaction-id"
                        type="text"
                        className="form-control text-uppercase"
                        placeholder={paymentMethod === 'Cash' ? 'Receipt No. or CASH' : 'TrxID (e.g. BL92X88K)'}
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        required={paymentMethod !== 'Cash'}
                      />
                    </div>
                  </div>

                  {/* 8. Amount */}
                  <div className="form-item">
                    <label htmlFor="payment-amount" className="form-label">
                      Amount <span className="req">*</span>
                    </label>
                    <div className="input-wrap">
                      <DollarSign size={16} className="input-icon" />
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
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-block compact-submit-btn"
                >
                  {isSubmitting ? 'Processing Enrollment...' : 'Submit Enrollment'} <ArrowRight size={17} />
                </button>

                {/* Trust Line */}
                <div className="compact-trust-note">
                  <ShieldCheck size={14} />
                  <span>Secure & verified admission under Bio Edge guidelines.</span>
                </div>

              </form>
            </>
          ) : (
            /* COMPACT SUCCESS RECEIPT */
            <div className="compact-success-view text-center">
              <div className="success-icon-badge">
                <CheckCircle2 size={36} />
              </div>
              <h2 className="success-title">Enrollment Submitted!</h2>
              <p className="success-desc">
                Thank you, <strong>{submittedData?.name}</strong>! Your payment for <strong>{submittedData?.courseTitle}</strong> is recorded.
              </p>

              <div className="compact-receipt-card">
                <div className="receipt-row">
                  <span>Name:</span>
                  <strong>{submittedData?.name}</strong>
                </div>
                <div className="receipt-row">
                  <span>Mail:</span>
                  <span>{submittedData?.email}</span>
                </div>
                <div className="receipt-row">
                  <span>School/College:</span>
                  <span>{submittedData?.schoolCollege}</span>
                </div>
                <div className="receipt-row">
                  <span>Phone (WhatsApp):</span>
                  <span>{submittedData?.whatsappNumber}</span>
                </div>
                <div className="receipt-row">
                  <span>Payment Option:</span>
                  <strong>{submittedData?.paymentMethod}</strong>
                </div>
                <div className="receipt-row">
                  <span>Payment Number:</span>
                  <span>{submittedData?.paymentNumber}</span>
                </div>
                <div className="receipt-row">
                  <span>TrxID:</span>
                  <strong className="code-tag">{submittedData?.transactionId}</strong>
                </div>
                <div className="receipt-row">
                  <span>Amount:</span>
                  <strong className="amt-tag">৳{submittedData?.amount}</strong>
                </div>
              </div>

              <p className="receipt-footer-text">
                Portal access and class link will be activated within <strong>1–2 hours</strong> after verification.
              </p>

              <div className="receipt-actions">
                <Link to="/login" className="btn btn-primary">
                  Go to Student Portal <ArrowRight size={16} />
                </Link>
                <Link to="/" className="btn btn-outline">
                  Return Home
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>

      <style>{`
        .enroll-compact-page {
          background: #FAFCFA;
          min-height: calc(100vh - 72px);
          padding: 1.5rem 0 3rem;
        }

        .enroll-top-nav {
          max-width: 580px;
          margin: 0 auto 0.85rem;
        }

        .enroll-top-back {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--primary-green);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .enroll-top-back:hover {
          color: var(--dark-green);
        }

        .enroll-compact-card {
          max-width: 580px;
          margin: 0 auto;
          background: #FFFFFF;
          border-radius: 18px;
          border: 1px solid rgba(49, 91, 61, 0.12);
          box-shadow: 0 8px 24px rgba(22, 51, 32, 0.04);
          padding: 2rem 2.25rem;
        }

        .compact-header {
          text-align: center;
          margin-bottom: 1.25rem;
        }

        .header-badge-row {
          display: flex;
          justify-content: center;
          margin-bottom: 0.4rem;
        }

        .course-target-pill {
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--dark-green);
          background: var(--light-green);
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }

        .compact-title {
          font-size: 1.55rem;
          font-weight: 800;
          color: var(--dark-green);
          margin: 0 0 0.35rem;
        }

        .compact-subtitle {
          font-size: 0.86rem;
          color: var(--text-muted);
          line-height: 1.45;
          margin: 0;
        }

        /* Payment Options Selector in Form */
        .payment-options-wrap {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.3rem;
          height: 38px;
        }

        .pay-opt-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          font-weight: 700;
          border: 1.5px solid var(--border-color);
          background: #FAFCFA;
          color: var(--text-dark);
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 0 0.15rem;
          white-space: nowrap;
        }

        .pay-opt-pill:hover {
          border-color: var(--primary-green);
          background: #FFFFFF;
        }

        .pay-opt-pill.active {
          background: var(--dark-green);
          color: #FFFFFF;
          border-color: var(--dark-green);
          box-shadow: 0 2px 6px rgba(49, 91, 61, 0.25);
        }

        .opt-tag {
          font-size: 0.72rem;
          font-weight: normal;
          color: var(--text-muted);
        }

        /* Error Alert */
        .compact-error-alert {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #FEE2E2;
          color: #B91C1C;
          padding: 0.6rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        /* 2-Column Form Grid */
        .compact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-grid-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
        }

        .col-span-2 {
          grid-column: span 2;
        }

        .form-item {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .form-label {
          font-size: 0.8rem;
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
          left: 0.75rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .form-control {
          width: 100%;
          padding: 0.58rem 0.75rem 0.58rem 2.25rem;
          font-size: 0.88rem;
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
          box-shadow: 0 0 0 2px rgba(49, 91, 61, 0.1);
        }

        .text-uppercase {
          text-transform: uppercase;
        }

        .compact-submit-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 700;
          padding: 0.75rem;
          border-radius: var(--radius-md);
          margin-top: 0.25rem;
        }

        .compact-trust-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-size: 0.74rem;
          color: var(--text-muted);
          text-align: center;
        }

        /* Success Receipt */
        .compact-success-view {
          padding: 1rem 0;
        }

        .success-icon-badge {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--light-green);
          color: var(--dark-green);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .success-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--dark-green);
          margin: 0 0 0.35rem;
        }

        .success-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin: 0 0 1.25rem;
          line-height: 1.45;
        }

        .compact-receipt-card {
          background: #FAFCFA;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          text-align: left;
        }

        .receipt-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.84rem;
          border-bottom: 1px dashed var(--border-subtle);
          padding-bottom: 0.35rem;
        }

        .receipt-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .receipt-row span {
          color: var(--text-muted);
        }

        .code-tag {
          font-family: monospace;
          background: var(--light-green-subtle);
          padding: 1px 6px;
          border-radius: 4px;
          color: var(--dark-green);
        }

        .amt-tag {
          color: var(--primary-green);
          font-size: 0.98rem;
          font-weight: 800;
        }

        .receipt-footer-text {
          font-size: 0.82rem;
          color: var(--text-muted);
          margin: 0 0 1.5rem;
          line-height: 1.5;
        }

        .receipt-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        @media (max-width: 580px) {
          .enroll-compact-page {
            padding: 1rem 0 2.5rem;
          }
          .enroll-compact-card {
            padding: 1.5rem 1.15rem;
            border-radius: 16px;
          }
          .form-grid-2col {
            grid-template-columns: 1fr;
          }
          .col-span-2 {
            grid-column: span 1;
          }
          .receipt-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
          }
          .receipt-actions {
            flex-direction: column;
            width: 100%;
          }
          .receipt-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
