require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 1. Import CORS

const path = require('path');

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./Routes/courseRoutes');

const app = express();

// --- MIDDLEWARE (MUST GO BEFORE ROUTES) ---
app.use(cors()); // 2. Enable CORS for all requests
// Parses incoming JSON data

// Increase the limit to 200mb so large Base64 videos/images can pass through!
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- ROUTES ---
app.use('/api/users', userRoutes); // 3. Your routes come AFTER middleware
app.use('/api/courses', courseRoutes);

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