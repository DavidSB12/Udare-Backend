const express = require('express');
const router = express.Router();

// Import all the routes from the routes folder
const challengeRoutes = require('./challenges/challengeRoutes.js');
const userRoutes = require('./users/userRoutes.js');
const postsRoutes = require('./posts/postRoutes.js');
const reactionRoutes = require('./reactions/reactionRoutes.js');


// Use the routes
router.use('/challenges', challengeRoutes);
router.use('/users', userRoutes);
router.use('/posts', postsRoutes);
router.use('/reactions', reactionRoutes);


module.exports = router;