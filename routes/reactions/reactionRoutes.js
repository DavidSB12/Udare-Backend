const express = require('express');
const multer = require("multer")
const router = express.Router();
const {getAllReactions, getReactionById, addReaction, updateReaction, uploadImage, getReactionsByPostId, addReactionWithoutImage} = require("../../controllers/reaction-controller.js")

//store the images in memory
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.get("/", getAllReactions);
router.get("/:id", getReactionById);
router.post("/add",upload.fields([{name:'image', maxCount: 1}, {name:'reaction', maxCount: 1}]),addReaction);
router.put("/:id", updateReaction);
router.post("/:id/upload", uploadImage);
router.get("/post/:id", getReactionsByPostId);
router.post("/addWithoutImage", addReactionWithoutImage);

module.exports = router;