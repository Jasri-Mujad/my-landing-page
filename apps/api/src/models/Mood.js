const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
    title: { type: String, required: true },
    sourceUrl: { type: String }, // YouTube link (legacy)
    spotifyPlaylistUrl: { type: String }, // Spotify embed URL
    isActive: { type: Boolean, default: false }, // Only one active at a time
    comments: [{
        user: { type: String, required: true },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('Mood', moodSchema);
