const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("./userModel");
const { signUp, signIn } = require("./userController");

//make the sign up route.
userRouter.post("/auth/new-User", signUp);
userRouter.post("/auth/signin", signIn);

module.exports = userRouter;
