const request = require('supertest');
const app = require('../server');

describe('Health Check Endpoints', () => {
    describe('GET /', () => {
        it('should return API running message', async () => {
            const res = await request(app).get('/');

            expect(res.statusCode).toBe(200);
            expect(res.text).toContain('Jasri Space API is running');
        });
    });

    describe('GET /health', () => {
        it('should return healthy status with timestamp', async () => {
            const res = await request(app).get('/health');

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('status', 'healthy');
            expect(res.body).toHaveProperty('timestamp');
        });
    });
});
