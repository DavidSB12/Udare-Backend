const express = require('express');
const router = express.Router();
const {getAllReactions, getReactionById, addReaction, updateReaction} = require("../../controllers/reaction-controller.js")

router.get("/", getAllReactions);
router.get("/:id", getReactionById);
router.post("/add", addReaction);
router.put("/:id", updateReaction);
// router.delete("/:id", deleteReactionById

module.exports = router;