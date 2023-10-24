const express = require('express');
const router = express.Router();
// const Post = require('../../model/Post.js');

const {getAllPosts, getPostById, addPost, updatePost, deletePost, uploadImage} = require('../../controllers/post-controller.js');

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/add', addPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/upload', uploadImage);


module.exports = router;
