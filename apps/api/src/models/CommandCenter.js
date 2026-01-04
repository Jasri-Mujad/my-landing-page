const mongoose = require('mongoose');

const commandCenterSchema = new mongoose.Schema({
    images: [{
        type: String,
        required: true
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CommandCenter', commandCenterSchema);
