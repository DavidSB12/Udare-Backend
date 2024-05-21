const Post = require('../../model/Post.js');
const User = require("../../model/User.js");
const postRepository = require('../../repositories/post-repository.js');


const addComment = async (req, res) => {
  const postId = req.params.id;
  const { userId, comment } = req.body;

  try {
      // Buscar el post por ID
      const post = await postRepository.getPostById(postId);

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
      const postActualizado = await postRepository.updatePostById(postId, post);

      res.status(201).json(postActualizado);
  } catch (error) {
      console.error('Error añadiendo comment to post:', error);
      res.status(500).json({ error: 'Error adding comment to post.' });
  }
};

module.exports = {
    addComment   
}

