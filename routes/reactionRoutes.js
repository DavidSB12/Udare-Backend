const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
  getAllReactions,
  getReactionById,
  addReaction,
  updateReaction,
} = require("../controllers/reaction-controllers/reactionCrudControllers");
const {
  getReactionsByPostId,
} = require("../controllers/reaction-controllers/reactionsByPostControllers");

//store the images in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//REACTIONS BY POST ROUTES
router.get("/post/:id", getReactionsByPostId);

//REACTIONS CRUD ROUTES
router.get("/", getAllReactions);
router.get("/:id", getReactionById);
router.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "reaction", maxCount: 1 },
  ]),
  addReaction
);
router.put("/:id", updateReaction);



module.exports = router;
