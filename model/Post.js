const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true, 'ID is required.']
    },
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
    imageID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);