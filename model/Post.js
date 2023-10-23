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
        required: [true, 'Image is required.'],
        trim: true,
        lowercase: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;