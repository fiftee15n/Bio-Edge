import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Base health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Bio Edz API is running smoothly' });
});

// API Routes placeholder
app.get('/api/course', (req, res) => {
  res.json({
    title: 'Premium HEC Biology Intensive Program',
    duration: '4 Months',
    totalClasses: 48,
    papers: ['First Paper', 'Second Paper'],
    seatLimit: 20
  });
});

app.listen(PORT, () => {
  console.log(`Bio Edz Backend running on port ${PORT}`);
});
