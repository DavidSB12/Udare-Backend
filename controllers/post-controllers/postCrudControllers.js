const postRepository = require('../../repositories/post-repository.js');
const {uploadImageService} = require('../../services/awsConnectionService.js');
const Post = require("../../model/Post");




const getAllPosts = async (req, res) => {
    let posts;
    try {
        posts = await postRepository.getAllPosts();
        return res.status(200).json(posts);
    }
    catch(err) {      
        res.status(500).json({ message: err.message });
    }
}

const getPostById = async (req, res) => {
    const postId = req.params.id;
    try {
      const post = await postRepository.getPostById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
      }
      res.status(200).json(post);
    } 
    catch (error) {
      console.error('Error getting post by ID:', error);
      res.status(500).json({ error: 'Error retrieving post by ID.' });
    }
}
const addPost = async (req,res) => {         
  try {
    if(!req.files) return res.status(400).json({ message: 'Image not found' });
    const url = await uploadImageService(req.files.image[0]);

    const post = JSON.parse(req.body.post);
    const {userID, challengeID, caption, date, comments} = post;
    const image = url;
    
    let newPost = new Post({
      userID,
      challengeID,
      caption,
      date,
      image,
      comments
    });
    await postRepository.addPost(newPost);
    res.status(201).json(newPost);
  } 
  catch (error) {
    console.error('Error adding a new post:', error);
    res.status(500).json({ error: 'Error adding a new post' });
  }
}

const updatePost = async (req, res) => {
    const postId = req.params.id;
    const updatedPostData = req.body;    
    try {
      const updatedPost = await postRepository.updatePostById(postId,updatedPostData);
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found.' });
      }
      res.status(200).json(updatedPost);
    } 
    catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Error updating post.' });
    }
}

const deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
      const deletedPost = await postRepository.deletePostById(postId);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found.' });
      }
      res.status(200).json(deletedPost);
    } 
    catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Error deleting post.' });
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    addPost,
    updatePost,
    deletePost
}

