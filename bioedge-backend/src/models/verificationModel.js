import db from '../config/database.js';
import crypto from 'crypto';

export const VerificationModel = {
  // Store a newly generated verification code (overwrites/invalidates previous active code)
  saveCode(email, code, expiresInMinutes = 10) {
    const id = 'vcode_' + crypto.randomBytes(8).toString('hex');
    const now = Date.now();
    const expiresAt = now + expiresInMinutes * 60 * 1000;

    // Remove any existing codes for this email
    db.prepare('DELETE FROM verification_codes WHERE LOWER(email) = LOWER(?)').run(email);

    // Insert fresh code
    const stmt = db.prepare(`
      INSERT INTO verification_codes (id, email, code, expires_at, attempts, created_at)
      VALUES (?, ?, ?, ?, 0, ?)
    `);

    stmt.run(id, email.toLowerCase(), code, expiresAt, now);
    return { id, email: email.toLowerCase(), code, expiresAt, attempts: 0, createdAt: now };
  },

  // Get active code for email
  getActiveCode(email) {
    const stmt = db.prepare('SELECT * FROM verification_codes WHERE LOWER(email) = LOWER(?) ORDER BY created_at DESC LIMIT 1');
    return stmt.get(email);
  },

  // Increment failure attempt count
  incrementAttempts(email) {
    const stmt = db.prepare('UPDATE verification_codes SET attempts = attempts + 1 WHERE LOWER(email) = LOWER(?)');
    stmt.run(email);
    return this.getActiveCode(email);
  },

  // Invalidate / delete code upon successful use
  deleteCode(email) {
    const stmt = db.prepare('DELETE FROM verification_codes WHERE LOWER(email) = LOWER(?)');
    stmt.run(email);
  }
};
