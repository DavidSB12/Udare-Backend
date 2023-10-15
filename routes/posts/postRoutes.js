const express = require('express');
const router = express.Router();
const Post = require('../../model/Post.js');

//get all posts
router.get('/', async (req, res) => {
    let posts;
    try {
        posts = await Post.find();
        return res.status(200).json(posts);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// get post by id
router.get('/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }
        res.status(200).json(post);
    } 
    catch (error) {
        console.error('Error getting post by ID:', error);
        res.status(500).json({ error: 'Error retrieving post by ID.' });
    }
});

// add a post
router.post('/add', async (req, res) => {
    const { userID, challengeID, caption, imageID, date } = req.body;
    try {
        const newPost = new Post({
            userID,
            challengeID,
            caption,
            imageID,
            date,
        });
        await newPost.save();
        res.status(201).json(newPost);
    } 
    catch (error) {
        console.error('Error adding a new post:', error);
        res.status(500).json({ error: 'Error adding a new post' });
    }
});

// update a post by id
router.put('/:id', async (req, res) => {
    const postId = req.params.id;
    const updatedPostData = req.body;
  
    try {
        const updatedPost = await Post.findByIdAndUpdate(postId, updatedPostData, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found.' });
        }
        res.status(200).json(updatedPost);
    } 
    catch (error) {
        console.error('Error updating post by ID:', error);
        res.status(500).json({ error: 'Error updating post by ID.' });
    }
});

// delete a post by id
router.delete('/:id', async (req, res) => {
    const postId = req.params.id;
  
    try {
        const deletedPost = await Post.findByIdAndRemove(postId);
  
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found.' });
        }
        res.status(200).json({ message: 'Post deleted successfully.' });
    } 
    catch (error) {
        console.error('Error deleting post by ID:', error);
        res.status(500).json({ error: 'Error deleting post by ID.' });
    }
});

module.exports = router;
