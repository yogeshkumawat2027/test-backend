const express = require('express');
const cors = require('cors');
const app = express();

// Configure CORS for both web and mobile
app.use(cors({
  origin: [
    'https://test-frontend-ef4z.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001',
    '*' // Allow all origins for React Native
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false // Set to false for React Native compatibility
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    status: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Your API routes
app.get('/api/hello', (req, res) => {
  try {
    res.json({ 
      message: 'Hello from backend! CORS is working!',
      timestamp: new Date().toISOString(),
      source: 'Express Server'
    });
  } catch (error) {
    console.error('Error in /api/hello:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/hello`);
});

module.exports = app;