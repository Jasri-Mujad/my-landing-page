const request = require('supertest');
const app = require('../server');
const Project = require('../models/Project');

describe('Projects Endpoints', () => {
    describe('GET /api/projects', () => {
        it('should return empty array when no projects exist', async () => {
            const res = await request(app).get('/api/projects');

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBe(0);
        });

        it('should return projects when they exist', async () => {
            // Create test projects
            await Project.create([
                { title: 'Project 1', description: 'Test project 1', category: 'web' },
                { title: 'Project 2', description: 'Test project 2', category: 'music' }
            ]);

            const res = await request(app).get('/api/projects');

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBe(2);
        });

        it('should return projects sorted by newest first', async () => {
            await Project.create({ title: 'Old Project', description: 'First project' });
            await new Promise(resolve => setTimeout(resolve, 10)); // Small delay
            await Project.create({ title: 'New Project', description: 'Second project' });

            const res = await request(app).get('/api/projects');

            expect(res.statusCode).toBe(200);
            expect(res.body[0].title).toBe('New Project');
        });
    });
});
