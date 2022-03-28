const jwt = require("jsonwebtoken");
require("dotenv").config();

const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  } else {
    const errorRes = new Error("token invalid!");
    errorRes.status = 403;
    next(errorRes);
  }
  try {
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    req.email = decoded.email;
    req.role = decoded.role;
    req.id = decoded.id;
    console.log("ini dia", req.id);
    next();
  } catch (err) {
    // console.log('error dari verify', err);
    if (err && err.name === "JsonWebTokenError") {
      const errorRes = new Error("needs valid token!");
      errorRes.status = 403;
      next(errorRes);
    } else if (err && err.name === "TokenExpiredError") {
      const errorRes = new Error("token has been expired!");
      errorRes.status = 403;
      next(errorRes);
    } else {
      const errorRes = new Error("token hasnt been activated!");
      errorRes.status = 403;
      next(errorRes);
    }
  }
};

module.exports = {
    protect
}