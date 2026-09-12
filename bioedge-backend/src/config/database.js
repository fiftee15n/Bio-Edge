import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'bioedge.db');
const db = new Database(dbPath);

// Enable WAL mode for high performance concurrent reads and writes
db.pragma('journal_mode = WAL');

// Initialize Tables
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      role TEXT NOT NULL DEFAULT 'student',
      phone TEXT,
      institution TEXT,
      exam_year TEXT,
      student_id TEXT,
      batch TEXT,
      avatar TEXT,
      is_verified INTEGER NOT NULL DEFAULT 0,
      google_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS verification_codes (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      code TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT,
      description TEXT,
      duration TEXT NOT NULL,
      total_classes INTEGER NOT NULL,
      seat_limit INTEGER NOT NULL DEFAULT 20,
      enrolled_count INTEGER NOT NULL DEFAULT 0,
      full_fee INTEGER NOT NULL,
      monthly_fee INTEGER NOT NULL,
      discount_amount INTEGER NOT NULL DEFAULT 0,
      curriculum_json TEXT,
      metadata_json TEXT,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS enrollments (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      course_id TEXT NOT NULL,
      course_slug TEXT NOT NULL,
      plan TEXT NOT NULL,
      authoritative_amount INTEGER NOT NULL,
      payment_method TEXT NOT NULL,
      payment_status TEXT NOT NULL DEFAULT 'Approved',
      enrollment_status TEXT NOT NULL DEFAULT 'Active',
      transaction_id TEXT,
      student_name TEXT,
      student_email TEXT,
      student_phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (course_id) REFERENCES courses(id)
    );

    CREATE TABLE IF NOT EXISTS teachers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      designation TEXT NOT NULL,
      institution TEXT NOT NULL,
      experience TEXT NOT NULL,
      specialization TEXT NOT NULL,
      bio TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      avatar TEXT
    );
  `);

  console.log('✅ SQLite Database initialized at:', dbPath);
}

export default db;
