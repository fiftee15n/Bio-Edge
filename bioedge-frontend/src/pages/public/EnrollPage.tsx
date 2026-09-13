import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { BackendCourse } from '../../types';
import { VerifyEmailForm } from '../../components/common/VerifyEmailForm';
import { 
  CheckCircle2, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  Lock,
  ArrowLeft,
  GraduationCap,
  Target,
  Award,
  BookOpen,
  Calendar,
  Clock,
  User as UserIcon,
  Phone,
  Building2,
  Mail,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const EnrollPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCourseKey = searchParams.get('course') === 'ssc-2027' ? 'ssc-2027' : 'alpha-cohort';
  const initialPlan = searchParams.get('plan') === 'monthly' ? 'monthly' : 'full';

  const { user, isAuthenticated, register, login, loginWithGoogle, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Course state from authoritative backend
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>(initialCourseKey);
  const [selectedPlan, setSelectedPlan] = useState<string>(initialPlan);
  const [courseData, setCourseData] = useState<BackendCourse | null>(null);
  const [isLoadingCourse, setIsLoadingCourse] = useState<boolean>(true);

  // Authentication sub-flow for unauthenticated visitors
  const [authMode, setAuthMode] = useState<'register' | 'login' | 'verify'>('register');
  const [verifyEmailTarget, setVerifyEmailTarget] = useState<string>('');
  const [initialOtpCode, setInitialOtpCode] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Unauthenticated register inputs
  const [authFormData, setAuthFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    institution: '',
    examYear: initialCourseKey === 'ssc-2027' ? 'SSC 2027' : 'HSC 2026'
  });

  // Login inputs
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  // Enrollment submission state
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [transactionId, setTransactionId] = useState<string>('');
  const [isSubmittingEnrollment, setIsSubmittingEnrollment] = useState<boolean>(false);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState<any>(null);
  const [enrollmentError, setEnrollmentError] = useState<string>('');

  // Fetch authoritative course data from backend API
  useEffect(() => {
    const fetchAuthoritativeCourse = async () => {
      setIsLoadingCourse(true);
      try {
        const res = await api.courses.getBySlug(selectedCourseSlug);
        if (res.success && res.course) {
          setCourseData(res.course);
        }
      } catch (err) {
        console.error('Failed to load authoritative course:', err);
      } finally {
        setIsLoadingCourse(false);
      }
    };

    fetchAuthoritativeCourse();
  }, [selectedCourseSlug]);

  const handleCourseChange = (slug: string) => {
    setSelectedCourseSlug(slug);
    if (slug === 'ssc-2027') {
      setSelectedPlan('full');
      setAuthFormData(prev => ({ ...prev, examYear: 'SSC 2027' }));
    } else {
      setAuthFormData(prev => ({ ...prev, examYear: 'HSC 2026' }));
    }
  };

  // Google Authentication
  const handleGoogleAuth = async () => {
    setAuthError('');
    const res = await loginWithGoogle();
    if (res.success) {
      // Authenticated! Remains on enrollment page with course preserved
    } else {
      setAuthError(res.message || 'Google sign-in failed');
    }
  };

  // Email & Password Registration
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (authFormData.password !== authFormData.confirmPassword) {
      setAuthError('Passwords do not match.');
      return;
    }

    const res = await register({
      name: authFormData.name,
      email: authFormData.email,
      password: authFormData.password,
      confirmPassword: authFormData.confirmPassword,
      phone: authFormData.phone,
      institution: authFormData.institution,
      examYear: authFormData.examYear,
      targetCourse: selectedCourseSlug
    });

    if (res.success && res.requiresVerification) {
      setVerifyEmailTarget(res.email || authFormData.email);
      setInitialOtpCode(res.verificationCode || '');
      setAuthMode('verify');
    } else if (res.success && res.user) {
      // Auto-verified & logged in
    } else {
      setAuthError(res.message || 'Registration failed.');
    }
  };

  // Sign In
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const res = await login(loginEmail, loginPassword, 'student');
    if (res.success) {
      // User is logged in!
    } else if (res.requiresVerification && res.email) {
      setVerifyEmailTarget(res.email);
      setInitialOtpCode(res.verificationCode || '');
      setAuthMode('verify');
    } else {
      setAuthError(res.message || 'Invalid email or password');
    }
  };

  // Final Enrollment Submission (Calling backend with DB authoritative pricing)
  const handleFinalEnrollmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingEnrollment(true);
    setEnrollmentError('');

    try {
      const res = await api.enrollments.create({
        courseId: selectedCourseSlug,
        plan: selectedPlan,
        paymentMethod,
        transactionId: transactionId || `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`
      });

      if (res.success) {
        setEnrollmentSuccess(res.enrollment);
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch (err) {}
      } else {
        setEnrollmentError(res.message || 'Enrollment could not be processed.');
      }
    } catch (err: any) {
      setEnrollmentError(err.message || 'Error communicating with backend.');
    } finally {
      setIsSubmittingEnrollment(false);
    }
  };

  const isSsc = selectedCourseSlug === 'ssc-2027';

  // Authoritative figures from database
  const fullFee = courseData ? courseData.fullFee : (isSsc ? 2200 : 12500);
  const monthlyFee = courseData ? courseData.monthlyFee : 3500;
  const activeFee = (selectedPlan === 'monthly' && !isSsc) ? monthlyFee : fullFee;
  const availableSeats = courseData ? courseData.availableSeats : (isSsc ? 11 : 6);
  const seatLimit = courseData ? courseData.seatLimit : (isSsc ? 30 : 20);

  return (
    <div className="enroll-page-wrapper section-padding">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-pill">Online Admission & Enrollment</span>
          <h1 className="section-title">
            {isSsc ? 'Enroll in SSC 2027 Model Test Package' : 'Enroll in Premium HSC Biology Intensive'}
          </h1>
          <p className="section-subtitle">
            {isSsc 
              ? 'Join the dedicated 20-test board evaluation batch mentored directly by Afroza Tahmina.'
              : `Secure one of the ${availableSeats} remaining seats in Afroza Tahmina's 4-month Alpha Cohort.`
            }
          </p>
        </div>

        {/* Course Switcher Tabs */}
        {!enrollmentSuccess && (
          <div className="program-selection-wrapper">
            <div className="program-tab-grid">
              <button
                type="button"
                className={`program-select-tab ${selectedCourseSlug === 'alpha-cohort' ? 'active' : ''}`}
                onClick={() => handleCourseChange('alpha-cohort')}
              >
                <div className="p-tab-icon green">
                  <GraduationCap size={20} />
                </div>
                <div className="p-tab-text">
                  <strong>Alpha Cohort (HSC Intensive)</strong>
                  <span>Biology 1st & 2nd Paper • 48 Masterclasses • ৳12,500</span>
                </div>
              </button>

              <button
                type="button"
                className={`program-select-tab ${selectedCourseSlug === 'ssc-2027' ? 'active' : ''}`}
                onClick={() => handleCourseChange('ssc-2027')}
              >
                <div className="p-tab-icon amber">
                  <Target size={20} />
                </div>
                <div className="p-tab-text">
                  <strong>SSC 2027 Model Test Package</strong>
                  <span>20 Board Standard Tests & Evaluation • ৳2,200</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Main Enrollment Layout */}
        {!enrollmentSuccess ? (
          <div className="enrollment-dual-grid">
            {/* Left Column: Authoritative Course Summary Card */}
            <div className="enrollment-summary-col">
              <div className="summary-card bio-card">
                <div className="summary-card-header">
                  <span className={`badge ${isSsc ? 'badge-amber' : 'badge-green'}`}>
                    {isSsc ? 'SSC 2027 Batch' : 'Flagship HSC Cohort'}
                  </span>
                  <h2 className="summary-course-title">
                    {courseData?.title || (isSsc ? 'SSC 2027 Model Test Package' : 'Alpha Cohort — 4-Month Crash Course')}
                  </h2>
                  <p className="summary-course-desc">
                    {courseData?.subtitle || 'Complete Biology syllabus preparation with personalized faculty attention.'}
                  </p>
                </div>

                {/* Key Program Specifications */}
                <div className="summary-meta-list">
                  <div className="summary-meta-item">
                    <Clock size={17} className="meta-icon" />
                    <div>
                      <span className="meta-label">Program Duration</span>
                      <strong className="meta-value">{courseData?.duration || (isSsc ? '2.5 Months' : '4 Months')}</strong>
                    </div>
                  </div>

                  <div className="summary-meta-item">
                    <BookOpen size={17} className="meta-icon" />
                    <div>
                      <span className="meta-label">Total Classes / Tests</span>
                      <strong className="meta-value">{courseData?.totalClasses || (isSsc ? 20 : 48)} Sessions</strong>
                    </div>
                  </div>

                  <div className="summary-meta-item">
                    <Users size={17} className="meta-icon" />
                    <div>
                      <span className="meta-label">Batch Size & Seats</span>
                      <strong className="meta-value">Max {seatLimit} Students ({availableSeats} seats left)</strong>
                    </div>
                  </div>

                  <div className="summary-meta-item">
                    <Award size={17} className="meta-icon" />
                    <div>
                      <span className="meta-label">Lead Instructor</span>
                      <strong className="meta-value">Afroza Tahmina (Senior Faculty)</strong>
                    </div>
                  </div>
                </div>

                {/* Pricing Plan Selector */}
                <div className="summary-pricing-box">
                  <label className="pricing-box-label">Authoritative Tuition Fee (from Database):</label>
                  
                  {!isSsc ? (
                    <div className="plan-choice-container">
                      <div 
                        className={`plan-option-row ${selectedPlan === 'full' ? 'active' : ''}`}
                        onClick={() => setSelectedPlan('full')}
                      >
                        <input 
                          type="radio" 
                          name="plan" 
                          checked={selectedPlan === 'full'} 
                          onChange={() => setSelectedPlan('full')} 
                        />
                        <div className="plan-text-col">
                          <strong>Full 4-Month Course (Best Value)</strong>
                          <span>Includes all 48 classes, CQ evaluations & 8 model tests</span>
                        </div>
                        <div className="plan-fee-tag">
                          <span className="old-fee"><del>৳14,000</del></span>
                          <strong>৳{fullFee.toLocaleString()}</strong>
                        </div>
                      </div>

                      <div 
                        className={`plan-option-row ${selectedPlan === 'monthly' ? 'active' : ''}`}
                        onClick={() => setSelectedPlan('monthly')}
                      >
                        <input 
                          type="radio" 
                          name="plan" 
                          checked={selectedPlan === 'monthly'} 
                          onChange={() => setSelectedPlan('monthly')} 
                        />
                        <div className="plan-text-col">
                          <strong>Monthly Installment</strong>
                          <span>Flexible payments per 12 classes</span>
                        </div>
                        <div className="plan-fee-tag">
                          <strong>৳{monthlyFee.toLocaleString()} / mo</strong>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="ssc-fee-display">
                      <div className="ssc-fee-content">
                        <span className="old-fee"><del>৳3,000</del></span>
                        <strong className="ssc-price">৳{fullFee.toLocaleString()}</strong>
                        <span className="ssc-discount-badge">Save ৳800 Early Bird</span>
                      </div>
                      <p className="ssc-note">Full access to 20 Model Tests, handwritten evaluation & live doubt clearing.</p>
                    </div>
                  )}

                  {/* Summary Total */}
                  <div className="summary-total-row">
                    <span>Payable Amount:</span>
                    <span className="total-figure">৳{activeFee.toLocaleString()} {selectedPlan === 'monthly' && !isSsc ? '/ mo' : ''}</span>
                  </div>
                </div>

                <div className="trust-seal-row">
                  <ShieldCheck size={16} />
                  <span>Official Bio Edge Guarantee • Limited batch to ensure individual attention</span>
                </div>
              </div>
            </div>

            {/* Right Column: Authenticated Enrollment OR Unauthenticated Sign-in/Register */}
            <div className="enrollment-action-col">
              <div className="action-card bio-card">
                {/* SCENARIO B: User IS Authenticated -> Show Final Confirmation & Payment */}
                {isAuthenticated && user ? (
                  <div>
                    <div className="authenticated-user-badge">
                      <div className="user-avatar-initial">
                        {user.name.charAt(0)}
                      </div>
                      <div className="user-info-text">
                        <div className="user-logged-tag">
                          <CheckCircle2 size={14} /> Signed In as Verified Student
                        </div>
                        <strong className="user-name-title">{user.name}</strong>
                        <span className="user-email-subtitle">{user.email} • {user.phone || 'Phone verified'}</span>
                      </div>
                    </div>

                    <h3 className="enroll-step-heading">Complete Your Admission</h3>
                    <p className="enroll-step-desc">
                      Please confirm your payment details to activate your student seat in {courseData?.title || 'the program'}.
                    </p>

                    {enrollmentError && (
                      <div className="auth-alert error">
                        <AlertCircle size={18} />
                        <span>{enrollmentError}</span>
                      </div>
                    )}

                    <form onSubmit={handleFinalEnrollmentSubmit} className="payment-confirm-form">
                      {/* Payment Method Selector */}
                      <div className="form-group">
                        <label className="form-label">Select Payment Gateway:</label>
                        <div className="payment-methods-grid">
                          <button
                            type="button"
                            className={`payment-method-card ${paymentMethod === 'bKash' ? 'active' : ''}`}
                            onClick={() => setPaymentMethod('bKash')}
                          >
                            <span className="pm-name bkash">bKash Merchant</span>
                            <span className="pm-sub">01712-345678 (Make Payment)</span>
                          </button>

                          <button
                            type="button"
                            className={`payment-method-card ${paymentMethod === 'Nagad' ? 'active' : ''}`}
                            onClick={() => setPaymentMethod('Nagad')}
                          >
                            <span className="pm-name nagad">Nagad Merchant</span>
                            <span className="pm-sub">01712-345678 (Payment)</span>
                          </button>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Transaction ID / bKash Number (Optional for Demo)</label>
                        <div className="input-with-icon">
                          <CreditCard size={18} className="input-icon" />
                          <input
                            type="text"
                            placeholder="e.g. 9B8A7C6D5E"
                            value={transactionId}
                            onChange={e => setTransactionId(e.target.value)}
                            className="form-input with-icon"
                          />
                        </div>
                        <small className="form-helper-text">
                          You can leave this blank in sandbox demo to generate an auto-assigned transaction ID.
                        </small>
                      </div>

                      {/* Final Price Breakdown Confirmation */}
                      <div className="checkout-summary-box">
                        <div className="checkout-line">
                          <span>Course:</span>
                          <strong>{courseData?.title || 'Selected Course'}</strong>
                        </div>
                        <div className="checkout-line">
                          <span>Selected Plan:</span>
                          <strong>{selectedPlan === 'monthly' ? 'Monthly Installment' : 'Full Course'}</strong>
                        </div>
                        <div className="checkout-line total">
                          <span>Final Total:</span>
                          <span className="checkout-total-price">৳{activeFee.toLocaleString()}</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingEnrollment}
                        className="btn btn-primary btn-block btn-lg mt-3"
                      >
                        {isSubmittingEnrollment ? (
                          'Finalizing Enrollment...'
                        ) : (
                          <>
                            Confirm Enrollment & Activate Seat <ArrowRight size={18} />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  /* SCENARIO A: Visitor is NOT logged in -> Show Account Creation & OTP Verification */
                  <div>
                    {authMode !== 'verify' ? (
                      <div>
                        <div className="guest-enroll-header">
                          <span className="badge badge-green">Step 1: Student Account</span>
                          <h3 className="guest-enroll-title">
                            {authMode === 'register' ? 'Create Your Student Account' : 'Sign In to Your Account'}
                          </h3>
                          <p className="guest-enroll-desc">
                            Create your account to lock in your seat for <strong>{courseData?.title || 'the program'}</strong>.
                          </p>
                        </div>

                        {/* Mode Switcher */}
                        <div className="auth-tab-row">
                          <button
                            type="button"
                            className={`auth-tab-pill ${authMode === 'register' ? 'active' : ''}`}
                            onClick={() => { setAuthMode('register'); setAuthError(''); }}
                          >
                            New Student (Register)
                          </button>
                          <button
                            type="button"
                            className={`auth-tab-pill ${authMode === 'login' ? 'active' : ''}`}
                            onClick={() => { setAuthMode('login'); setAuthError(''); }}
                          >
                            Existing Student (Sign In)
                          </button>
                        </div>

                        {authError && (
                          <div className="auth-alert error">
                            <AlertCircle size={18} />
                            <span>{authError}</span>
                          </div>
                        )}

                        {/* Continue with Google */}
                        <button
                          type="button"
                          onClick={handleGoogleAuth}
                          disabled={authLoading}
                          className="btn-google-auth-full"
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z" fill="#4285F4"/>
                            <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                            <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
                          </svg>
                          <span>Continue with Google</span>
                        </button>

                        <div className="auth-divider">
                          <span>Or Fill Out Student Details</span>
                        </div>

                        {/* Registration Form */}
                        {authMode === 'register' && (
                          <form onSubmit={handleRegisterSubmit} className="register-inline-form">
                            <div className="form-group">
                              <label className="form-label">Student Full Name *</label>
                              <div className="input-with-icon">
                                <UserIcon size={18} className="input-icon" />
                                <input
                                  type="text"
                                  required
                                  placeholder="e.g. Tariqul Islam"
                                  value={authFormData.name}
                                  onChange={e => setAuthFormData({ ...authFormData, name: e.target.value })}
                                  className="form-input with-icon"
                                />
                              </div>
                            </div>

                            <div className="form-row-2">
                              <div className="form-group">
                                <label className="form-label">Email Address *</label>
                                <div className="input-with-icon">
                                  <Mail size={18} className="input-icon" />
                                  <input
                                    type="email"
                                    required
                                    placeholder="student@gmail.com"
                                    value={authFormData.email}
                                    onChange={e => setAuthFormData({ ...authFormData, email: e.target.value })}
                                    className="form-input with-icon"
                                  />
                                </div>
                              </div>

                              <div className="form-group">
                                <label className="form-label">Phone Number *</label>
                                <div className="input-with-icon">
                                  <Phone size={18} className="input-icon" />
                                  <input
                                    type="tel"
                                    required
                                    placeholder="01XXXXXXXXX"
                                    value={authFormData.phone}
                                    onChange={e => setAuthFormData({ ...authFormData, phone: e.target.value })}
                                    className="form-input with-icon"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="form-row-2">
                              <div className="form-group">
                                <label className="form-label">School / College *</label>
                                <div className="input-with-icon">
                                  <Building2 size={18} className="input-icon" />
                                  <input
                                    type="text"
                                    required
                                    placeholder="e.g. Notre Dame College"
                                    value={authFormData.institution}
                                    onChange={e => setAuthFormData({ ...authFormData, institution: e.target.value })}
                                    className="form-input with-icon"
                                  />
                                </div>
                              </div>

                              <div className="form-group">
                                <label className="form-label">Password * (Min 6 chars)</label>
                                <div className="input-with-icon">
                                  <Lock size={18} className="input-icon" />
                                  <input
                                    type="password"
                                    required
                                    minLength={6}
                                    placeholder="••••••••"
                                    value={authFormData.password}
                                    onChange={e => setAuthFormData({ ...authFormData, password: e.target.value })}
                                    className="form-input with-icon"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="form-group">
                              <label className="form-label">Confirm Password *</label>
                              <div className="input-with-icon">
                                <Lock size={18} className="input-icon" />
                                <input
                                  type="password"
                                  required
                                  minLength={6}
                                  placeholder="••••••••"
                                  value={authFormData.confirmPassword}
                                  onChange={e => setAuthFormData({ ...authFormData, confirmPassword: e.target.value })}
                                  className="form-input with-icon"
                                />
                              </div>
                            </div>

                            <button
                              type="submit"
                              disabled={authLoading}
                              className="btn btn-primary btn-block btn-lg mt-3"
                            >
                              {authLoading ? 'Creating Account...' : 'Continue to Email Verification'} <ArrowRight size={18} />
                            </button>
                          </form>
                        )}

                        {/* Login Form */}
                        {authMode === 'login' && (
                          <form onSubmit={handleLoginSubmit} className="login-inline-form">
                            <div className="form-group">
                              <label className="form-label">Student Email Address</label>
                              <div className="input-with-icon">
                                <Mail size={18} className="input-icon" />
                                <input
                                  type="email"
                                  required
                                  placeholder="student@gmail.com"
                                  value={loginEmail}
                                  onChange={e => setLoginEmail(e.target.value)}
                                  className="form-input with-icon"
                                />
                              </div>
                            </div>

                            <div className="form-group">
                              <label className="form-label">Password</label>
                              <div className="input-with-icon">
                                <Lock size={18} className="input-icon" />
                                <input
                                  type="password"
                                  required
                                  placeholder="••••••••"
                                  value={loginPassword}
                                  onChange={e => setLoginPassword(e.target.value)}
                                  className="form-input with-icon"
                                />
                              </div>
                            </div>

                            <button
                              type="submit"
                              disabled={authLoading}
                              className="btn btn-primary btn-block btn-lg mt-3"
                            >
                              {authLoading ? 'Signing In...' : 'Sign In & Continue to Enrollment'} <ArrowRight size={18} />
                            </button>
                          </form>
                        )}
                      </div>
                    ) : (
                      /* OTP Verification in place */
                      <VerifyEmailForm
                        email={verifyEmailTarget}
                        initialCode={initialOtpCode}
                        onSuccess={() => {
                          // Handled automatically via AuthContext update
                        }}
                        onCancel={() => setAuthMode('register')}
                        redirectNotice={`After verification, you will immediately confirm enrollment in ${courseData?.title || 'the course'}.`}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Enrollment Success Confirmation Screen */
          <div className="enroll-success-container bio-card text-center">
            <div className="success-icon-badge">
              <CheckCircle2 size={48} />
            </div>
            <span className="badge badge-green mb-2">Admission Confirmed</span>
            <h2 className="success-title">Welcome to {enrollmentSuccess.courseTitle}!</h2>
            <p className="success-subtitle">
              Your enrollment has been successfully recorded in the Bio Edge system under authoritative fee <strong>৳{enrollmentSuccess.authoritativeAmount?.toLocaleString()}</strong>.
            </p>

            <div className="success-receipt-card">
              <div className="receipt-row">
                <span>Student:</span>
                <strong>{user?.name}</strong>
              </div>
              <div className="receipt-row">
                <span>Student ID:</span>
                <strong>{user?.studentId || 'BE-2026-001'}</strong>
              </div>
              <div className="receipt-row">
                <span>Enrolled Program:</span>
                <strong>{enrollmentSuccess.courseTitle}</strong>
              </div>
              <div className="receipt-row">
                <span>Tuition Plan:</span>
                <strong className="text-capitalize">{enrollmentSuccess.plan === 'monthly' ? 'Monthly Installment' : 'Full 4-Month Course'}</strong>
              </div>
              <div className="receipt-row">
                <span>Payment Reference:</span>
                <code>{enrollmentSuccess.transactionId}</code>
              </div>
              <div className="receipt-row total">
                <span>Authoritative Amount:</span>
                <strong className="text-dark-green">৳{enrollmentSuccess.authoritativeAmount?.toLocaleString()}</strong>
              </div>
            </div>

            <div className="success-actions-row">
              <Link to="/student/dashboard" className="btn btn-primary btn-lg">
                Go to Student Dashboard <ArrowRight size={18} />
              </Link>
              <Link to="/student/course" className="btn btn-outline btn-lg">
                View Course Curriculum
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .enroll-page-wrapper {
          padding-top: 2rem;
          padding-bottom: 5rem;
        }

        /* Top Program Switcher Tabs */
        .program-selection-wrapper {
          max-width: 900px;
          margin: 0 auto 2.25rem;
        }
        .program-tab-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        .program-select-tab {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.1rem 1.25rem;
          background: #FFFFFF;
          border: 1.5px solid var(--border-color);
          border-radius: var(--radius-md);
          text-align: left;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: var(--shadow-sm);
        }
        .program-select-tab:hover {
          border-color: var(--soft-green);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .program-select-tab.active {
          border-color: var(--dark-green);
          background: #F0FDF4;
          box-shadow: 0 4px 16px rgba(22, 101, 52, 0.12);
        }
        .p-tab-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .p-tab-icon.green {
          background: var(--light-green);
          color: var(--dark-green);
        }
        .p-tab-icon.amber {
          background: #FEF3C7;
          color: #B45309;
        }
        .p-tab-text {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .p-tab-text strong {
          font-size: 0.96rem;
          color: var(--text-dark);
          font-weight: 700;
        }
        .p-tab-text span {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        /* Dual Column Layout */
        .enrollment-dual-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 2rem;
          align-items: start;
        }

        .summary-card {
          padding: 2.25rem 2rem;
        }
        .summary-card-header {
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.25rem;
        }
        .summary-course-title {
          font-size: 1.4rem;
          color: var(--dark-green);
          font-family: var(--font-heading);
          margin: 0.5rem 0 0.35rem;
        }
        .summary-course-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .summary-meta-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.5rem;
        }
        .summary-meta-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .meta-icon {
          color: var(--soft-green);
        }
        .meta-label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .meta-value {
          font-size: 0.92rem;
          color: var(--text-primary);
        }

        .summary-pricing-box {
          background: var(--light-green-subtle);
          padding: 1.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          margin-bottom: 1.25rem;
        }
        .pricing-box-label {
          display: block;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--dark-green);
          margin-bottom: 0.75rem;
        }

        .plan-choice-container {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .plan-option-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #FFFFFF;
          padding: 0.85rem;
          border-radius: var(--radius-sm);
          border: 1.5px solid var(--border-color);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .plan-option-row.active {
          border-color: var(--dark-green);
          background: #F0FDF4;
        }
        .plan-text-col {
          flex: 1;
        }
        .plan-text-col strong {
          display: block;
          font-size: 0.88rem;
          color: var(--text-primary);
        }
        .plan-text-col span {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .plan-fee-tag strong {
          font-size: 1rem;
          color: var(--dark-green);
        }
        .old-fee {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          text-align: right;
        }

        .ssc-fee-display {
          background: #FFFFFF;
          padding: 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
        }
        .ssc-fee-content {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
          margin-bottom: 0.4rem;
        }
        .ssc-price {
          font-size: 1.5rem;
          color: var(--dark-green);
        }
        .ssc-discount-badge {
          font-size: 0.75rem;
          font-weight: 600;
          color: #B45309;
          background: #FEF3C7;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
        }
        .ssc-note {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.35;
        }

        .summary-total-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
          padding-top: 0.85rem;
          border-top: 1px dashed var(--border-color);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--dark-green);
        }
        .total-figure {
          font-size: 1.35rem;
          font-weight: 800;
        }

        .trust-seal-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        /* Action Column Card */
        .action-card {
          padding: 2.25rem 2rem;
        }

        /* Forms & Inputs within EnrollPage */
        .form-group {
          margin-bottom: 1.15rem;
          text-align: left;
        }
        .form-label {
          display: block;
          font-size: 0.86rem;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 0.45rem;
        }
        .form-input,
        .form-select {
          width: 100%;
          padding: 0.72rem 1rem;
          font-size: 0.92rem;
          font-family: inherit;
          color: var(--text-dark);
          background-color: #FFFFFF;
          border: 1.5px solid var(--border-color);
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: var(--dark-green);
          box-shadow: 0 0 0 3px rgba(22, 101, 52, 0.1);
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        /* Input with Icon Positioning */
        .input-with-icon {
          position: relative;
          width: 100%;
          display: block;
        }
        .input-with-icon .input-icon {
          position: absolute;
          left: 0.95rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6B7280;
          pointer-events: none;
          z-index: 2;
        }
        .input-with-icon .form-input.with-icon,
        .input-with-icon input.with-icon {
          padding-left: 2.75rem !important;
        }

        /* Google Auth Button */
        .btn-google-auth-full {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: #FFFFFF;
          color: #374151;
          border: 1.5px solid var(--border-color);
          font-weight: 600;
          font-size: 0.92rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 1.25rem;
        }
        .btn-google-auth-full:hover {
          background: #F9FAFB;
          border-color: #D1D5DB;
          transform: translateY(-1px);
        }

        .auth-divider {
          text-align: center;
          position: relative;
          margin: 1.25rem 0;
        }
        .auth-divider::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
          background: var(--border-color);
        }
        .auth-divider span {
          position: relative;
          background: #FFFFFF;
          padding: 0 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.03em;
        }

        .authenticated-user-badge {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          background: #F0FDF4;
          border: 1px solid #BBF7D0;
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
        }
        .user-avatar-initial {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--dark-green);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .user-info-text {
          flex: 1;
        }
        .user-logged-tag {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #15803D;
        }
        .user-name-title {
          display: block;
          font-size: 1rem;
          color: var(--text-primary);
        }
        .user-email-subtitle {
          display: block;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .enroll-step-heading {
          font-size: 1.35rem;
          color: var(--dark-green);
          font-family: var(--font-heading);
          margin-bottom: 0.25rem;
        }
        .enroll-step-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .payment-methods-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        .payment-method-card {
          padding: 0.75rem 1rem;
          text-align: left;
          background: #FFFFFF;
          border: 1.5px solid var(--border-color);
          border-radius: var(--radius-sm);
          cursor: pointer;
        }
        .payment-method-card.active {
          border-color: var(--dark-green);
          background: var(--light-green-subtle);
        }
        .pm-name {
          display: block;
          font-weight: 700;
          font-size: 0.92rem;
        }
        .pm-name.bkash { color: #E2136E; }
        .pm-name.nagad { color: #F7931E; }
        .pm-sub {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }

        .checkout-summary-box {
          background: #FAFAFA;
          padding: 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          margin: 1.25rem 0;
        }
        .checkout-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0.4rem;
        }
        .checkout-line.total {
          margin-top: 0.6rem;
          padding-top: 0.6rem;
          border-top: 1px dashed var(--border-color);
          font-size: 1rem;
          font-weight: 700;
          color: var(--dark-green);
        }
        .checkout-total-price {
          font-size: 1.25rem;
        }

        .auth-tab-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.35rem;
          background: var(--light-green-subtle);
          padding: 0.3rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
          border: 1px solid var(--border-color);
        }
        .auth-tab-pill {
          padding: 0.55rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          border: none;
          background: none;
          cursor: pointer;
        }
        .auth-tab-pill.active {
          background: #FFFFFF;
          color: var(--dark-green);
          box-shadow: var(--shadow-sm);
        }

        .guest-enroll-header {
          margin-bottom: 1.25rem;
        }
        .guest-enroll-title {
          font-size: 1.35rem;
          color: var(--dark-green);
          font-family: var(--font-heading);
          margin: 0.4rem 0 0.25rem;
        }
        .guest-enroll-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .enroll-success-container {
          max-width: 580px;
          margin: 0 auto;
          padding: 3rem 2.5rem;
        }
        .success-icon-badge {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #DCFCE7;
          color: #166534;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
        }
        .success-title {
          font-size: 1.75rem;
          color: var(--dark-green);
          font-family: var(--font-heading);
          margin-bottom: 0.4rem;
        }
        .success-subtitle {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 1.75rem;
        }

        .success-receipt-card {
          background: #FAFAFA;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          text-align: left;
          margin-bottom: 2rem;
        }
        .receipt-row {
          display: flex;
          justify-content: space-between;
          padding: 0.45rem 0;
          font-size: 0.88rem;
          border-bottom: 1px dashed #E5E7EB;
        }
        .receipt-row:last-child {
          border-bottom: none;
        }
        .receipt-row.total {
          padding-top: 0.75rem;
          font-size: 1.05rem;
          font-weight: 700;
        }

        .success-actions-row {
          display: flex;
          gap: 0.85rem;
          justify-content: center;
        }

        @media (max-width: 900px) {
          .enrollment-dual-grid {
            grid-template-columns: 1fr;
          }
          .program-tab-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
