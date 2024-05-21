const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  addUser,
  deleteUserById,
  getAllUsers,
  getTopUsers,
  getUserById,
  getUserByUid,
  updateUserById,
} = require("../controllers/user-controllers/userCrudControllers.js");

const {
  followUser,
  unfollowUser,
  getFollowersOfUser,
  getFollowingOfUser,
  getNotFollowingUsers,
  getTopUsersFriends,
} = require("../controllers/user-controllers/userFriendsControllers.js");

const {
  updateUserByIdImage,
} = require("../controllers/user-controllers/userImagesControllers.js");

//middleware to store the images in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//CRUD ROUTES
router.get("/", getAllUsers);
router.get("/getUserByUid/:uid", getUserByUid);
router.get("/getTopUsers", getTopUsers);
router.get("/:id", getUserById);
router.post("/add", addUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

//FRIEND ROUTES
router.get("/getTopUsersFriends/:userId", getTopUsersFriends);
router.get("/:id/getNotFollowingUsers", getNotFollowingUsers);
router.get("/:id/getFollowingOfUser", getFollowingOfUser);
router.get("/:id/getFollowersOfUser", getFollowersOfUser);
router.post("/:id/followUser", followUser);
router.post("/:id/unfollowUser", unfollowUser);


//IMAGES ROUTES
router.put(
  "/updateImage/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "user", maxCount: 1 },
  ]),
  updateUserByIdImage
);

module.exports = router;
