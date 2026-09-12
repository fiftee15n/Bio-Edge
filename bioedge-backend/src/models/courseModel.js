import db from '../config/database.js';

export const CourseModel = {
  getAll() {
    const stmt = db.prepare('SELECT * FROM courses WHERE is_active = 1 ORDER BY created_at ASC');
    const rows = stmt.all();
    return rows.map(r => ({
      ...r,
      curriculum: r.curriculum_json ? JSON.parse(r.curriculum_json) : null,
      metadata: r.metadata_json ? JSON.parse(r.metadata_json) : null
    }));
  },

  findBySlugOrId(identifier) {
    const stmt = db.prepare('SELECT * FROM courses WHERE slug = ? OR id = ?');
    const row = stmt.get(identifier, identifier);
    if (!row) return null;
    return {
      ...row,
      curriculum: row.curriculum_json ? JSON.parse(row.curriculum_json) : null,
      metadata: row.metadata_json ? JSON.parse(row.metadata_json) : null
    };
  },

  upsertCourse(courseData) {
    const stmt = db.prepare(`
      INSERT INTO courses (
        id, slug, title, subtitle, description, duration, total_classes, 
        seat_limit, enrolled_count, full_fee, monthly_fee, discount_amount, 
        curriculum_json, metadata_json, is_active
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(slug) DO UPDATE SET
        title = excluded.title,
        subtitle = excluded.subtitle,
        description = excluded.description,
        duration = excluded.duration,
        total_classes = excluded.total_classes,
        seat_limit = excluded.seat_limit,
        full_fee = excluded.full_fee,
        monthly_fee = excluded.monthly_fee,
        discount_amount = excluded.discount_amount,
        curriculum_json = excluded.curriculum_json,
        metadata_json = excluded.metadata_json
    `);

    stmt.run(
      courseData.id,
      courseData.slug,
      courseData.title,
      courseData.subtitle || '',
      courseData.description || '',
      courseData.duration,
      courseData.total_classes,
      courseData.seat_limit || 20,
      courseData.enrolled_count || 0,
      courseData.full_fee,
      courseData.monthly_fee,
      courseData.discount_amount || 0,
      courseData.curriculum ? JSON.stringify(courseData.curriculum) : null,
      courseData.metadata ? JSON.stringify(courseData.metadata) : null,
      courseData.is_active !== undefined ? courseData.is_active : 1
    );

    return this.findBySlugOrId(courseData.slug);
  },

  incrementEnrolledCount(courseId) {
    const stmt = db.prepare('UPDATE courses SET enrolled_count = enrolled_count + 1 WHERE id = ? OR slug = ?');
    stmt.run(courseId, courseId);
    return this.findBySlugOrId(courseId);
  }
};
