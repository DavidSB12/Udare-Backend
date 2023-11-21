const User = require("../model/User.js");
const { ObjectId } = require('mongodb');
const ImageUpload = require('../services/ImageUpload.js');
const singleUpload = ImageUpload.single("image");


const getAllUsers = async (req, res) => {
    let users;
    console.log("getAllUsers");
    try {
        users = await User.find();
        // console.log(users);
        return res.status(200).json(users);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
}


const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json(user);
    } 
    catch (error) {
      console.error('Error getting user by ID:', error);
      res.status(500).json({ error: 'Error retrieving user by ID.' });
    }
}


const addUser = async (req,res) => {
  // Log de req.body
  console.log(req.body);
    const {username, password, email, profile, uid} = req.body;    

    try {
        const newUser = new User({
          username,
          password,
          uid,
          email,
          profile
        });
        await newUser.save();
        res.status(201).json(newUser);
      } 
      catch (error) {
        console.error('Error adding a new user:', error);
        res.status(500).json({ error: 'Error adding a new user' });
      }
}

const updateUserByIdImage = async (req,res) => {
  const userId = req.params.id;
  const updatedUserData = JSON.parse(req.body.user)
  //const updatedUser = req.body;
  const image = req.files.image[0].location;
  console.log(req.files);
  updatedUserData.profile.profilePic = image;
  
  
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(updatedUser);
  } 
  catch (error) {
    console.error('Error updating user by ID:', error);
    res.status(500).json({ error: 'Error updating user by ID.' });
  }
}



const updateUserById = async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json(updatedUser);
    } 
    catch (error) {
      console.error('Error updating user by ID:', error);
      res.status(500).json({ error: 'Error updating user by ID.' });
    }
}

const deleteUserById = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const deletedUser = await User.findByIdAndRemove(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json({ message: 'User deleted successfully.' });
    } 
    catch (error) {
      console.error('Error deleting user by ID:', error);
      res.status(500).json({ error: 'Error deleting user by ID.' });
    }
}

const deleteAllUsers = async (req, res) => {
    try {
      await User.deleteMany({}); 
      res.status(200).json({ message: 'All users deleted successfully.' });
    } 
    catch (error) {
      console.error('Error deleting all users:', error);
      res.status(500).json({ error: 'Error deleting all users.' });
    }
}

const getFollowingOfUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate('profile.following', null, 'User');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const friends = user.profile.following;
    res.status(200).json(friends);
  } catch (error) {
    console.error('Error retrieving following of user:', error);
    res.status(500).json({ error: 'Error retrieving friends of user.' });
  }
}

const getFollowersOfUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).populate('profile.followers', null, 'User');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const friends = user.profile.followers;
    res.status(200).json(friends);
  } catch (error) {
    console.error('Error retrieving followers of user:', error);
    res.status(500).json({ error: 'Error retrieving friends of user.' });
  }
}



const followUser = async (req, res) => {
  const userId = req.params.id;
  const userToFollowId = req.body._id;

  try {
    const user = await User.findById(userId);
    const userToFollow = await User.findById(userToFollowId);


    if (!user || !userToFollowId) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.profile.following.includes(userToFollowId)) {
      return res.status(400).json({ message: 'You are already following this user.' });
    }

    user.profile.following.push(userToFollowId);
    userToFollow.profile.followers.push(userId);

    await user.save();
    await userToFollow.save();

    res.status(200).json({ message: 'User followed successfully.' });
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ error: 'Error following user.' });
  }
};

const unfollowUser = async (req, res) => {
  const userId = req.params.id;
  const userToUnfollowId = req.body._id;

  try {
    const user = await User.findById(userId);
    const userToUnfollow = await User.findById(userToUnfollowId);

    if (!user || !userToUnfollow) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (!user.profile.following.includes(userToUnfollowId)) {
      return res.status(400).json({ message: 'You are not following this user.' });
    }

    user.profile.following.pull(userToUnfollowId);
    userToUnfollow.profile.followers.pull(userId);

    await user.save();
    await userToUnfollow.save();

    res.status(200).json({ message: 'User unfollowed successfully.' });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).json({ error: 'Error unfollowing user.' });
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
    updateUserByIdImage
}