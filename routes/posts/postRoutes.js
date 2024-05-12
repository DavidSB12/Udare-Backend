const express = require('express');
const router = express.Router();
const ImageUpload = require('../../services/ImageUpload');

const {getAllPosts, getPostById, addPost, updatePost, deletePost, uploadImage, addComment, getFirstPosts, getFriendsPosts} = require('../../controllers/post-controller.js');

router.get('/', getAllPosts);
router.get('/getFirst', getFirstPosts);
router.get('/getFriendsPosts/:userId', getFriendsPosts);
router.get('/:id', getPostById);
router.post('/add', ImageUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'post', maxCount: 1 }]),addPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/upload', uploadImage);
router.post('/:id/addComment', addComment)




module.exports = router;
