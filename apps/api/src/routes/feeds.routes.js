const express = require('express');
const router = express.Router();
const Feed = require('../models/Feed');
const ActivityLog = require('../models/ActivityLog');
const { requireAuth } = require('../middleware/auth');

// GET /api/feeds - List all feeds
router.get('/', async (req, res) => {
    try {
        const feeds = await Feed.find().sort({ date: -1 });
        res.json(feeds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/feeds - Create feed (auth required)
router.post('/', requireAuth, async (req, res) => {
    try {
        const feed = new Feed(req.body);
        await feed.save();

        // Log activity
        await new ActivityLog({
            action: 'created',
            resourceType: 'feed',
            resourceTitle: feed.title,
            resourceId: feed._id.toString()
        }).save();

        res.status(201).json(feed);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/feeds/:id - Update feed (auth required)
router.put('/:id', requireAuth, async (req, res) => {
    try {
        const feed = await Feed.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!feed) {
            return res.status(404).json({ error: 'Feed not found' });
        }

        // Log activity
        await new ActivityLog({
            action: 'updated',
            resourceType: 'feed',
            resourceTitle: feed.title,
            resourceId: feed._id.toString()
        }).save();

        res.json(feed);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/feeds/:id - Delete feed (auth required)
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const feed = await Feed.findByIdAndDelete(req.params.id);
        if (!feed) {
            return res.status(404).json({ error: 'Feed not found' });
        }

        // Log activity
        await new ActivityLog({
            action: 'deleted',
            resourceType: 'feed',
            resourceTitle: feed.title,
            resourceId: feed._id.toString()
        }).save();

        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
