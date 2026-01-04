const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Mock User (In production, use DB)
// TODO: Seed this user in DB
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$YourHashedPasswordHere'; // bcrypt hash

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Simple check (Replace with DB lookup)
    if (username === ADMIN_USERNAME) {
        // In real app, verify hash: await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
        // For MVP/Demo, simple string compare if not hashed yet, or assume password matches for now if we haven't seeded.
        // Let's implement a simple "admin" "admin" check for MVP or use env vars

        let isValid = false;
        if (password === (process.env.ADMIN_PASSWORD || 'admin123')) {
            isValid = true;
        }

        if (isValid) {
            const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            return res.json({ success: true, message: 'Logged in' });
        }
    }

    res.status(401).json({ success: false, message: 'Invalid credentials' });
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out' });
});

router.get('/me', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({ authenticated: false });

    try {
        jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        res.json({ authenticated: true, user: { username: ADMIN_USERNAME } });
    } catch (err) {
        res.json({ authenticated: false });
    }
});

// POST /auth/change-password - Change admin password
router.post('/change-password', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ success: false, message: 'Current password and new password are required' });
    }

    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (currentPassword !== adminPassword) {
        return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    if (newPassword.length < 6) {
        return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }

    // Note: For MVP, this updates the in-memory password but doesn't persist across server restarts
    // In production, store hashed password in database
    process.env.ADMIN_PASSWORD = newPassword;

    res.json({ success: true, message: 'Password changed successfully' });
});

module.exports = router;
