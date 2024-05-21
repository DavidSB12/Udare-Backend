const express = require("express");
const router = express.Router();
const {
  getChallengeById,
  updatedChallengeById,
  deleteChallengeById,
  addChallenge,
  getAllChallenges,
} = require("../controllers/challenge-controllers/challengeCrudControllers");

const {
  getChallengesByCategory,
  getDailyChallenges,
} = require("../controllers/challenge-controllers/challengeQueriesControllers");

//CHALLENGES QUERIES ROUTES
router.get("/dailyChallenges", getDailyChallenges);
router.get("/category/:category", getChallengesByCategory);

//CHALLENGES CRUD ROUTES
router.get("/", getAllChallenges);
router.get("/:id", getChallengeById);
router.put("/:id", updatedChallengeById);
router.delete("/:id", deleteChallengeById);
router.post("/add", addChallenge);




module.exports = router;
