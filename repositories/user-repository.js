const User = require("../model/User");
const Post = require("../model/Post");

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw new Error("Error retrieving users: " + err.message);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    throw new Error("Error retrieving user by ID: " + err.message);
  }
};

const getUserByUid = async (userUid) => {
  try {
    const user = await User.findOne({ uid: userUid });
    return user;
  } catch (err) {
    throw new Error("Error retrieving user by UID: " + err.message);
  }
};

const addUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (err) {
    throw new Error("Error adding new user: " + err.message);
  }
};

const updateUserById = async (userId, updatedUserData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });
    return updatedUser;
  } catch (err) {
    throw new Error("Error updating user by ID: " + err.message);
  }
};

const deleteUserById = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndRemove(userId);
    return deletedUser;
  } catch (err) {
    throw new Error("Error deleting user by ID: " + err.message);
  }
};

const getTopUsers = async () => {
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
              "$profile.pointsCooking",
            ],
          },
        },
      },
      {
        $sort: { totalPoints: -1 },
      },
      {
        $limit: 10,
      },
    ]);
    return topUsers;
  } catch (err) {
    throw new Error("Error retrieving top users");
  }
};

const getTopUserFriends = async (userId) => {
  const user = await User.findById(userId).populate("profile.following");

  if (!user) {
    throw new Error("User not found");
  }

  const friendIds = user.profile.following.map((friend) => friend._id);

  try {
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
              "$profile.pointsCooking",
            ],
          },
        },
      },
      { $sort: { totalPoints: -1 } },
      { $limit: 10 },
    ]);
    return topFriends;
  } catch (err) {
    throw new Error("Error retrieving top users");
  }
};

const getFollowingOfUser = async (userId) => {
  try {
    const user = await User.findById(userId).populate(
      "profile.following",
      null,
      "User"
    );
    if (!user) throw new Error("User not found");
    console.log("user:" + user);
    const friends = user.profile.following;
    return friends;
  } catch (error) {
    console.error("Error retrieving following of user:", error);
    throw new Error("Error retrieving friends of user.");
  }
};

const getFollowersOfUser = async (userId) => {
  try {
    const user = await User.findById(userId).populate(
      "profile.followers",
      null,
      "User"
    );
    if (!user) throw new Error("User not found");
    const friends = user.profile.followers;
    return friends;
  } catch (error) {
    console.error("Error retrieving followers of user:", error);
    throw new Error("Error retrieving friends of user.");
  }
};

const updateDailyChallenge = async () => {
  try {
    await User.updateMany({}, { dailyChallengeCompleted: false });
  } catch (err) {
    throw new Error(
      "Error changing the dailyChallengeCompleted atribute of all users: " +
        err.message
    );
  }
};

const getLastDayPostsOfUser = async (user) => {
  try {
    const posts = await Post.find({ userID: user._id, date: { $gte: yesterday } });

  } catch (err) {
    throw new Error(
      "Error changing the dailyChallengeCompleted atribute of all users: " +
        err.message
    );
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUserById,
  getUserByUid,
  getTopUsers,
  getFollowersOfUser,
  getFollowingOfUser,
  getTopUserFriends,
  updateDailyChallenge,
  getLastDayPostsOfUser
};
