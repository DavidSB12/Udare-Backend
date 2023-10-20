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
            default: 'Unspecified' 
        },
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
    }
         
    
});


const User = mongoose.model('User', userSchema);

module.exports = User; 
