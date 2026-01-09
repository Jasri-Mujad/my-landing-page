const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Email Transporter (Configure via .env)
const transporter = nodemailer.createTransport({
    service: 'gmail', // or use host/port
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});

// Helper to send email
const sendEmail = async (to, subject, text) => {
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
        console.log("⚠️ SMTP not configured. Printing email to console:");
        console.log(`To: ${to}\nSubject: ${subject}\nText: ${text}`);
        return;
    }
    await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to,
        subject,
        text
    });
};

// LOGIN
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Fallback for initial setup if no DB user exists but ENV var is set
        if (!await User.findOne({ username: 'admin' }) && username === (process.env.ADMIN_USERNAME || 'admin') && password === (process.env.ADMIN_PASSWORD || 'admin123')) {
            const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            });
            return res.json({ success: true, message: 'Logged in via Legacy Env' });
        }

        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, username: user.username, role: 'admin' }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ success: true, message: 'Logged in successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// LOGOUT
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out' });
});

// CHECK AUTH
router.get('/me', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({ authenticated: false });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        res.json({ authenticated: true, user: decoded });
    } catch (err) {
        res.json({ authenticated: false });
    }
});

// FORGOT PASSWORD (Generate OTP)
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
        await user.save();

        await sendEmail(email, 'Password Reset OTP', `Your OTP is: ${otp}`);

        res.json({ success: true, message: 'OTP sent to email' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// VERIFY OTP & RESET PASSWORD
router.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        if (newPassword.length < 6) return res.status(400).json({ success: false, message: 'Password too short' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.json({ success: true, message: 'Password reset successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// CHANGE PASSWORD (LOGGED IN)
router.post('/change-password', async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: 'Not authenticated' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');

        const { currentPassword, newPassword } = req.body;

        // Handle Env User Case
        if (decoded.role === 'admin' && !decoded.id) {
            const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
            if (currentPassword !== adminPassword) return res.status(400).json({ success: false, message: 'Incorrect password' });
            // Can't really update env var persistently, so warn user or create DB user
            return res.status(400).json({ success: false, message: 'Cannot change env-based password. Please migrate to DB user.' });
        }

        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: 'Incorrect current password' });

        if (newPassword.length < 6) return res.status(400).json({ success: false, message: 'Password too short' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ success: true, message: 'Password updated' });

    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
});

module.exports = router;
