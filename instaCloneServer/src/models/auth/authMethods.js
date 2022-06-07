const { SECRET } = require("../../config");
const jwt = require("jsonwebtoken");

//this will be a middle ware i think, which will be added on every protected route.
exports.verifyToken = (req, res, next) => {
  console.log("verify token method called!");
  console.log(req.headers);
  const token = req.headers.authorization.replace("Bearer ", "");
  console.log(token);
  try {
    const isVerified = jwt.verify(token, SECRET);
    if (isVerified) {
      next();
    }
  } catch (Error) {
    res.status(401).json("Please log-in into your account again");
  }
};

exports.signToken = (payload) => {
  var token = jwt.sign(payload, SECRET);
  return token;
};
