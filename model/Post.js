const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    challengeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge"
    },
    caption: {
        type: String,
        required: [true, 'Caption is required.'],
        trim: true,
        lowercase: true
    },
    image: {
        type: String,
        default: "",
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: [{ 
        userID: String, 
        comment: String 
    }],
    reactions: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reaction"
    }],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;