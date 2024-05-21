const userRepository = require("../../repositories/user-repository.js");
const User = require("../../model/User");


const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await userRepository.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving all users", error);
    res.status(500).json({ error: "Error retrieving all users" });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userRepository.getUserById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ error: "Error retrieving user by ID." });
  }
};

const getUserByUid = async (req, res) => {
  const userUid = req.params.uid;
  try {
    const user = await userRepository.getUserByUid(userUid);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user by UID:", error);
    res.status(500).json({ error: "Error retrieving user by UID." });
  }
};

const addUser = async (req, res) => {
  const { username, password, email, profile, uid } = req.body;
  try {
    const newUser = new User({
      username,
      password,
      uid,
      email,
      profile,
    });
    await userRepository.addUser(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error adding a new user:", error);
    res.status(500).json({ error: "Error adding a new user" });
  }
};

const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;
  try {
    const updatedUser = userRepository.updateUserById(userId, updatedUserData);
    if (!updatedUser)
      return res.status(404).json({ message: "User not found." });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user by ID:", error);
    res.status(500).json({ error: "Error updating user by ID." });
  }
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await userRepository.deleteUserById(userId);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found." });
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user by ID:", error);
    res.status(500).json({ error: "Error deleting user by ID." });
  }
};

const getTopUsers = async (req, res) => {
  try {
    const topUsers = await userRepository.getTopUsers();
    return res.status(200).json(topUsers);
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
  getUserByUid,
  getTopUsers,
};
