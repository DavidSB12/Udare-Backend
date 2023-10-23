const express = require('express');
const router = express.Router();
const {getAllUsers, getUserById, updateUserById, deleteUserById, addUser, uploadImage} = require("../../controllers/user-controller.js")


router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/add", addUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
router.post("/:id/upload", uploadImage);



module.exports = router;