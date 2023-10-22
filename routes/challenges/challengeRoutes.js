const express = require('express');
const router = express.Router();
const { getDailyChallenges, getChallengesByCategory, getChallengeById, updatedChallengeById, deleteChallengeById, addChallenge, getAllChallenges } = require('../../controllers/challenge-controller.js');


router.get('/dailyChallenges', getDailyChallenges);
router.get('/category/:category', getChallengesByCategory);
router.get('/:id', getChallengeById);
router.put('/:id', updatedChallengeById);
router.delete('/:id', deleteChallengeById);
router.post('/add', addChallenge)
router.get('/', getAllChallenges);

module.exports = router;