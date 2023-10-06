const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge"
    },
    title: {
        type: String,
        required: [true, 'Title is required.'],
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        trim: true,
        lowercase: true
    },
    category: {
        type: String,
        required: [true, 'Category is required.'],
        trim: true,
        lowercase: true
    },
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;