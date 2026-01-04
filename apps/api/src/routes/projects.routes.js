const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const ActivityLog = require('../models/ActivityLog');
const { requireAuth } = require('../middleware/auth');

// GET /api/projects - List all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/projects - Create project (auth required)
router.post('/', requireAuth, async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();

        // Log activity
        await new ActivityLog({
            action: 'created',
            resourceType: 'project',
            resourceTitle: project.title,
            resourceId: project._id.toString()
        }).save();

        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/projects/:id - Update project (auth required)
router.put('/:id', requireAuth, async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Log activity
        await new ActivityLog({
            action: 'updated',
            resourceType: 'project',
            resourceTitle: project.title,
            resourceId: project._id.toString()
        }).save();

        res.json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /api/projects/:id - Delete project (auth required)
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Log activity
        await new ActivityLog({
            action: 'deleted',
            resourceType: 'project',
            resourceTitle: project.title,
            resourceId: project._id.toString()
        }).save();

        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
