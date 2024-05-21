const  Challenge  = require('../../model/Challenge');

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

module.exports = {
    getDailyChallenges,
    getChallengesByCategory,
};