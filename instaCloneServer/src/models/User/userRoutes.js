const express = require("express");
const userRouter = express.Router();
const {
  signUp,
  signIn,
  protectedRoute,
  userDetailsAndProfilePicture,
  userSuggestions,
} = require("./userController");
const { verifyToken } = require("../auth/authMethods");

//make the sign up route.
userRouter.post("/auth/new-User", signUp);
userRouter.post("/auth/signin", signIn);
userRouter.post("/auth/pr", verifyToken, protectedRoute);
userRouter.get(
  "/userdetails/:userId",
  verifyToken,
  userDetailsAndProfilePicture
);
userRouter.get(
  "/usersuggestions/:startingletter",
  verifyToken,
  userSuggestions
);

module.exports = userRouter;
