const  Challenge  = require('../model/Challenge');
const { ObjectId } = require('mongodb');


const getDailyChallenges = async (req, res) => {     
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
      res.status(200).json(randomChallenges);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
}

const getChallengesByCategory = async (req, res) => {
    const category = req.params.category;
    let challenges;
    try {
        challenges = await Challenge.find({category: category});
        return res.status(200).json(challenges);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
}


const getChallengeById = async (req, res) => {
    const challengeId = req.params.id;
    try {
      const challenge = await Challenge.findById(challengeId);
      if (!challenge) {
        return res.status(404).json({ message: 'Challenge not found.' });
      }
      res.status(200).json(challenge);
    } 
    catch (error) {
      console.error('Error getting challenge by ID:', error);
      res.status(500).json({ error: 'Error retrieving challenge by ID.' });
    }
}

const updatedChallengeById = async (req, res) => {
    const challengeID = req.params.id;
    const updatedChallengeData = req.body;
  
    try {
      const updatedChallenge = await Challenge.findByIdAndUpdate(challengeID, updatedChallengeData, { new: true });
      if (!updatedChallenge) {
        return res.status(404).json({ message: 'Challenge not found.' });
      }
      res.status(200).json(updatedChallenge);
    } 
    catch (error) {
      console.error('Error updating challenge by ID:', error);
      res.status(500).json({ error: 'Error updating challenge by ID.' });
    }
}


const deleteChallengeById = async (req, res) => {
    const challengeId = req.params.id;
  
    try {
      const deletedChallenge = await Challenge.findByIdAndRemove(challengeId);
  
      if (!deletedChallenge) {
        return res.status(404).json({ message: 'Challenge not found.' });
      }
      res.status(200).json({ message: 'Challenge deleted successfully.' });
    } 
    catch (error) {
      console.error('Error deleting challenge by ID:', error);
      res.status(500).json({ error: 'Error deleting challenge by ID.' });
    }
}


const addChallenge = async (req, res) => {
    const { title, description, category } = req.body;
    try {
        const newChallenge = new Challenge({
        title,
        description,
        category,
        });
        await newChallenge.save();
        res.status(201).json(newChallenge);
    } 
    catch (error) {
        console.error('Error adding a new challenge:', error);
        res.status(500).json({ error: 'Error adding a new challenge' });
    }
}

const getAllChallenges = async (req, res) => {  
    let challenges;
    try {
        challenges = await Challenge.find();
        return res.status(200).json(challenges);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
}



module.exports = {
    getDailyChallenges,
    getChallengesByCategory,
    getChallengeById,
    updatedChallengeById,
    deleteChallengeById,
    addChallenge,
    getAllChallenges
};