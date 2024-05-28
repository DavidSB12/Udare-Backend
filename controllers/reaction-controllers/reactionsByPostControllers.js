const Post = require("../../model/Post.js");
const Reaction = require("../../model/Reaction");
const reactionRepository = require('../../repositories/reaction-repository.js');



const getReactionsByPostId = async (req,res) => {
  const postId = req.params.id  
  try {
    const reactions = await reactionRepository.getReactionsByPostId(postId);
    return res.status(200).json(reactions);
  } catch (error) {
    console.error("Error getting reactions by post ID:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReactionsByPostId
};

