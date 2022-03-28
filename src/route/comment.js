const express = require("express");
const commentController = require("../controller/comment.js"); //belom ada wkwkwk
const { protect } = require("../middleware/authentication");
const upload = require("../middleware/uploadFile");

const route = express.Router();

route
    .post("/", commentController.postComment)
    .get("/:id", commentController.getCommentByArtID)

module.exports = route;
