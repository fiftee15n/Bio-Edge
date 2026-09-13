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

class EmailService:
    @staticmethod
    def send_verification_code(to_email: str, code: str, recipient_name: str = "Student") -> bool:
        """
        Deliver 6-digit verification code.
        Logs a rich visual email receipt to the server terminal.
        """
        now_str = datetime.datetime.now().strftime("%I:%M %p")
        
        email_template = f"""
======================================================
📧 [BIO EDGE EMAIL SERVICE] Verification Code Delivery
To: {recipient_name} <{to_email}>
Subject: Verify Your Email - Bio Edge by Afroza Tahmina
Time: {now_str}
------------------------------------------------------
Dear {recipient_name},
Your 6-digit Bio Edge verification code is:

       >>>  [ {code} ]  <<<

This code will expire in 10 minutes.
If you did not request this, please disregard this email.
======================================================
"""
        print(email_template)
        return True
