const User = require("../model/User.js");
const { ObjectId } = require("mongodb");
const ImageUpload = require("../services/ImageUpload.js");
const singleUpload = ImageUpload.single("image");

const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ error: "Error retrieving user by ID." });
  }
};

const getUserByUid = async (req, res) => {
  const userUid = req.params.uid;
  try {
    const user = await User.findOne({ uid: userUid });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user by UID:", error);
    res.status(500).json({ error: "Error retrieving user by UID." });
  }
};

const addUser = async (req, res) => {
  // Log de req.body
  console.log(req.body);
  const { username, password, email, profile, uid } = req.body;

  try {
    const newUser = new User({
      username,
      password,
      uid,
      email,
      profile,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error adding a new user:", error);
    res.status(500).json({ error: "Error adding a new user" });
  }
};

const updateUserByIdImage = async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = JSON.parse(req.body.user);
  //const updatedUser = req.body;
  const image = req.files.image[0].location;
  console.log(req.files);
  updatedUserData.profile.profilePic = image;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user by ID:", error);
    res.status(500).json({ error: "Error updating user by ID." });
  }
};

const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user by ID:", error);
    res.status(500).json({ error: "Error updating user by ID." });
  }
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user by ID:", error);
    res.status(500).json({ error: "Error deleting user by ID." });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: "All users deleted successfully." });
  } catch (error) {
    console.error("Error deleting all users:", error);
    res.status(500).json({ error: "Error deleting all users." });
  }
};

const getFollowingOfUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate(
      "profile.following",
      null,
      "User"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const friends = user.profile.following;
    res.status(200).json(friends);
  } catch (error) {
    console.error("Error retrieving following of user:", error);
    res.status(500).json({ error: "Error retrieving friends of user." });
  }
};

const getFollowersOfUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate(
      "profile.followers",
      null,
      "User"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const friends = user.profile.followers;
    res.status(200).json(friends);
  } catch (error) {
    console.error("Error retrieving followers of user:", error);
    res.status(500).json({ error: "Error retrieving friends of user." });
  }
};

const followUser = async (req, res) => {
  const userId = req.params.id;
  const userToFollowId = req.body._id;

  try {
    const user = await User.findById(userId);
    const userToFollow = await User.findById(userToFollowId);

    if (!user || !userToFollowId) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.profile.following.includes(userToFollowId)) {
      return res
        .status(400)
        .json({ message: "You are already following this user." });
    }

    user.profile.following.push(userToFollowId);
    userToFollow.profile.followers.push(userId);

    await user.save();
    await userToFollow.save();

    res.status(200).json({ message: "User followed successfully." });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Error following user." });
  }
};

const unfollowUser = async (req, res) => {
  const userId = req.params.id;
  const userToUnfollowId = req.body._id;

  try {
    const user = await User.findById(userId);
    const userToUnfollow = await User.findById(userToUnfollowId);

    if (!user || !userToUnfollow) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.profile.following.includes(userToUnfollowId)) {
      return res
        .status(400)
        .json({ message: "You are not following this user." });
    }

    user.profile.following.pull(userToUnfollowId);
    userToUnfollow.profile.followers.pull(userId);

    await user.save();
    await userToUnfollow.save();

    res.status(200).json({ message: "User unfollowed successfully." });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ error: "Error unfollowing user." });
  }
};

const getNotFollowingUsers = async (req, res) => {
  const userId = req.params.id;

  try {
    // Obtener los usuarios que sigue el usuario especificado
    const user = await User.findById(userId).populate("profile.following");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Obtener todos los usuarios
    const allUsers = await User.find();

    // Obtener los IDs de los usuarios seguidos
    const followingIds = user.profile.following.map((followedUser) =>
      followedUser._id.toString()
    );

    // Filtrar los usuarios que no están en la lista de seguidos
    const notFollowingUsers = allUsers.filter(
      (user) =>
        !followingIds.includes(user._id.toString()) &&
        user._id.toString() !== userId
    );

    res.status(200).json(notFollowingUsers);
  } catch (error) {
    console.error("Error retrieving users not followed by user:", error);
    res
      .status(500)
      .json({ error: "Error retrieving users not followed by user." });
  }
};

const getTopUsers = async (req, res) => {
  try {
    const topUsers = await User.aggregate([
      {
        $addFields: {
            totalPoints: {
                $sum: [
                    "$profile.pointsSport",
                    "$profile.pointsSocial",
                    "$profile.pointsCulture",
                    "$profile.pointsGrowth",
                    "$profile.pointsCooking"
                ]
            }
        }
    },
      {
        $sort: { totalPoints: -1 },
      },
      {
        $limit: 10,
      },
    ]);
    return res.status(200).json(topUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTopUsersFriends = async (req, res) => {
  const userId = req.params.userId;
  try {

    const user = await User.findById(userId).populate('profile.following');
    console.log(user)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const friendIds = user.profile.following.map(friend => friend._id);

    const topFriends = await User.aggregate([
      { $match: { _id: { $in: friendIds } } },
      {
        $addFields: {
            totalPoints: {
                $sum: [
                    "$profile.pointsSport",
                    "$profile.pointsSocial",
                    "$profile.pointsCulture",
                    "$profile.pointsGrowth",
                    "$profile.pointsCooking"
                ]
            }
        }
    },
      { $sort: { totalPoints: -1 } },
      { $limit: 10 } 
  ]);
  return res.status(200).json(topFriends);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  deleteUserById,
  updateUserById,
  getUserById,
  getAllUsers,
  addUser,
  getFollowingOfUser,
  getFollowersOfUser,
  getFollowingOfUser,
  followUser,
  unfollowUser,
  updateUserByIdImage,
  getUserByUid,
  getNotFollowingUsers,
  getTopUsers,
  getTopUsersFriends
};
