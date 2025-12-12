const mongoose = require('mongoose');

const connectDB = async () => {
    try {

        const dbURI = process.env.MONGO_URI || 'mongodb://mongo:27017/ecommerce_products';

        await mongoose.connect(dbURI);
        console.log('MongoDB connected');

    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDB;