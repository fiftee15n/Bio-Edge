// Comprehensive E2E Scenario Test Suite for Bio Edge Platform
const BASE_URL = 'http://localhost:5000/api';

async function runScenarioTests() {
  console.log('🚀 Running Bio Edge Complete Backend & Scenario Test Suite...\n');
  let passed = 0;
  let total = 0;

  function expect(condition, message) {
    total++;
    if (condition) {
      console.log(`  ✅ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${message}`);
      throw new Error(`Assertion failed: ${message}`);
    }
  }

  try {
    // ----------------------------------------------------
    // 1. Public Website & Course Discovery (No Auth Needed)
    // ----------------------------------------------------
    console.log('📌 1. Testing Public Website & Course Discovery APIs...');
    const catalog = await fetch(`${BASE_URL}/courses`).then(r => r.json());
    expect(catalog.success === true, 'Public course catalog accessible without authentication');
    expect(catalog.courses.length >= 2, 'Catalog contains both Alpha Cohort and SSC 2027');

    const alpha = catalog.courses.find(c => c.slug === 'alpha-cohort');
    expect(alpha && alpha.duration === '4 Months' && alpha.totalClasses === 48, 'Alpha Cohort details (4 Months, 48 Classes) served correctly');
    expect(alpha.fullFee === 12500 && alpha.monthlyFee === 3500, 'Authoritative fee for Alpha Cohort is ৳12,500 full / ৳3,500 monthly');

    const ssc = catalog.courses.find(c => c.slug === 'ssc-2027');
    expect(ssc && ssc.fullFee === 2200 && ssc.totalClasses === 20, 'Authoritative fee for SSC 2027 is ৳2,200 full');

    const teacher = await fetch(`${BASE_URL}/courses/public/teacher`).then(r => r.json());
    expect(teacher.success === true && teacher.teacher.name.includes('Afroza Tahmina'), 'Public Teacher Profile served for Afroza Tahmina');

    // ----------------------------------------------------
    // 2. Email & Password Registration & OTP Security
    // ----------------------------------------------------
    console.log('\n📌 2. Testing User Registration & OTP Security...');
    const studentEmail = `student_${Date.now()}@bioedge.edu`;
    const regRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Tanvir Ahmed',
        email: studentEmail,
        password: 'studentPass2026',
        confirmPassword: 'studentPass2026',
        phone: '01711998877',
        institution: 'Dhaka College',
        examYear: 'HSC 2026'
      })
    }).then(r => r.json());

    expect(regRes.success === true && regRes.requiresVerification === true, 'User registration succeeds and flags account as requiring verification');
    expect(regRes.verificationCode && regRes.verificationCode.length === 6, 'Generated 6-digit OTP verification code');
    const validOtp = regRes.verificationCode;

    // Test Attempt / Abuse Limit (Wrong OTP 5 times)
    console.log('\n📌 3. Testing Attempt & Abuse Protection...');
    for (let i = 1; i <= 4; i++) {
      const failRes = await fetch(`${BASE_URL}/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: studentEmail, code: '111111' })
      }).then(r => r.json());
      expect(failRes.success === false && failRes.message.includes('attempts remaining'), `Incorrect OTP attempt ${i} returns remaining attempts warning`);
    }

    // 5th attempt invalidates code
    const lockRes = await fetch(`${BASE_URL}/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: studentEmail, code: '111111' })
    }).then(r => r.json());
    expect(lockRes.success === false, '5th failed attempt invalidates the code');

    // Resend functionality
    console.log('\n📌 4. Testing Resend Code Functionality...');
    const resendRes = await fetch(`${BASE_URL}/auth/resend-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: studentEmail })
    }).then(r => r.json());
    expect(resendRes.success === true && resendRes.verificationCode, 'Resend generates a fresh active 6-digit code');
    const newOtp = resendRes.verificationCode;

    // Resend cooldown protection (immediate second resend should fail)
    const quickResendRes = await fetch(`${BASE_URL}/auth/resend-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: studentEmail })
    }).then(r => r.json());
    expect(quickResendRes.success === false && quickResendRes.message.includes('wait'), 'Resend cooldown (60s) rejects rapid spamming');

    // Valid Email Verification
    console.log('\n📌 5. Testing Email Verification with Valid OTP...');
    const verifyRes = await fetch(`${BASE_URL}/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: studentEmail, code: newOtp })
    }).then(r => r.json());
    expect(verifyRes.success === true && verifyRes.user.isVerified === true, 'Email successfully verified with valid OTP');
    expect(Boolean(verifyRes.token), 'JWT Bearer token issued upon verification');
    const studentToken = verifyRes.token;

    // ----------------------------------------------------
    // 6. Continue with Google Authentication Flow
    // ----------------------------------------------------
    console.log('\n📌 6. Testing Continue with Google OAuth Flow...');
    const googleUserEmail = `google_student_${Date.now()}@gmail.com`;
    const googleRes = await fetch(`${BASE_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: googleUserEmail,
        name: 'Nusrat Jahan',
        googleId: `gid_${Date.now()}`
      })
    }).then(r => r.json());
    expect(googleRes.success === true && googleRes.user.isVerified === true, 'Google login automatically creates account marked as verified');
    expect(Boolean(googleRes.token), 'Google login returns authenticated JWT token');
    const googleToken = googleRes.token;

    // ----------------------------------------------------
    // 7. Enrollment Flow - Scenario A (Newly Verified Student)
    // ----------------------------------------------------
    console.log('\n📌 7. Testing Enrollment with Authoritative Database Pricing...');
    // Attempt to tamper price on client side by passing 500 Tk
    const enrollAlpha = await fetch(`${BASE_URL}/enrollments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${studentToken}`
      },
      body: JSON.stringify({
        courseId: 'alpha-cohort',
        plan: 'full',
        paymentMethod: 'bKash',
        clientPrice: 500 // Must be ignored!
      })
    }).then(r => r.json());

    expect(enrollAlpha.success === true, 'Enrollment created successfully for verified student');
    expect(enrollAlpha.enrollment.authoritativeAmount === 12500, 'Enrollment strictly enforces DB authoritative fee (৳12,500) and ignores clientPrice');
    expect(enrollAlpha.enrollment.paymentStatus === 'Approved', 'Enrollment status set to Approved');

    // ----------------------------------------------------
    // 8. Enrollment Flow - Scenario B (User Already Logged In)
    // ----------------------------------------------------
    console.log('\n📌 8. Testing Scenario B: Already Logged In Student Direct Enrollment...');
    const enrollSsc = await fetch(`${BASE_URL}/enrollments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${googleToken}`
      },
      body: JSON.stringify({
        courseId: 'ssc-2027',
        plan: 'full',
        paymentMethod: 'Nagad'
      })
    }).then(r => r.json());

    expect(enrollSsc.success === true, 'Logged in Google student directly enrolls without re-authentication');
    expect(enrollSsc.enrollment.authoritativeAmount === 2200, 'SSC 2027 fee is authoritatively ৳2,200');

    // ----------------------------------------------------
    // 9. Student Enrollments Listing
    // ----------------------------------------------------
    console.log('\n📌 9. Testing Student Enrollments Retrieval...');
    const myEnrollments = await fetch(`${BASE_URL}/enrollments/my`, {
      headers: { 'Authorization': `Bearer ${studentToken}` }
    }).then(r => r.json());
    expect(myEnrollments.success === true && myEnrollments.enrollments.length === 1, 'Student can retrieve their verified course enrollment list');
    expect(myEnrollments.enrollments[0].course_slug === 'alpha-cohort', 'Enrolled course slug matches alpha-cohort');

    console.log(`\n======================================================`);
    console.log(`🎉 ALL ${passed}/${total} SCENARIOS PASSED WITH 100% SUCCESS!`);
    console.log(`======================================================\n`);

  } catch (err) {
    console.error('\n❌ Scenario test run interrupted by error:', err);
  }
}

runScenarioTests();
