const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../server');
const User = require('../models/User');

describe('Auth Endpoints', () => {
    describe('POST /auth/login', () => {
        it('should return 401 for invalid credentials', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({ username: 'wronguser', password: 'wrongpass' });

            expect(res.statusCode).toBe(401);
            expect(res.body.success).toBe(false);
        });

        it('should login successfully with valid DB credentials', async () => {
            // Create a test user
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('testpass123', salt);
            await User.create({
                username: 'testadmin',
                password: hashedPassword,
                email: 'test@example.com'
            });

            const res = await request(app)
                .post('/auth/login')
                .send({ username: 'testadmin', password: 'testpass123' });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.headers['set-cookie']).toBeDefined();
        });
    });

    describe('POST /auth/logout', () => {
        it('should clear token cookie on logout', async () => {
            const res = await request(app).post('/auth/logout');

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Logged out');
        });
    });

    describe('GET /auth/me', () => {
        it('should return authenticated: false without token', async () => {
            const res = await request(app).get('/auth/me');

            expect(res.statusCode).toBe(200);
            expect(res.body.authenticated).toBe(false);
        });

        it('should return authenticated: true with valid token', async () => {
            // Create user and login first
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('testpass123', salt);
            await User.create({
                username: 'testadmin',
                password: hashedPassword,
                email: 'test@example.com'
            });

            const loginRes = await request(app)
                .post('/auth/login')
                .send({ username: 'testadmin', password: 'testpass123' });

            const cookies = loginRes.headers['set-cookie'];

            const res = await request(app)
                .get('/auth/me')
                .set('Cookie', cookies);

            expect(res.statusCode).toBe(200);
            expect(res.body.authenticated).toBe(true);
        });
    });
});
