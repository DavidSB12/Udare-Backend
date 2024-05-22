const Challenge = require("../model/Challenge");

const getAllChallenges = async () => {
  try {
    const challenges = await Challenge.find();
    return challenges;
  } catch (err) {
    throw new Error("Error retrieving challenges: " + err.message);
  }
};

const getChallengeById = async (challengeId) => {
  try {
    const challenge = await Challenge.findById(challengeId);
    return challenge;
  } catch (err) {
    throw new Error("Error retrieving challenge by ID: " + err.message);
  }
};

const addChallenge = async (challengeData) => {
  try {
    const newChallenge = new Challenge(challengeData);
    await newChallenge.save();
    return newChallenge;
  } catch (err) {
    throw new Error("Error adding new challenge: " + err.message);
  }
};

const updateChallengeById = async (challengeId, updatedChallengeData) => {
  try {
    const updatedChallenge = await Challenge.findByIdAndUpdate(challengeId, updatedChallengeData, {
      new: true,
    });
    return updatedChallenge;
  } catch (err) {
    throw new Error("Error updating challenge by ID: " + err.message);
  }
};

const deleteChallengeById = async (challengeId) => {
  try {
    const deletedChallenge = await Challenge.findByIdAndRemove(challengeId);
    return deletedChallenge;
  } catch (err) {
    throw new Error("Error deleting challenge by ID: " + err.message);
  }
};

const getDailyChallenges = async () => {     
    let randomChallenges; 
    const categories = ["deportes", "cultura", "cocina", "social", "crecimientopersonal"]
  
    try {
        randomChallenges = await Promise.all(
        categories.map(async (category) => {
            const challenge = await Challenge.aggregate([
                { $match: { category: category } },
                { $sample: { size: 1 } }
            ]);
            return challenge[0];
        })
      );    
      return randomChallenges;
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
}

const getChallengesByCategory = async (category) => {
    let challenges;
    try {
        challenges = await Challenge.find({category: category});
        return challenges;
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllChallenges,
    deleteChallengeById,
    getChallengeById,
    updateChallengeById,
    addChallenge,
    getDailyChallenges,
    getChallengesByCategory
};
