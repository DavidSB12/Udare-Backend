const express = require('express');
const router = express.Router();

// Import all the routes from the routes folder
const challengeRoutes = require('./challengeRoutes.js');
const userRoutes = require('./userRoutes.js');
const postsRoutes = require('./postRoutes.js');
const reactionRoutes = require('./reactionRoutes.js');


// Use the routes
router.use('/challenges', challengeRoutes);
router.use('/users', userRoutes);
router.use('/posts', postsRoutes);
router.use('/reactions', reactionRoutes);


module.exports = router;