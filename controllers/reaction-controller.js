const Reaction = require("../model/Reaction");
const ImageUpload = require('../services/ImageUpload.js');
const singleUpload = ImageUpload.single("image");
const Post = require('../model/Post.js');


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
    console.log("add image");
    const reaction = JSON.parse(req.body.reaction)
    // console.log(reaction);
    const {userId, postId} = reaction;
    const imageURL = req.files.image[0].location;
    // console.log(imageURL);

    let newId;


    try {
        let newReaction = new Reaction({
          userId,
          postId,
          imageURL
        });
        await newReaction.save();
        newId = newReaction._id;
        res.status(201).json(newReaction);
      }
      catch (error) {
        console.error('Error adding a new reaction:', error);
        res.status(500).json({ error: 'Error adding a new reaction' });
      }

      // Update post reactions
      try {
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ message: 'Post not found.' });
        }
        post.reactions.push(newId);
        await post.save();
      }
      catch (error) {
        console.error('Error updating post reactions:', error);
        res.status(500).json({ error: 'Error updating post reactions.' });
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
    
    // Get the post by ID 
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
      }
      // Get the reactions by post ID
      const reactions = await Reaction.find({postId: postId});
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


const uploadImage = async (req, res) => {
  const uid = req.params.id;
  console.log("uploadImage");
  singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
    }

    let update = {"image": req.file.location};

    Reaction.findByIdAndUpdate(uid, update, {new: true})
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({error: err.message});
      });
  });
}

const addReactionWithoutImage = async (req,res) => {
  console.log("a");
  // console.log(req.body);
  const {userId, postId} = req.body;
  let newId;

  try {
      let newReaction = new Reaction({
        userId,
        postId
      });
      await newReaction.save();
      newId = newReaction._id;
      res.status(201).json(newReaction);
    }
    catch (error) {
      console.error('Error adding a new reaction:', error);
      res.status(500).json({ error: 'Error adding a new reaction' });
    }

    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
      }
      post.reactions.push(newId);
      await post.save();
    }
    catch (error) {
      console.error('Error updating post reactions:', error);
      res.status(500).json({ error: 'Error updating post reactions.' });
    }
}



module.exports = {
    getAllReactions,
    getReactionById,
    addReaction,
    updateReaction,
    deleteReaction,
    getReactionsByPostId,
    uploadImage,
    addReactionWithoutImage
}
