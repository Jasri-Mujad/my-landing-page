const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const { requireAuth } = require('../middleware/auth');

// GET /api/profile - Get active profile with social links
router.get('/', async (req, res) => {
    try {
        const profile = await Profile.findOne({ isActive: true });
        res.json(profile || {});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/profile - Create profile (auth required)
router.post('/', requireAuth, async (req, res) => {
    try {
        // Deactivate others if setting this one to active
        if (req.body.isActive) {
            await Profile.updateMany({}, { isActive: false });
        }
        const profile = new Profile(req.body);
        await profile.save();
        res.status(201).json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/profile/:id - Update profile (auth required)
router.put('/:id', requireAuth, async (req, res) => {
    try {
        const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST /api/profile/:id/social-links - Add social link (auth required)
router.post('/:id/social-links', requireAuth, async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        profile.socialLinks.push(req.body);
        await profile.save();
        res.status(201).json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/profile/:id/social-links/:linkId - Remove social link (auth required)
router.delete('/:id/social-links/:linkId', requireAuth, async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        profile.socialLinks = profile.socialLinks.filter(
            link => link._id.toString() !== req.params.linkId
        );
        await profile.save();
        res.json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
