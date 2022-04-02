const express = require("express");
const articleController = require("../controller/article.js"); //belom ada wkwkwk
const { protect } = require("../middleware/authentication");
const upload = require("../middleware/uploadFile");
const midware = require("../middleware/midware")

const route = express.Router();

route
    .get("/", articleController.getArticles)
    .get("/:category", articleController.getArticlesByCat)
    .get("/detail/:id", articleController.getArticlesByID)
    .put("/detail/:id", articleController.updateStatus)
    .put("/like/:id", articleController.likeArticle)
    .put("/dislike/:id", articleController.dislikeArticle)
    .put("/:id", upload.single("pic"), articleController.updateArticle)
    .post("/", upload.single("pic"), midware.midArticle, articleController.postArticle)

module.exports = route;
