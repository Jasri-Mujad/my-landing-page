const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    audioUrl: { type: String, required: true }, // Base64 or external URL
    coverImage: { type: String }, // Base64 or external URL
    duration: { type: Number }, // Duration in seconds (optional)
    order: { type: Number, default: 0 } // Playlist order
}, { timestamps: true });

module.exports = mongoose.model('Track', trackSchema);
