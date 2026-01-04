const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');
const { requireAuth } = require('../middleware/auth');

// GET /api/mood - Get active mood
router.get('/', async (req, res) => {
    try {
        const mood = await Mood.findOne({ isActive: true });
        res.json(mood || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/mood - Create mood (auth required)
router.post('/', requireAuth, async (req, res) => {
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

// PUT /api/mood/:id - Update mood (auth required)
router.put('/:id', requireAuth, async (req, res) => {
    try {
        // Deactivate others if setting this one to active
        if (req.body.isActive) {
            await Mood.updateMany({ _id: { $ne: req.params.id } }, { isActive: false });
        }
        const mood = await Mood.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!mood) {
            return res.status(404).json({ error: 'Mood not found' });
        }
        res.json(mood);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/mood/:id - Delete mood (auth required)
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const mood = await Mood.findByIdAndDelete(req.params.id);
        if (!mood) {
            return res.status(404).json({ error: 'Mood not found' });
        }
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST /api/mood/:id/comments - Add comment (public)
router.post('/:id/comments', async (req, res) => {
    try {
        const { user, text } = req.body;
        const mood = await Mood.findById(req.params.id);
        if (!mood) {
            return res.status(404).json({ error: 'Mood not found' });
        }
        mood.comments.push({ user, text });
        await mood.save();
        res.status(201).json(mood);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
