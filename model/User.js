const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
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
    profile : {
        name : String,
        bio : String,
        profilePic : String,
        followers : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }],
        following : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }],
    },
});

const User = mongoose.model('User', userSchema);
