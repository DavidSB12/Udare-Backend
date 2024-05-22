const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        trim: true,
        minlength: 6
    },
    uid: {
        type: String,
        required: [true, 'UID is required.'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        trim: true,
        lowercase: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    dailyChallengeCompleted: {
        type: Boolean,
        default: false
    },
    profile: {
        name: {
            type: String,
            default: 'Unspecified' 
        },
        bio: {
            type: String,
            default: 'Unspecified' 
        },
        profilePic: {
            type: String,
            default: 'https://udarebucket.s3.eu-north-1.amazonaws.com/profile-picture-default.png' 
        },
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        pointsSport: {
            type: Number,
            default: 0,
        },
        pointsSocial: {
            type: Number,
            default: 0,
        },
        pointsCulture: {
            type: Number,
            default: 0,
        },
        pointsGrowth: {
            type: Number,
            default: 0
        },
        pointsCooking: {
            type: Number,
            default: 0
        },
        currentStreak: {
            type: Number,
            deafult: 0
        }
    }
         
});


const User = mongoose.model('User', userSchema);

module.exports = User; 
