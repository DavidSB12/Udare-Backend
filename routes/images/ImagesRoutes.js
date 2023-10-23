const upload = require('../../services/ImageUpload.js');
const express = require('express');
const router = express.Router();
const singleUpload = upload.single('image');
const User = require('../../model/User.js');

router.post('/:id/image-upload', function(req, res) {
    const uid = req.params.id;

    singleUpload(req, res, function(err) {
        if(err){
            return res.json({
                success : false,
                errors : {
                    title : 'Image Upload Error',
                    detail : err.message,
                    error : err
                },
            });
        } 

        let update = { image: req.file.location };

        User.findByIdAndUpdate(uid, update, {new: true})
        .then(user => {
            res.status(200).json({
                success : true,
                user : user
            });
        })
        .catch(err => {
            res.status(400).json({
                success : false,
                errors : {
                    title : 'Image Upload Error',
                    detail : err.message,
                    error : err
                },
            });
        });
    });
});

module.exports = router;

