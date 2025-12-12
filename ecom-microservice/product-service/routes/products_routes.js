const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { getClient } = require('../config/redis');


router.get('/', async (req, res) => {
    try {
        const redis = getClient();

        const cachedProducts = await redis.get('all_products');

        if (cachedProducts) {
            console.log('⚡Cache Hit! Returning data from Redis');
            return res.json(JSON.parse(cachedProducts));
        }

        console.log('🐢Cache Miss. Fetching from MongoDB...');
        const products = await Product.find();

        await redis.setEx('all_products', 3600, JSON.stringify(products));

        res.json(products);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();

        const redis = getClient();
        await redis.del('all_products');

        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;