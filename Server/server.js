require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 1. Import CORS

const userRoutes = require('./routes/userRoutes');

const app = express();

// --- MIDDLEWARE (MUST GO BEFORE ROUTES) ---
app.use(cors()); // 2. Enable CORS for all requests
// Parses incoming JSON data

// Increase the limit to 50mb so large Base64 images can pass through!
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- ROUTES ---
app.use('/api/users', userRoutes); // 3. Your routes come AFTER middleware

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_tutorial';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ MongoDB connection failed:', error.message);
    });