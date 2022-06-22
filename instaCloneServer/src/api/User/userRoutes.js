const express = require("express");
const userRouter = express.Router();
const {
  signUp,
  signIn,
  protectedRoute,
  userDetailsAndProfilePicture,
  userSuggestions,
  followUser,
  unfollowUser,
} = require("./userController");
const { verifyToken } = require("../auth/authMethods");

// sign up route.
userRouter.post("/auth/new-User", signUp);
userRouter.post("/auth/signin", signIn);

//purpose of below route: used when trying to see a users profile.
// or when signed in user trying to see his own profile.
userRouter.get("/userdetails/:name", verifyToken, userDetailsAndProfilePicture);

//Purpose of below route: used when user typing username in search bar, and wants suggestions.
userRouter.get(
  "/usersuggestions/:startingletter",
  verifyToken,
  userSuggestions
);

userRouter.put("/follow/:name", verifyToken, followUser);
userRouter.put("/unfollow/:name", verifyToken, unfollowUser);

module.exports = userRouter;
