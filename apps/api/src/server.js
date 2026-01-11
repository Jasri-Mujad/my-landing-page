const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const promClient = require('prom-client');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://www.jasricozyspace.com', 'https://jasricozyspace.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jasri-space')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/projects.routes');
const feedRoutes = require('./routes/feeds.routes');
const moodRoutes = require('./routes/mood.routes');
const profileRoutes = require('./routes/profile.routes');
const trackRoutes = require('./routes/tracks.routes');
const uploadRoutes = require('./routes/upload.routes');
const statsRoutes = require('./routes/stats.routes');
const activityRoutes = require('./routes/activity.routes');

app.use('/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/feeds', feedRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/command-center', require('./routes/commandCenter.routes'));

// Health check endpoint
app.get('/', (req, res) => {
    res.send('Jasri Space API is running');
});

// Health check endpoint for monitoring
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Prometheus Metrics Setup
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ prefix: 'jasri_api_' });

// Custom metrics
const httpRequestCounter = new promClient.Counter({
    name: 'jasri_api_http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status']
});

// Metrics middleware
app.use((req, res, next) => {
    res.on('finish', () => {
        httpRequestCounter.inc({
            method: req.method,
            route: req.route?.path || req.path,
            status: res.statusCode
        });
    });
    next();
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});

// Export app for testing
module.exports = app;

// Start Server only if run directly (not imported for testing)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}
