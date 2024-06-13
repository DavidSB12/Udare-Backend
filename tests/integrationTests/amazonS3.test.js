const request = require("supertest");
//const { app, startServer } = require("../../index");
const ImageUploadServiceFactory = require("../../services/imageUploadServiceFactory");
const uploadImageService = ImageUploadServiceFactory.createUploadService("AWS");
const fs = require("fs");
const path = require('path');


describe("S3 Image Upload", () => {
  it("should upload an image to S3", async () => {
    const imagePath = path.join(__dirname, "imageTest.jpg");
    const buffer = fs.readFileSync(imagePath);

    const testImage = {
      buffer,
      mimetype: "image/jpeg",
    };

    const imageUrl = await uploadImageService(testImage);

    expect(imageUrl).not.toBeNull();

    const expectedUrlPattern = new RegExp(          
      `^https://${process.env.S3_BUCKET_NEW}.s3.${process.env.AWS_BUCKET_REGION_NEW}.amazonaws.com/`
    );
    expect(imageUrl).toMatch(expectedUrlPattern);
  });
});





