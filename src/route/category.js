const express = require("express");
const catController = require("../controller/category.js"); //belom ada wkwkwk
const upload = require("../middleware/uploadFile");

const route = express.Router();

route
    .get("/", catController.getCats)

module.exports = route;
