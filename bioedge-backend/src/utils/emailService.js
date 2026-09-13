/**
 * Email Service for Bio Edge Platform
 * Handles 6-digit OTP verification code delivery and notifications.
 */

export const EmailService = {
  /**
   * Send 6-digit verification code to the student's email
   * @param {string} email 
   * @param {string} code 
   * @param {string} name 
   */
  async sendVerificationCode(email, code, name = 'Student') {
    const formattedDate = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    console.log('\n======================================================');
    console.log(`📧 [BIO EDGE EMAIL SERVICE] Verification Code Delivery`);
    console.log(`To: ${name} <${email}>`);
    console.log(`Subject: Verify Your Email - Bio Edge by Afroza Tahmina`);
    console.log(`Time: ${formattedDate}`);
    console.log(`------------------------------------------------------`);
    console.log(`Dear ${name},`);
    console.log(`Your 6-digit Bio Edge verification code is:`);
    console.log(`\n       >>>  [ ${code} ]  <<<\n`);
    console.log(`This code will expire in 10 minutes.`);
    console.log(`If you did not request this, please disregard this email.`);
    console.log('======================================================\n');

    return {
      success: true,
      deliveredTo: email,
      code
    };
  }
};
