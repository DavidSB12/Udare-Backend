const express = require('express');
const router = express.Router();
const  Challenge  = require('../../model/Challenge.js');


// get all challenges
router.get('/', (req, res) => {
   try {
    const challenges = Challenge.find();
    res.json(challenges);
    } catch (err) {
        res.status(500).json({ message: err.message });
   }
});

// get a challenge by id
router.get('/:id', (req, res) => {
    Challenge.findById(req.params.id)
        .then(challenge => res.json(challenge))
        .catch(err => res.status(400).json('Error: ' + err));
});

// create a challenge
router.post('/add', (req, res) => {
    const newChallenge = new Challenge({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
    });

    newChallenge.save()
        .then(() => res.json('Challenge added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
);

// update a challenge
router.post('/update/:id', (req, res) => {
    Challenge.findById(req.params.id)
        .then(challenge => {
            challenge.title = req.body.title;
            challenge.description = req.body.description;
            challenge.category = req.body.category;

            challenge.save()
                .then(() => res.json('Challenge updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error ' + err));
});

// delete a challenge
router.delete('/:id', (req, res) => {
    Challenge.findByIdAndDelete(req.params.id)
        .then(() => res.json('Challenge deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;