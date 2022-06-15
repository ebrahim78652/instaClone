const express = require("express");
const userRouter = express.Router();
const {
  signUp,
  signIn,
  protectedRoute,
  userDetailsAndProfilePicture,
  userSuggestions,
  followUser,
} = require("./userController");
const { verifyToken } = require("../auth/authMethods");

//make the sign up route.
userRouter.post("/auth/new-User", signUp);
userRouter.post("/auth/signin", signIn);
userRouter.post("/auth/pr", verifyToken, protectedRoute);
userRouter.get("/userdetails/:name", verifyToken, userDetailsAndProfilePicture);
userRouter.get(
  "/usersuggestions/:startingletter",
  verifyToken,
  userSuggestions
);
userRouter.put("/follow/:name", verifyToken, followUser);

module.exports = userRouter;
