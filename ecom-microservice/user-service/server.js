const express = require("express");
const { connectDB, sequelize } = require('./config/database');
const app = express();
const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 3001;
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: "User Service is up and running!" });
});
app.use('/auth', authRoutes);

const startServer = async () => {
    await connectDB();
    await sequelize.sync();

    app.listen(PORT, () => {
        console.log(`User Service running on port ${PORT}`);
    });
};

startServer();