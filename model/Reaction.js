const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    postId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    imageURL: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    });

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;