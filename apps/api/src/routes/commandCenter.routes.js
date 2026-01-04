const express = require('express');
const router = express.Router();
const CommandCenter = require('../models/CommandCenter');

// GET /api/command-center
router.get('/', async (req, res) => {
    try {
        let commandCenter = await CommandCenter.findOne();
        if (!commandCenter) {
            // Return default structure if not found
            return res.json({ images: [] });
        }
        res.json(commandCenter);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/command-center
router.post('/', async (req, res) => {
    try {
        const { images } = req.body;

        // Validate
        if (!Array.isArray(images)) {
            return res.status(400).json({ message: 'Images must be an array' });
        }
        if (images.length > 3) {
            return res.status(400).json({ message: 'Maximum 3 images allowed' });
        }

        let commandCenter = await CommandCenter.findOne();
        if (commandCenter) {
            commandCenter.images = images;
            commandCenter.updatedAt = Date.now();
        } else {
            commandCenter = new CommandCenter({ images });
        }

        const saved = await commandCenter.save();
        res.json(saved);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
