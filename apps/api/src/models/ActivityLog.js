const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    action: {
        type: String,
        enum: ['created', 'updated', 'deleted'],
        required: true
    },
    resourceType: {
        type: String,
        enum: ['feed', 'project', 'mood', 'profile'],
        required: true
    },
    resourceTitle: {
        type: String,
        required: true
    },
    resourceId: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
