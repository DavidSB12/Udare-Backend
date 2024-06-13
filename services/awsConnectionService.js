const dotenv = require("dotenv").config();
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const sharp = require("sharp");

const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_BUCKET_NAME = process.env.S3_BUCKET_NEW;
const AWS_PUBLIC_REGION = process.env.AWS_BUCKET_REGION_NEW;

const randomImageName = (bytes = 32) =>   crypto.randomBytes(bytes).toString("hex");


const client = new S3Client({
  credentials: {
    secretAccessKey: AWS_SECRET_KEY,
    accessKeyId: AWS_PUBLIC_KEY,
  },
  region: AWS_PUBLIC_REGION,
});

async function uploadImageService(imageToUpload) {
  const uniqueKey = randomImageName();

  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: uniqueKey,
    Body: imageToUpload.buffer,
    ContentType: imageToUpload.mimetype,
  };
  const command = new PutObjectCommand(uploadParams);

  await client.send(command);

  const imageUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_PUBLIC_REGION}.amazonaws.com/${uniqueKey}`;

  return imageUrl;
}

module.exports = {
  uploadImageService,
};
