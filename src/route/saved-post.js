const express = require("express");
const savedController = require("../controller/saved.js"); //belom ada wkwkwk
const { protect } = require("../middleware/authentication");
const upload = require("../middleware/uploadFile");

const route = express.Router();

route
    .post("/", savedController.postSaved)
    .get("/", savedController.getSavedPosts)
    .get("/:user_id", savedController.getSavedPostsByUserID)
    .delete("/:user_id/:id", savedController.deleteSaved)

module.exports = route;
