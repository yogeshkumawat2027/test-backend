// In your backend server file (e.g., server.js, app.js, or index.js)
const express = require('express');
const cors = require('cors');
const app = express();

// Configure CORS
app.use(cors({
  origin: [
    'https://test-frontend-ef4z.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Your existing middleware and routes
app.use(express.json());

// Your API routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend! CORS is working!' });
});

// ...rest of your code