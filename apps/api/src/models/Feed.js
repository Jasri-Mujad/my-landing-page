const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Blog', 'Project', 'Photo', 'Note', 'Video'],
        required: true
    },
    title: { type: String, required: true },
    content: { type: String }, // For notes or short descriptions
    imageUrl: { type: String },
    link: { type: String },
    date: { type: Date, default: Date.now },
    meta: {
        location: String, // For Photos
        source: String    // For external links
    }
});

module.exports = mongoose.model('Feed', feedSchema);
