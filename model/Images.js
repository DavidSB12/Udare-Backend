const mongoose = require('mongoose');

const imageSchema = new moongose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image"
    },
    image: {
        type: String,
        required: [true, 'Image is required.'],
        trim: true,
        lowercase: true
    },
    challengeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge"
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Image = mongoose.model('Image', imageSchema);