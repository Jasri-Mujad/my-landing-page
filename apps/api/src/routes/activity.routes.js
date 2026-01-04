const express = require('express');
const router = express.Router();
const ActivityLog = require('../models/ActivityLog');

// GET /api/activity - Get recent activity logs
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const activities = await ActivityLog.find()
            .sort({ timestamp: -1 })
            .limit(limit);

        res.json(activities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
