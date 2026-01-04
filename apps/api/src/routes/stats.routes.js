const express = require('express');
const router = express.Router();
const Feed = require('../models/Feed');
const Project = require('../models/Project');

// GET /api/stats - Get dashboard statistics
router.get('/', async (req, res) => {
    try {
        const [feedsCount, projectsCount] = await Promise.all([
            Feed.countDocuments(),
            Project.countDocuments()
        ]);

        res.json({
            feedsCount,
            projectsCount,
            lastUpdated: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
