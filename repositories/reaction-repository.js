const Reaction = require("../model/Reaction");
const Post = require("../model/Post");

const getAllReactions = async () => {
  try {
    const reactions = await Reaction.find();
    return reactions;
  } catch (err) {
    throw new Error("Error retrieving reactions: " + err.message);
  }
};

const getReactionById = async (reactionId) => {
  try {
    const reaction = await Reaction.findById(reactionId);
    return reaction;
  } catch (err) {
    throw new Error("Error retrieving reaction by ID: " + err.message);
  }
};

const addReaction = async (reactionData) => {
  try {
    await reactionData.save();
    return reactionData;
  } catch (err) {
    throw new Error("Error adding new reaction: " + err.message);
  }
};

const updateReactionById = async (reactionId, updatedReactionData) => {
  try {
    const updatedReaction = await Reaction.findByIdAndUpdate(
      reactionId,
      updatedReactionData,
      {
        new: true,
      }
    );
    return updatedReaction;
  } catch (err) {
    throw new Error("Error updating reaction by ID: " + err.message);
  }
};

const deleteReactionById = async (reactionId) => {
  try {
    const deletedReaction = await Reaction.findByIdAndRemove(reactionId);
    return deletedReaction;
  } catch (err) {
    throw new Error("Error deleting reaction by ID: " + err.message);
  }
};

const getReactionsByPostId = async (postId) => {
  try {
    const post = await Post.findById(postId);
    console.log(post)
    if (!post) {
      throw new Error("Post not found.");
    }
    // Get the reactions by post ID
    const reactions = await Reaction.find({ postId: postId });
    console.log(reactions)
    if (!reactions) {
      throw new Error("Reactions not found.");
    }
    return reactions;
  } catch (error) {
    console.error("Error getting reactions by post ID:", error);
    throw new Error("Error retrieving reactions by post ID.");
  }
};

module.exports = {
  getAllReactions,
  getReactionById,
  deleteReactionById,
  updateReactionById,
  addReaction,
  getReactionsByPostId,
};
