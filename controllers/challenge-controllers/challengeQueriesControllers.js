const Challenge = require("../../model/Challenge");
const challengeRepository = require("./../../repositories/challenge-repository");

const getDailyChallenges = async (req, res) => {
  let randomChallenges;
  try {
    randomChallenges = await challengeRepository.getDailyChallenges();
    res.status(200).json(randomChallenges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getChallengesByCategory = async (req, res) => {
  const category = req.params.category;
  let challenges;
  try {
    challenges = await challengeRepository.getChallengesByCategory(category);
    return res.status(200).json(challenges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getDailyChallenges,
  getChallengesByCategory,
};
