const express = require('express');
const connectDB = require('./config/database');
const { connectRedis } = require('./config/redis');

const app = express();
const PORT = process.env.PORT || 3002;


connectDB();
connectRedis();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Product Service is up and running!" });
});

app.use('/products', require('./routes/products_routes'));

app.listen(PORT, () => {
    console.log(`Product Service server listening on port ${PORT}`);
});