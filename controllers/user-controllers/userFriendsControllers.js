const User = require("../../model/User.js");
const userRepository = require("../../repositories/user-repository.js");

const getFollowingOfUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const friends = await userRepository.getFollowingOfUser(userId);
    res.status(200).json(friends);
  } catch (error) {
    console.error("Error retrieving following of user:", error);
    res.status(500).json({ error: "Error retrieving friends of user." });
  }
};

const getFollowersOfUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const friends = await userRepository.getFollowersOfUser(userId);
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
    const user = await userRepository.getUserById(userId);
    const userToFollow = await userRepository.getUserById(userToFollowId);
    console.log("Follow------");
    console.log(user)
    console.log(userToFollow)

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

    await userRepository.updateUserById(userId, user);
    await userRepository.updateUserById(userToFollowId, userToFollow);

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
    const user = await userRepository.getUserById(userId);
    const userToUnfollow = await userRepository.getUserById(userToUnfollowId);

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

    await userRepository.updateUserById(userId, user);
    await userRepository.updateUserById(userToUnfollowId, userToUnfollow);

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
    const friends = await userRepository.getFollowingOfUser(userId);

    // Obtener todos los usuarios
    const allUsers = await userRepository.getAllUsers();

    // Obtener los IDs de los usuarios seguidos
    const followingIds = friends.map((followedUser) =>
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

const getTopUsersFriends = async (req, res) => {
  const userId = req.params.userId;
  try {
    const topFriends = await userRepository.getTopUserFriends(userId);
    return res.status(200).json(topFriends);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getFollowingOfUser,
  getFollowersOfUser,
  followUser,
  unfollowUser,
  getNotFollowingUsers,
  getTopUsersFriends,
};
