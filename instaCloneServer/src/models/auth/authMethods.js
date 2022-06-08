const { SECRET } = require("../../config");
const jwt = require("jsonwebtoken");
const userModel = require("../User/userModel");
//this will be a middle ware i think, which will be added on every protected route.
exports.verifyToken = async (req, res, next) => {
  console.log("verify token method called!");
  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, SECRET);
    if (payload) {
      //fetch the user
      const user = await userModel.findOne({ _id: payload._id });
      console.log(user);
      req.user = user;
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
