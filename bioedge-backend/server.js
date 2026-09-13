import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import courseRoutes from './src/routes/courseRoutes.js';
import enrollmentRoutes from './src/routes/enrollmentRoutes.js';
import { initDatabase } from './src/config/database.js';
import { seedDatabase } from './src/seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database & seed initial courses and accounts
initDatabase();
await seedDatabase();

// Root status endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Bio Edge Backend API',
    health: '/api/health',
    courses: '/api/courses',
    version: '1.0.0'
  });
});

// Production-ready dynamic CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.onrender.com') ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }
    // Allow any origin with credentials
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Bio Edge Backend API is active and healthy',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.originalUrl} not found.`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'An unexpected server error occurred. Please try again later.'
  });
});

app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 Bio Edge Backend Server running on http://localhost:${PORT}`);
  console.log(`📚 Public Courses API: http://localhost:${PORT}/api/courses`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`💳 Enrollment API: http://localhost:${PORT}/api/enrollments`);
  console.log(`=================================================\n`);
});
