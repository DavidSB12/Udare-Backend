const Reaction = require("../model/Reaction");


const getAllReactions = async (req, res) => {
    let reactions;
    console.log("getAllReactions");
    try {
        reactions = await Reaction.find();
        // console.log(reactions);
        return res.status(200).json(reactions);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
}

const getReactionById = async (req, res) => {
    const reactionId = req.params.id;
    try {
      const reaction = await Reaction.findById(reactionId);
      if (!reaction) {
        return res.status(404).json({ message: 'Reaction not found.' });
      }
      res.status(200).json(reaction);
    } 
    catch (error) {
      console.error('Error getting reaction by ID:', error);
      res.status(500).json({ error: 'Error retrieving reaction by ID.' });
    }
}

const addReaction = async (req,res) => {
    const reaction = JSON.parse(req.body.reaction)
    const {userId, postId, type, emoji} = reaction;    
    try {
        let newReaction = new Reaction({
          userId,
          postId,
          type,
          emoji
        });
        await newReaction.save();
        res.status(201).json(newReaction);
      } 
      catch (error) {
        console.error('Error adding a new reaction:', error);
        res.status(500).json({ error: 'Error adding a new reaction' });
      }
}

const updateReaction = async (req, res) => {
    const reactionId = req.params.id;
    const updatedReactionData = req.body;    
    try {
      const updatedReaction = await Reaction.findByIdAndUpdate(reactionId, updatedReactionData);
      if (!updatedReaction) {
        return res.status(404).json({ message: 'Reaction not found.' });
      }
      res.status(200).json(updatedReaction);
    } 
    catch (error) {
      console.error('Error updating reaction:', error);
      res.status(500).json({ error: 'Error updating reaction.' });
    }
}

const deleteReaction = async (req, res) => {
    const reactionId = req.params.id;
    try {
      const deletedReaction = await Reaction.findByIdAndDelete(reactionId);
      if (!deletedReaction) {
        return res.status(404).json({ message: 'Reaction not found.' });
      }
      res.status(200).json(deletedReaction);
    } 
    catch (error) {
      console.error('Error deleting reaction:', error);
      res.status(500).json({ error: 'Error deleting reaction.' });
    }
}

const getReactionsByPostId = async (req, res) => {
    const postId = req.params.id;
    try {
        const reactions = await Reaction.find({ postId: postId });
        if (!reactions) {
            return res.status(404).json({ message: 'Reactions not found.' });
        }
        res.status(200).json(reactions);
    }
    catch (error) {
        console.error('Error getting reactions by post ID:', error);
        res.status(500).json({ error: 'Error retrieving reactions by post ID.' });
    }
}

module.exports = {
    getAllReactions,
    getReactionById,
    addReaction,
    updateReaction,
    deleteReaction,
    getReactionsByPostId
}
