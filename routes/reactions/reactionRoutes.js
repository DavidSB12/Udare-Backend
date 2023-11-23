const express = require('express');
const router = express.Router();
const {getAllReactions, getReactionById, addReaction, updateReaction, uploadImage, getReactionsByPostId, addReactionWithoutImage} = require("../../controllers/reaction-controller.js")
const ImageUpload = require('../../services/ImageUpload');


router.get("/", getAllReactions);
router.get("/:id", getReactionById);
router.post("/add",ImageUpload.fields([{name:'image', maxCount: 1}, {name:'reaction', maxCount: 1}]),addReaction);
router.put("/:id", updateReaction);
router.post("/:id/upload", uploadImage);
router.get("/post/:id", getReactionsByPostId);
router.post("/addWithoutImage", addReactionWithoutImage);
// router.delete("/:id", deleteReactionById

module.exports = router;