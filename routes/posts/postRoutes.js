const express = require('express');
const router = express.Router();
const ImageUpload = require('../../services/ImageUpload');
const multer = require("multer")
const {getAllPosts, getPostById, addPost, updatePost, deletePost, uploadImage, addComment, getFirstPosts, getFriendsPosts, newAddPost} = require('../../controllers/post-controller.js');

//store the images in memory
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get('/', getAllPosts);
router.get('/getFirst', getFirstPosts);
router.get('/getFriendsPosts/:userId', getFriendsPosts);
router.get('/:id', getPostById);
router.post('/add', ImageUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'post', maxCount: 1 }]),addPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/upload', uploadImage);
router.post('/:id/addComment', addComment)
router.post("/newAddPost", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'post', maxCount: 1 }]),newAddPost);




module.exports = router;
