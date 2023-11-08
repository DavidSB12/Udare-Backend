const express = require('express');
const router = express.Router();
const {getAllUsers, getUserById, updateUserById, deleteUserById, addUser, getFollowingOfUser,getFollowersOfUser, followUser, unfollowUser} = require("../../controllers/user-controller.js")


router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/add", addUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
router.get("/:id/getFollowingOfUser", getFollowingOfUser)
router.get("/:id/getFollowersOfUser", getFollowersOfUser)
router.post("/:id/followUser", followUser); 
router.post("/:id/unfollowUser", unfollowUser);


module.exports = router;