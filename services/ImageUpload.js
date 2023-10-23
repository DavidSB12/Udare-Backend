const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config();
const { S3Client } = require('@aws-sdk/client-s3');

// // const s3 = new aws.S3();


// aws.config.update({
//     secretAccessKey: process.env.AWS_SECRET_KEY_ID,
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     region: 'eu-west-3'
//     });

let s3 = new S3Client({
    region: 'eu-west-3',
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_KEY_ID,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    }
};

const upload = multer({
    fileFilter,
    storage: multerS3({
        s3,
        bucket: 'testudare',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: 'TESTING_METADATA'});
        },
        // Make it JPEG and PNG only
        key: function (req, file, cb) {
            cb(null, Date.now().toString().concat(file.originalname));
        }
    })
});

module.exports = upload;