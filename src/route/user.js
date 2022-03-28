const express = require("express");
const userController = require("../controller/user"); //belom ada wkwkwk
const { protect } = require("../middleware/authentication");
const upload = require("../middleware/uploadFile");
const midware = require("../middleware/midware")

const route = express.Router();

route
    .post("/login", midware.midUser2, userController.loginUser)
    .post("/register", midware.midUser, userController.registerUser)
    .put("/:id", midware.midProfile, userController.updateUser)
    .put("/author/:id", userController.updateRole)
    .put("/profile-picture/:id", upload.single("profile_picture"), userController.updatePPUser) // del redis redisMidware.delProfileRedis
    .get("/:id", userController.getUserByID) // ganti endpoint because meresahkan warga, get user by id kgk jalan
    .get("/user/profile", protect, userController.getProfile) // profile redis redisMidware.hitCacheProfile
    
module.exports = route;
