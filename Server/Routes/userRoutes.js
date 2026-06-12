const express = require('express');
const router = express.Router();
// Import the new registerUser function
const { getAllUsers, getUserProfile, registerUser , loginUser , updateUserProfile} = require('../controllers/userController');

// Route to GET all users OR POST (create) a new user
router.route('/')
    .get(getAllUsers)
    .post(registerUser); // <--- This line allows React to send data here

// Route to GET a specific user
router.get('/:id', getUserProfile);
router.post('/login',loginUser);
router.put('/:id', updateUserProfile);

module.exports = router;