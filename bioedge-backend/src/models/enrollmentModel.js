import db from '../config/database.js';
import crypto from 'crypto';

export const EnrollmentModel = {
  create({
    userId,
    courseId,
    courseSlug,
    plan,
    authoritativeAmount,
    paymentMethod = 'bKash',
    transactionId = '',
    studentName = '',
    studentEmail = '',
    studentPhone = ''
  }) {
    const id = 'enr_' + crypto.randomBytes(8).toString('hex');
    const stmt = db.prepare(`
      INSERT INTO enrollments (
        id, user_id, course_id, course_slug, plan, authoritative_amount,
        payment_method, payment_status, enrollment_status, transaction_id,
        student_name, student_email, student_phone
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Approved', 'Active', ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      userId,
      courseId,
      courseSlug,
      plan,
      authoritativeAmount,
      paymentMethod,
      transactionId,
      studentName,
      studentEmail,
      studentPhone
    );

    return this.findById(id);
  },

  findById(id) {
    const stmt = db.prepare('SELECT * FROM enrollments WHERE id = ?');
    return stmt.get(id);
  },

  findByUserId(userId) {
    const stmt = db.prepare('SELECT * FROM enrollments WHERE user_id = ? ORDER BY created_at DESC');
    return stmt.all(userId);
  },

  getAll() {
    const stmt = db.prepare('SELECT * FROM enrollments ORDER BY created_at DESC');
    return stmt.all();
  }
};

export const TeacherModel = {
  getProfile() {
    const stmt = db.prepare('SELECT * FROM teachers LIMIT 1');
    return stmt.get();
  },

  upsertProfile(data) {
    const existing = this.getProfile();
    if (!existing) {
      const stmt = db.prepare(`
        INSERT INTO teachers (id, name, designation, institution, experience, specialization, bio, phone, email, avatar)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        data.id || 'teacher_afroza',
        data.name,
        data.designation,
        data.institution,
        data.experience,
        data.specialization,
        data.bio,
        data.phone,
        data.email,
        data.avatar || ''
      );
    } else {
      const stmt = db.prepare(`
        UPDATE teachers SET 
          name = ?, designation = ?, institution = ?, experience = ?,
          specialization = ?, bio = ?, phone = ?, email = ?, avatar = ?
        WHERE id = ?
      `);
      stmt.run(
        data.name,
        data.designation,
        data.institution,
        data.experience,
        data.specialization,
        data.bio,
        data.phone,
        data.email,
        data.avatar || '',
        existing.id
      );
    }
    return this.getProfile();
  }
};
