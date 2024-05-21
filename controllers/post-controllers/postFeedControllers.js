const postRepository = require('../../repositories/post-repository.js');

const getFirstPosts = async (req, res) => {
  try {
     let posts = await postRepository.getFirstPosts(req.query)      
      return res.status(200).json(posts);
  } catch(err) {      
      res.status(500).json({ message: err.message });
  }
}

const getFriendsPosts = async (req, res) => {
  const userId = req.params.userId;
  try {
    let posts = await postRepository.getFriendsPosts(userId);

    return res.status(200).json(posts);   
  }
  catch(err) {      
      res.status(500).json({ message: err.message });
  }
}

module.exports = {
    getFirstPosts,
    getFriendsPosts    
}

