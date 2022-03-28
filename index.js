require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const helper = require("./src/helper/common")
const userRoute = require("./src/route/user")
const articleRoute = require("./src/route/article")
const savedRoute = require("./src/route/saved-post")
const commentRoute = require("./src/route/comment")
const catRoute = require("./src/route/category")
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
  });
  
app.use(cors());
// middlewear to access json data
app.use(express.json());

// memermudah debugging
app.use(morgan("dev"));

app.use("/users", userRoute);
app.use("/articles", articleRoute);
app.use("/saved-post", savedRoute);
app.use("/comment", commentRoute);
app.use("/category", catRoute);

//[!!!!!!] TARO PALING BAWAH
// handle link to profile_picture
// kalo ga pake ginian nanti link profile_picture will be redirected to handleNotFound
app.use("/file", express.static("./uploads"));

// handle typo in writing path
app.use(helper.handleNotFound);

// handle error

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: message
  });
});
