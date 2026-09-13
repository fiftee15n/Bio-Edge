// Automated API Test Script for Bio Edge Backend
const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('🧪 Starting Bio Edge Backend Integration Tests...\n');
  let testsPassed = 0;
  let totalTests = 0;

  const assert = (condition, name) => {
    totalTests++;
    if (condition) {
      console.log(`  ✅ [PASS] ${name}`);
      testsPassed++;
    } else {
      console.error(`  ❌ [FAIL] ${name}`);
    }
  };

  try {
    // 1. Health check
    const healthRes = await fetch(`${BASE_URL}/health`).then(r => r.json());
    assert(healthRes.status === 'ok', 'Health Check API returns ok');

    // 2. Public Course Discovery (No Auth required)
    const coursesRes = await fetch(`${BASE_URL}/courses`).then(r => r.json());
    assert(coursesRes.success === true && coursesRes.courses.length >= 2, 'Public Course Catalog returns available courses');
    
    const alphaCourse = coursesRes.courses.find(c => c.slug === 'alpha-cohort');
    assert(alphaCourse && alphaCourse.fullFee === 12500 && alphaCourse.monthlyFee === 3500, 'Alpha Cohort has authoritative fee ৳12,500 / ৳3,500');

    // 3. Course Details by Slug
    const courseDetailRes = await fetch(`${BASE_URL}/courses/alpha-cohort`).then(r => r.json());
    assert(courseDetailRes.success === true && courseDetailRes.course.curriculum !== null, 'Course details returns full syllabus & curriculum');

    // 4. Registration with Email & Password
    const testEmail = `student_${Date.now()}@test.com`;
    const regRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Mahir Faisal',
        email: testEmail,
        password: 'securePassword123',
        confirmPassword: 'securePassword123',
        phone: '01811223344',
        institution: 'Dhaka Residential Model College',
        targetCourse: 'alpha-cohort'
      })
    }).then(r => r.json());

    assert(regRes.success === true && regRes.requiresVerification === true, 'User registration creates unverified user and requests OTP');
    const otpCode = regRes.verificationCode;
    assert(otpCode && otpCode.length === 6, 'Verification code is a 6-digit OTP');

    // 5. Test Invalid OTP Attempt
    const wrongOtpRes = await fetch(`${BASE_URL}/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, code: '000000' })
    }).then(r => r.json());
    assert(wrongOtpRes.success === false && wrongOtpRes.message.includes('attempts remaining'), 'Invalid OTP increments failure attempt counter');

    // 6. Valid OTP Email Verification
    const verifyRes = await fetch(`${BASE_URL}/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, code: otpCode })
    }).then(r => r.json());
    assert(verifyRes.success === true && verifyRes.user.isVerified === true && verifyRes.token, 'Valid OTP marks email as verified and returns JWT token');
    const studentToken = verifyRes.token;

    // 7. Login with Email & Password
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: 'securePassword123' })
    }).then(r => r.json());
    assert(loginRes.success === true && loginRes.user.email === testEmail, 'Email & Password login authenticates verified user');

    // 8. Google Authentication Flow
    const googleEmail = `google_user_${Date.now()}@gmail.com`;
    const googleAuthRes = await fetch(`${BASE_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: googleEmail,
        name: 'Sadia Rahman',
        googleId: `gid_${Date.now()}`
      })
    }).then(r => r.json());
    assert(googleAuthRes.success === true && googleAuthRes.user.isVerified === true && googleAuthRes.token, 'Google Auth auto-creates pre-verified student account & returns JWT');

    // 9. Authoritative Enrollment Creation
    // (Sending a forged fake frontend price of 100 Taka to test that server enforces authoritative DB price of 12,500)
    const enrollRes = await fetch(`${BASE_URL}/enrollments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${studentToken}`
      },
      body: JSON.stringify({
        courseId: 'alpha-cohort',
        plan: 'full',
        paymentMethod: 'bKash',
        clientSubmittedPrice: 100 // Should be completely ignored by backend!
      })
    }).then(r => r.json());

    assert(
      enrollRes.success === true && enrollRes.enrollment.authoritativeAmount === 12500,
      'Enrollment strictly enforces DB authoritative fee (৳12,500) and ignores client-submitted price'
    );

    // 10. Fetch My Enrollments
    const myEnrollmentsRes = await fetch(`${BASE_URL}/enrollments/my`, {
      headers: { 'Authorization': `Bearer ${studentToken}` }
    }).then(r => r.json());
    assert(myEnrollmentsRes.success === true && myEnrollmentsRes.enrollments.length === 1, 'Student can retrieve their verified course enrollments');

    console.log(`\n======================================================`);
    console.log(`📊 Test Results: ${testsPassed}/${totalTests} passed (${Math.round((testsPassed / totalTests) * 100)}%)`);
    console.log(`======================================================\n`);

  } catch (error) {
    console.error('Test execution error:', error);
  }
}

runTests();
