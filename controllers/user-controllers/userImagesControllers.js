const ImageUploadServiceFactory = require('./../../services/imageUploadServiceFactory.js');
const uploadImageService = ImageUploadServiceFactory.createUploadService('AWS');

const userRepository = require("../../repositories/user-repository.js");


const updateUserByIdImage = async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = JSON.parse(req.body.user);

  if (req.files) {
    const url = await uploadImageService(req.files.image[0]);
    updatedUserData.profile.profilePic = url;
  }

  try {
    const updatedUser = await userRepository.updateUserById(userId, updatedUserData)
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user by ID:", error);
    res.status(500).json({ error: "Error updating user by ID." });
  }
};

module.exports = {
  updateUserByIdImage
};
