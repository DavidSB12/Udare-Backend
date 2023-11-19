const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },

    type: {
        type: String,
        enum: ['like', 'dislike', 'love', 'haha', 'wow', 'sad', 'angry'],
        required: true,
    },
    emoji: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    });

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;