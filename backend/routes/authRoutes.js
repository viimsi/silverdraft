const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// POST /api/auth/register - Register a new user
router.post('/register', registerUser);

// POST /api/auth/login - Login an existing user
router.post('/login', loginUser);

// POST /api/auth/logout - Logout the current user
router.post('/logout', protect, (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
});

// GET /api/auth/me - Get the current logged-in user
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/auth/me - Update the current logged-in user
router.put('/me', protect, async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();
        res.status(200).json({
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;