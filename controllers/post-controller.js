const Post = require('../model/Post.js');
const ImageUpload = require('../services/ImageUpload.js');
const singleUpload = ImageUpload.single("image");

const getAllPosts = async (req, res) => {
    let posts;
    console.log("getAllPosts");
    try {
        posts = await Post.find();
        // console.log(posts);
        return res.status(200).json(posts);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
}

const getPostById = async (req, res) => {
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
}

const addPost = async (req,res) => {
    const {title, description, image, user, challenge} = req.body;    

    try {
        const newPost = new Post({
          title,
          description,
          image,
          user,
          challenge,
        });
        await newPost.save();
        res.status(201).json(newPost);
      } 
      catch (error) {
        console.error('Error adding a new post:', error);
        res.status(500).json({ error: 'Error adding a new post' });
      }

      const uid = newPost._id;

      singleUpload(req, res, function(err) {
        if (err) {
            return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message, error : err}] });
        }
        // console.log(req.file);

        let update = {image: req.file.location};

        Post.findByIdAndUpdate(uid, update, {new: true})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({error: err.message});
        });

    });
}

const updatePost = async (req, res) => {
    const postId = req.params.id;
    const {title, description, image, user, challenge} = req.body;
    try {
      const updatedPost = await Post.findByIdAndUpdate(postId, {
        title,
        description,
        image,
        user,
        challenge,
      });
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
      const deletedPost = await Post.findByIdAndDelete(postId);
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

const uploadImage = async (req, res) => {
    const uid = req.params.id;

    singleUpload(req, res, function(err) {
        if (err) {
            return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message, error : err}] });
        }
        // console.log(req.file);

        let update = {'image': req.file.location};

        Post.findByIdAndUpdate(uid, update, {new: true})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({error: err.message});
        });
    });


}

module.exports = {
    getAllPosts,
    getPostById,
    addPost,
    updatePost,
    deletePost,
    uploadImage
}

