import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import datetime
import sys

# Ensure UTF-8 output on Windows consoles
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass
if sys.stderr and hasattr(sys.stderr, "reconfigure"):
    try:
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

def generate_email_html(name: str, code: str) -> str:
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bio Edge Verification Code</title>
  <style>
    body {{
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #F3F4F6;
      color: #1F2937;
    }}
    .email-container {{
      max-width: 580px;
      margin: 30px auto;
      background-color: #FFFFFF;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid #E5E7EB;
    }}
    .header-banner {{
      background: linear-gradient(135deg, #134e2c 0%, #166534 50%, #15803d 100%);
      padding: 36px 30px 30px;
      text-align: center;
      color: #FFFFFF;
    }}
    .brand-logo {{
      display: inline-block;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #FFFFFF;
      margin-bottom: 6px;
    }}
    .brand-sub {{
      font-size: 13px;
      color: #BBF7D0;
      font-weight: 500;
      letter-spacing: 1px;
      text-transform: uppercase;
    }}
    .content-body {{
      padding: 36px 32px;
    }}
    .greeting {{
      font-size: 18px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 12px;
    }}
    .message-text {{
      font-size: 15px;
      line-height: 1.6;
      color: #4B5563;
      margin-bottom: 24px;
    }}
    .code-box-wrapper {{
      background: #F0FDF4;
      border: 2px dashed #86EFAC;
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin: 28px 0;
    }}
    .code-label {{
      font-size: 12px;
      font-weight: 600;
      color: #166534;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 10px;
    }}
    .code-digits {{
      font-size: 38px;
      font-weight: 800;
      letter-spacing: 8px;
      color: #14532D;
      font-family: 'Courier New', Courier, monospace;
      margin: 0;
      user-select: all;
    }}
    .expiry-note {{
      font-size: 13px;
      color: #059669;
      margin-top: 10px;
      font-weight: 500;
    }}
    .warning-box {{
      background-color: #FEF3C7;
      border-left: 4px solid #F59E0B;
      padding: 12px 16px;
      border-radius: 6px;
      font-size: 13px;
      color: #92400E;
      line-height: 1.5;
      margin-bottom: 24px;
    }}
    .footer {{
      background-color: #F9FAFB;
      padding: 24px 32px;
      border-top: 1px solid #E5E7EB;
      text-align: center;
      font-size: 12px;
      color: #6B7280;
      line-height: 1.5;
    }}
    .footer-highlight {{
      font-weight: 600;
      color: #374151;
    }}
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header-banner">
      <div class="brand-logo">🌿 Bio Edge</div>
      <div class="brand-sub">By Afroza Tahmina • Biology Learning Platform</div>
    </div>
    <div class="content-body">
      <div class="greeting">Hello, {name or 'Future Doctor'}! 👋</div>
      <div class="message-text">
        Thank you for joining <strong>Bio Edge by Afroza Tahmina</strong>. To complete your student registration and verify your email address, please use the following 6-digit verification code:
      </div>

      <div class="code-box-wrapper">
        <div class="code-label">Verification Code</div>
        <div class="code-digits">{code}</div>
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
"""

class EmailService:
    @staticmethod
    def send_verification_code(to_email: str, code: str, recipient_name: str = "Student") -> bool:
        """
        Deliver 6-digit verification code via Gmail SMTP if credentials are configured.
        Falls back to terminal preview if credentials are missing or fail.
        """
        now_str = datetime.datetime.now().strftime("%I:%M %p")
        
        user = os.environ.get("GMAIL_USER") or os.environ.get("SMTP_USER")
        password = os.environ.get("GMAIL_APP_PASSWORD") or os.environ.get("SMTP_PASS")
        smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
        smtp_port = int(os.environ.get("SMTP_PORT", "465"))

        print("\n======================================================")
        print("📧 [BIO EDGE EMAIL SERVICE] Verification Code Event")
        print(f"To: {recipient_name} <{to_email}>")
        print("Subject: Verify Your Email - Bio Edge by Afroza Tahmina")
        print(f"Time: {now_str}")
        print(f"Code: [ {code} ]")
        print("------------------------------------------------------")

        if not user or not password:
            print("⚠️ [GMAIL SMTP NOTICE]: GMAIL_USER or GMAIL_APP_PASSWORD is not configured in .env")
            print("ℹ️ Code was generated and logged to console for testing.")
            print("👉 To send real emails to Gmail inboxes, set in bioedge-backend/.env:")
            print("   GMAIL_USER=your_email@gmail.com")
            print("   GMAIL_APP_PASSWORD=your_16_digit_app_password")
            print("======================================================\n")
            return True

        # Send real email via Gmail SMTP
        try:
            print(f"🚀 Sending real email to {to_email} via Gmail SMTP...")
            
            clean_password = password.replace(" ", "")
            msg = MIMEMultipart("alternative")
            msg["Subject"] = f"Your Bio Edge Verification Code: {code}"
            from_name = os.environ.get("EMAIL_FROM", f"Bio Edge by Afroza Tahmina <{user}>")
            msg["From"] = from_name
            msg["To"] = to_email

            text_part = MIMEText(
                f"Hello {recipient_name},\n\nYour 6-digit Bio Edge verification code is: {code}\n\nThis code will expire in 10 minutes.\n\nBio Edge by Afroza Tahmina",
                "plain"
            )
            html_part = MIMEText(generate_email_html(recipient_name, code), "html")

            msg.attach(text_part)
            msg.attach(html_part)

            if smtp_port == 465:
                context = ssl.create_default_context()
                with smtplib.SMTP_SSL(smtp_host, smtp_port, context=context) as server:
                    server.login(user.strip(), clean_password)
                    server.sendmail(user.strip(), to_email, msg.as_string())
            else:
                with smtplib.SMTP(smtp_host, smtp_port) as server:
                    server.starttls(context=ssl.create_default_context())
                    server.login(user.strip(), clean_password)
                    server.sendmail(user.strip(), to_email, msg.as_string())

            print(f"✅ [GMAIL SUCCESS] Email sent to {to_email}!")
            print("======================================================\n")
            return True

        except Exception as e:
            print(f"❌ [GMAIL SMTP ERROR] Failed to send email to {to_email}: {e}")
            print("ℹ️ Check that your GMAIL_USER and GMAIL_APP_PASSWORD are valid.")
            print("======================================================\n")
            return False
