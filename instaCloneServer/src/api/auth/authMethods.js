const { SECRET } = require("../../config");
const jwt = require("jsonwebtoken");
const userModel = require("../User/userModel");

//the below method is a middleware which is added on every protected route
exports.verifyToken = async (req, res, next) => {
  console.log("verify token method called!");
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const payload = jwt.verify(token, SECRET);
    if (payload) {
      //fetch the user, and add him to the "req" object
      const user = await userModel.findOne({ _id: payload._id });
      req.user = user;
      next();
    }
  } catch (Error) {
    console.log("some error happened!");
    console.log(Error.message);
    res.status(401).json({
      error: "Please log-in into your account again",
    });
  }
};

//method to sign the token
exports.signToken = (payload) => {
  var token = jwt.sign(payload, SECRET);
  return token;
};
