const upload = require('../../services/ImageUpload.js');
const express = require('express');
const router = express.Router();
const singleUpload = upload.single('image');
const User = require('../../model/User.js');


module.exports = router;

 