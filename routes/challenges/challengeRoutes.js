const express = require('express');
const router = express.Router();
const  Challenge  = require('../../model/Challenge.js');


// get all challenges
router.get('/', async (req, res) => {
    let challenges;
    try {
        challenges = await Challenge.find();
        return res.status(200).json(challenges);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// get a challenge by id
router.get('/:id', async (req, res) => {
    const clallengeId = req.params.id;
    try {
      const challenge = await Challenge.findById(clallengeId);
      if (!challenge) {
        return res.status(404).json({ message: 'Challenge not found.' });
      }
      res.status(200).json(challenge);
    } 
    catch (error) {
      console.error('Error getting challenge by ID:', error);
      res.status(500).json({ error: 'Error retrieving challenge by ID.' });
    }
});

// create a challenge
router.post('/add', async (req, res) => {
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
})

// update a challenge by id
router.put('/:id', async (req, res) => {
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
});

// delete a challenge by id
router.delete('/:id', async (req, res) => {
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
});


module.exports = router;