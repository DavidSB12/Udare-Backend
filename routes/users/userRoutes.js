const express = require('express');
const multer = require("multer")
const router = express.Router();
const {getAllUsers, getUserById, updateUserById, deleteUserById, getUserByUid, addUser, getFollowingOfUser,getFollowersOfUser, followUser, unfollowUser, updateUserByIdImage, getNotFollowingUsers, getTopUsers, getTopUsersFriends, updateUserByIdImageNew} = require("../../controllers/user-controller.js")
const ImageUpload = require('../../services/ImageUpload');

//store the images in memory
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.get("/", getAllUsers);
router.get("/getTopUsers", getTopUsers);
router.get("/getTopUsersFriends/:userId", getTopUsersFriends);
router.get("/:id", getUserById);
router.post("/add", addUser);
router.put("/:id", updateUserById);
router.put("/updateImageOld/:id",ImageUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'user', maxCount: 1 }]) ,updateUserByIdImage);
router.put("/updateImage/:id",upload.fields([{ name: 'image', maxCount: 1 }, { name: 'user', maxCount: 1 }]) ,updateUserByIdImageNew);
router.delete("/:id", deleteUserById);
router.get("/:id/getFollowingOfUser", getFollowingOfUser)
router.get("/:id/getFollowersOfUser", getFollowersOfUser)
router.post("/:id/followUser", followUser); 
router.post("/:id/unfollowUser", unfollowUser);
router.get("/getUserByUid/:uid", getUserByUid);
router.get("/:id/getNotFollowingUsers", getNotFollowingUsers);


module.exports = router;