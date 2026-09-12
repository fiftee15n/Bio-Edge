import db from '../config/database.js';
import crypto from 'crypto';

export const UserModel = {
  findById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
  },

  findByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE LOWER(email) = LOWER(?)');
    return stmt.get(email);
  },

  findByGoogleId(googleId) {
    const stmt = db.prepare('SELECT * FROM users WHERE google_id = ?');
    return stmt.get(googleId);
  },

  create({ name, email, passwordHash, role = 'student', phone = '', institution = '', examYear = '', isVerified = 0, googleId = null, studentId = null, batch = 'Alpha Cohort' }) {
    const id = 'usr_' + crypto.randomBytes(8).toString('hex');
    const assignedStudentId = studentId || `BE-2026-${Math.floor(100 + Math.random() * 900)}`;

    const stmt = db.prepare(`
      INSERT INTO users (id, name, email, password_hash, role, phone, institution, exam_year, student_id, batch, is_verified, google_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(id, name, email.toLowerCase(), passwordHash, role, phone, institution, examYear, assignedStudentId, batch, isVerified ? 1 : 0, googleId);
    return this.findById(id);
  },

  updateVerification(email, isVerified = 1) {
    const stmt = db.prepare('UPDATE users SET is_verified = ?, updated_at = CURRENT_TIMESTAMP WHERE LOWER(email) = LOWER(?)');
    stmt.run(isVerified ? 1 : 0, email);
    return this.findByEmail(email);
  },

  updateProfile(id, updates) {
    const allowed = ['name', 'phone', 'institution', 'exam_year', 'batch', 'avatar'];
    const fields = [];
    const values = [];

    for (const key of allowed) {
      if (updates[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const stmt = db.prepare(`UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`);
    stmt.run(...values);
    return this.findById(id);
  },

  getAllStudents() {
    const stmt = db.prepare("SELECT id, name, email, phone, institution, exam_year, student_id, batch, is_verified, created_at FROM users WHERE role = 'student' ORDER BY created_at DESC");
    return stmt.all();
  }
};
