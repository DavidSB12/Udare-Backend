const Reaction = require("../../model/Reaction");
const Post = require("../../model/Post.js");
const { uploadImageService } = require("../../services/awsConnectionService.js");
const reactionRepository = require('../../repositories/reaction-repository.js');
const postRepository = require('../../repositories/post-repository.js');



const getAllReactions = async (req, res) => {
  let reactions;
  try {
    reactions = await reactionRepository.getAllReactions();
    return res.status(200).json(reactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReactionById = async (req, res) => {
  const reactionId = req.params.id;
  try {
    const reaction = await reactionRepository.getReactionById(reactionId);
    if (!reaction) {
      return res.status(404).json({ message: "Reaction not found." });
    }
    res.status(200).json(reaction);
  } catch (error) {
    console.error("Error getting reaction by ID:", error);
    res.status(500).json({ error: "Error retrieving reaction by ID." });
  }
};

const addReaction = async (req, res) => {
  const reaction = JSON.parse(req.body.reaction); 
  const { userId, postId } = reaction;

  const imageURL = await uploadImageService(req.files.image[0]);

  let newId;

  try {
    let newReaction = new Reaction({
      userId,
      postId,
      imageURL,
    });
    newReaction = await reactionRepository.addReaction(newReaction);
    newId = newReaction._id;
    res.status(201).json(newReaction);
  } catch (error) {
    console.error("Error adding a new reaction:", error);
    res.status(500).json({ error: "Error adding a new reaction" });
  }
  // Update post reactions
  try {
    const post = await postRepository.getPostById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }
    post.reactions.push(newId);
    await postRepository.updatePostById(postId,post);
  } catch (error) {
    console.error("Error updating post reactions:", error);
    res.status(500).json({ error: "Error updating post reactions." });
  }
};

const updateReaction = async (req, res) => {
  const reactionId = req.params.id;
  const updatedReactionData = req.body;
  try {
    const updatedReaction = await reactionRepository.updateReactionById(
      reactionId,
      updatedReactionData
    );
    if (!updatedReaction) {
      return res.status(404).json({ message: "Reaction not found." });
    }
    res.status(200).json(updatedReaction);
  } catch (error) {
    console.error("Error updating reaction:", error);
    res.status(500).json({ error: "Error updating reaction." });
  }
};

const deleteReaction = async (req, res) => {
  const reactionId = req.params.id;
  try {
    const deletedReaction = await reactionRepository.deleteReactionById(reactionId);
    if (!deletedReaction) {
      return res.status(404).json({ message: "Reaction not found." });
    }
    res.status(200).json(deletedReaction);
  } catch (error) {
    console.error("Error deleting reaction:", error);
    res.status(500).json({ error: "Error deleting reaction." });
  }
};

module.exports = {
  getAllReactions,
  getReactionById,
  addReaction,
  updateReaction,
  deleteReaction,
};
