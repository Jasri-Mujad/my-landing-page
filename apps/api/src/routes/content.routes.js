const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Feed = require('../models/Feed');
const Mood = require('../models/Mood');
const jwt = require('jsonwebtoken');

// Middleware to check Auth
const requireAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
    }
};

// --- PROJECTS ---
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/projects', requireAuth, async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/projects/:id', requireAuth, async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/projects/:id', requireAuth, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- FEEDS ---
router.get('/feeds', async (req, res) => {
    try {
        const feeds = await Feed.find().sort({ date: -1 });
        res.json(feeds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/feeds', requireAuth, async (req, res) => {
    try {
        const feed = new Feed(req.body);
        await feed.save();
        res.status(201).json(feed);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/feeds/:id', requireAuth, async (req, res) => {
    try {
        await Feed.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- MOOD ---
router.get('/mood', async (req, res) => {
    try {
        // Return the one active mood or the latest
        const mood = await Mood.findOne({ isActive: true });
        res.json(mood || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/mood', requireAuth, async (req, res) => {
    try {
        // Deactivate others if setting this one to active
        if (req.body.isActive) {
            await Mood.updateMany({}, { isActive: false });
        }
        const mood = new Mood(req.body);
        await mood.save();
        res.status(201).json(mood);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
