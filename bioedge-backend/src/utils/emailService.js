import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Creates and caches the Nodemailer transporter for Gmail SMTP
 */
function getTransporter() {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  // Gmail SMTP transporter configuration
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const isSecure = port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure, // true for 465, false for 587
    auth: {
      user: user.trim(),
      pass: pass.replace(/\s+/g, '') // remove spaces from 16-character Google App Password
    },
    tls: {
      // Do not fail on invalid certificates
      rejectUnauthorized: false
    }
  });
}

/**
 * Generate premium HTML email template for 6-digit OTP verification code
 */
function generateEmailHtml(name, code) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bio Edge Verification Code</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #F3F4F6;
      color: #1F2937;
    }
    .email-container {
      max-width: 580px;
      margin: 30px auto;
      background-color: #FFFFFF;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid #E5E7EB;
    }
    .header-banner {
      background: linear-gradient(135deg, #134e2c 0%, #166534 50%, #15803d 100%);
      padding: 36px 30px 30px;
      text-align: center;
      color: #FFFFFF;
    }
    .brand-logo {
      display: inline-block;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #FFFFFF;
      margin-bottom: 6px;
    }
    .brand-sub {
      font-size: 13px;
      color: #BBF7D0;
      font-weight: 500;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .content-body {
      padding: 36px 32px;
    }
    .greeting {
      font-size: 18px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 12px;
    }
    .message-text {
      font-size: 15px;
      line-height: 1.6;
      color: #4B5563;
      margin-bottom: 24px;
    }
    .code-box-wrapper {
      background: #F0FDF4;
      border: 2px dashed #86EFAC;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin: 28px 0;
    }
    .code-label {
      font-size: 12px;
      font-weight: 600;
      color: #166534;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 10px;
    }
    .code-digits {
      font-size: 38px;
      font-weight: 800;
      letter-spacing: 8px;
      color: #14532D;
      font-family: 'Courier New', Courier, monospace;
      margin: 0;
      user-select: all;
    }
    .expiry-note {
      font-size: 13px;
      color: #059669;
      margin-top: 10px;
      font-weight: 500;
    }
    .warning-box {
      background-color: #FEF3C7;
      border-left: 4px solid #F59E0B;
      padding: 12px 16px;
      border-radius: 6px;
      font-size: 13px;
      color: #92400E;
      line-height: 1.5;
      margin-bottom: 24px;
    }
    .footer {
      background-color: #F9FAFB;
      padding: 24px 32px;
      border-top: 1px solid #E5E7EB;
      text-align: center;
      font-size: 12px;
      color: #6B7280;
      line-height: 1.5;
    }
    .footer-highlight {
      font-weight: 600;
      color: #374151;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header-banner">
      <div class="brand-logo">🌿 Bio Edge</div>
      <div class="brand-sub">By Afroza Tahmina • Biology Learning Platform</div>
    </div>
    <div class="content-body">
      <div class="greeting">Hello, ${name || 'Future Doctor'}! 👋</div>
      <div class="message-text">
        Thank you for joining <strong>Bio Edge by Afroza Tahmina</strong>. To complete your student registration and verify your email address, please use the following 6-digit verification code:
      </div>

      <div class="code-box-wrapper">
        <div class="code-label">Verification Code</div>
        <div class="code-digits">${code}</div>
        <div class="expiry-note">⏱️ Valid for 10 minutes</div>
      </div>

      <div class="warning-box">
        🔒 <strong>Security Warning:</strong> Never share this code with anyone. Bio Edge instructors or staff will never ask for your verification code or password.
      </div>

      <div class="message-text" style="font-size: 13px; color: #6B7280;">
        If you did not request this verification code, please ignore this email or contact support if you suspect unauthorized activity.
      </div>
    </div>
    <div class="footer">
      <div class="footer-highlight">Bio Edge by Afroza Tahmina</div>
      <div>Excellence in HSC & SSC Biology Education</div>
      <div style="margin-top: 8px;">Dhaka, Bangladesh • support@bioedge.edu.bd</div>
    </div>
  </div>
</body>
</html>
`;
}

export const EmailService = {
  /**
   * Send 6-digit verification code to the student's email via Gmail SMTP
   * @param {string} email 
   * @param {string} code 
   * @param {string} name 
   */
  async sendVerificationCode(email, code, name = 'Student') {
    const formattedDate = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const user = process.env.GMAIL_USER || process.env.SMTP_USER;
    const fromAddress = process.env.EMAIL_FROM || (user ? `"Bio Edge by Afroza Tahmina" <${user}>` : '"Bio Edge" <noreply@bioedge.edu.bd>');

    // Always log clean preview to terminal
    console.log('\n======================================================');
    console.log(`📧 [BIO EDGE EMAIL SERVICE] Verification Code Event`);
    console.log(`To: ${name} <${email}>`);
    console.log(`Subject: Verify Your Email - Bio Edge by Afroza Tahmina`);
    console.log(`Time: ${formattedDate}`);
    console.log(`Code: [ ${code} ]`);
    console.log('------------------------------------------------------');

    const transporter = getTransporter();

    if (!transporter) {
      console.log('⚠️ [GMAIL SMTP NOTICE]: GMAIL_USER or GMAIL_APP_PASSWORD is not configured in .env');
      console.log('ℹ️ Code was generated and logged to console for testing.');
      console.log('👉 To send real emails to Gmail inboxes, set in bioedge-backend/.env:');
      console.log('   GMAIL_USER=your_email@gmail.com');
      console.log('   GMAIL_APP_PASSWORD=your_16_digit_app_password');
      console.log('======================================================\n');
      return {
        success: true,
        deliveredTo: email,
        code,
        simulated: true,
        message: 'Gmail credentials not configured in .env. Code logged to server terminal.'
      };
    }

    try {
      console.log(`🚀 Sending real email to ${email} via Gmail SMTP...`);
      const info = await transporter.sendMail({
        from: fromAddress,
        to: email,
        subject: `Your Bio Edge Verification Code: ${code}`,
        text: `Hello ${name},\n\nYour 6-digit Bio Edge verification code is: ${code}\n\nThis code will expire in 10 minutes.\n\nBio Edge by Afroza Tahmina`,
        html: generateEmailHtml(name, code)
      });

      console.log(`✅ [GMAIL SUCCESS] Email sent to ${email}! Message ID: ${info.messageId}`);
      console.log('======================================================\n');

      return {
        success: true,
        deliveredTo: email,
        code,
        messageId: info.messageId,
        simulated: false
      };
    } catch (error) {
      console.error(`❌ [GMAIL SMTP ERROR] Failed to send email to ${email}:`, error.message);
      console.log('ℹ️ Check that your GMAIL_USER and GMAIL_APP_PASSWORD (16 characters) are valid.');
      console.log('======================================================\n');

      // Do not throw: return simulated fallback so student is not locked out
      return {
        success: true,
        deliveredTo: email,
        code,
        simulated: true,
        error: error.message
      };
    }
  }
};
