const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("./userModel");
const { signUp, signIn, protectedRoute } = require("./userController");
const { verifyToken } = require("../auth/authMethods");

//make the sign up route.
userRouter.post("/auth/new-User", signUp);
userRouter.post("/auth/signin", signIn);
userRouter.post("/auth/pr", verifyToken, protectedRoute);

module.exports = userRouter;
