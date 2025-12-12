const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
    res.json({ message: "API Gateway is Running 🚪" });
});

// 1. User Service
app.use('/auth', createProxyMiddleware({
    target: 'http://user-service:3001',
    changeOrigin: true,
    pathRewrite: {
        '^/': '/auth/',
    },
}));

// 2. Product Service
app.use('/products', createProxyMiddleware({
    target: 'http://product-service:3002',
    changeOrigin: true,
    pathRewrite: {
        '^/': '/products/',
    },
}));

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});