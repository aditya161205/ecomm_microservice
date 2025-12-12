const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User');


router.post('/register', async (req, res) => {
    try {
        const { username, email } = req.body;


        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }


        const newUser = await User.create({ username, email });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


router.get('/dashboard/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const productResponse = await axios.get('http://product-service:3002/products');

        res.json({
            user: { username: user.username, email: user.email },
            recommendedProducts: productResponse.data
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to load dashboard" });
    }
});

module.exports = router;