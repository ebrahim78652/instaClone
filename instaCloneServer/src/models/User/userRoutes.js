const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("./userModel");
const saltRounds = 10;

//make the sign up route.
userRouter.post("/auth/new-User", (req, res, next) => {
  //extract the data form the res body/ header
  const { name, password, email } = req.body;
  //now hash the  password
  bcrypt
    .hash(password, saltRounds)
    .then((hashedPassword) => {
      const user = new userModel({ name, email, hashedPassword });
      user.save();
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = userRouter;
