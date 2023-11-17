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
    const post = JSON.parse(req.body.post)
    const {userID, challengeID, caption, date} = post;    
    const image = req.files.image[0].location;

    try {
        let newPost = new Post({
          userID,
          challengeID,
          caption,
          date,
          image,
          comments
        });
        await newPost.save();
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
      const updatedPost = await Post.findByIdAndUpdate(postId, updatedPostData);
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
    console.log(req.files)
    singleUpload(req, res, function(err) {
        if (err) {
            return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message, error : err}] });
        }

        let update = {"image": req.file.location};

        Post.findByIdAndUpdate(uid, update, {new: true})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({error: err.message});
        });
    });


}

const addComment = async (req, res) => {
  const postId = req.params.id;
  const { userId, comment } = req.body;

  try {
      // Buscar el post por ID
      const post = await Post.findById(postId);

      if (!post) {
          return res.status(404).json({ message: 'Post not found.' });
      }

      // Crear un nuevo comentario
      const nuevoComentario = {
          userId: userId,
          comment: comment
      };

      // Agregar el nuevo comentario a la lista de comentarios del post
      post.comments.push(nuevoComentario);

      // Guardar el post actualizado
      const postActualizado = await post.save();

      res.status(200).json(postActualizado);
  } catch (error) {
      console.error('Error añadiendo comment to post:', error);
      res.status(500).json({ error: 'Error adding comment to post.' });
  }
};

module.exports = {
    getAllPosts,
    getPostById,
    addPost,
    updatePost,
    deletePost,
    uploadImage,
    addComment
}

