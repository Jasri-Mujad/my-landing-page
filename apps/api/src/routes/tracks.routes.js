const express = require('express');
const router = express.Router();
const Track = require('../models/Track');
const { requireAuth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

const cpUpload = upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
]);

// GET /api/tracks - List all tracks (ordered)
router.get('/', async (req, res) => {
    try {
        const tracks = await Track.find().sort({ order: 1, createdAt: -1 });
        res.json(tracks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/tracks/:id - Get single track
router.get('/:id', async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).json({ error: 'Track not found' });
        }
        res.json(track);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/tracks - Create track (auth required)
router.post('/', requireAuth, cpUpload, async (req, res) => {
    try {
        console.log('Files:', req.files);
        console.log('Body:', req.body);

        if (!req.files || !req.files['audio']) {
            return res.status(400).json({ error: 'Audio file is required' });
        }

        const audioFile = req.files['audio'][0];
        const audioUrl = `/uploads/${audioFile.filename}`;

        let coverImage = null;
        if (req.files['cover']) {
            const coverFile = req.files['cover'][0];
            coverImage = `/uploads/${coverFile.filename}`;
        } else if (req.body.coverImageUrl) {
            coverImage = req.body.coverImageUrl;
        }

        const track = new Track({
            title: req.body.title,
            artist: req.body.artist,
            audioUrl: audioUrl,
            coverImage: coverImage,
            order: req.body.order || 0,
            duration: req.body.duration || 0
        });

        await track.save();
        res.status(201).json(track);
    } catch (err) {
        console.error('Track creation error:', err);
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/tracks/:id - Update track (auth required)
router.put('/:id', requireAuth, cpUpload, async (req, res) => {
    try {
        const updateData = {
            title: req.body.title,
            artist: req.body.artist,
            order: req.body.order
        };

        if (req.files['audio']) {
            const audioFile = req.files['audio'][0];
            updateData.audioUrl = `/uploads/${audioFile.filename}`;
        }

        if (req.files['cover']) {
            const coverFile = req.files['cover'][0];
            updateData.coverImage = `/uploads/${coverFile.filename}`;
        } else if (req.body.coverImageUrl) {
            updateData.coverImage = req.body.coverImageUrl;
        }

        const track = await Track.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!track) {
            return res.status(404).json({ error: 'Track not found' });
        }
        res.json(track);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/tracks/:id - Delete track (auth required)
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const track = await Track.findByIdAndDelete(req.params.id);
        if (!track) {
            return res.status(404).json({ error: 'Track not found' });
        }
        // Optional: Delete associated files from filesystem
        res.json({ message: 'Track deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
