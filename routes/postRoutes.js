const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addComment,
} = require("../controllers/post-controllers/postCommentControllers");
const {
  addPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} = require("../controllers/post-controllers/postCrudControllers");
const {
  getFirstPosts,
  getFriendsPosts,
} = require("../controllers/post-controllers/postFeedControllers");

//store the images in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//POST FEED ROUTES
router.get("/getFirst", getFirstPosts);
router.get("/getFriendsPosts/:userId", getFriendsPosts);

//POST CRUD ROUTES
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "post", maxCount: 1 },
  ]),
  addPost
);

//POST COMMENTS ROUTES
router.post("/:id/addComment", addComment);



module.exports = router;
