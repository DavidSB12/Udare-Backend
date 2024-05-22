const Post = require("../model/Post");
const User = require("../model/User");

const getAllPosts = async () => {
  try {
    const users = await Post.find();
    return users;
  } catch (err) {
    throw new Error("Error retrieving posts: " + err.message);
  }
};

const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (err) {
    throw new Error("Error retrieving post by ID: " + err.message);
  }
};

const addPost = async (postData) => {
  try {
    const newPost = new Post(postData);
    await newPost.save();
    return newPost;
  } catch (err) {
    throw new Error("Error adding new post: " + err.message);
  }
};

const updatePostById = async (postId, updatedPostData) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, updatedPostData, {
      new: true,
    });
    return updatedPost;
  } catch (err) {
    throw new Error("Error updating post by ID: " + err.message);
  }
};

const deletePostById = async (postId) => {
  try {
    const deletedPost = await Post.findByIdAndRemove(postId);
    return deletedPost;
  } catch (err) {
    throw new Error("Error deleting post by ID: " + err.message);
  }
};

const getFirstPosts = async (lastPostDate) => {
  try {
    let query = lastPostDate ? { date: { $lt: new Date(lastPostDate) } } : {};

    // Buscar los 6 posts más recientes ordenados por fecha de creación descendente
    let posts = await Post.find(query).sort({ date: -1 }).limit(6);

    return posts;
  } catch (err) {
    throw new Error("Error getting firsts posts: " + err.message);
  }
};

const getFriendsPosts = async (userId) => {
  try {
    let user = await User.findById(userId).populate("profile.following");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followingUserIds = user.profile.following.map((friend) => friend._id);

    const posts = await Post.find({ userID: { $in: followingUserIds } }).sort({
      date: -1,
    });

    return posts;
  } catch (err) {
    throw new Error("Error getting friendsPosts: " + err.message);
  }
};


const getLatestPostOfUser = async (userId) => {
  try {
    let user = await User.findById(userId).populate("posts");
    let sortedPosts = user.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    let latestPost = sortedPosts[0];
    return latestPost;
  } catch (err) {
    throw new Error("Error retrieving the latest post: " + err.message);
  }
};

module.exports = {
  addPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
  getFirstPosts,
  getFriendsPosts,
  getLatestPostOfUser
};
