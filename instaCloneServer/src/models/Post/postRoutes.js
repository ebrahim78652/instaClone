const express = require("express");
const postRouter = express.Router();
const {
  createPost,
  getAllPosts,
  getPostsSignedInUser,
} = require("./postController");

const { verifyToken } = require("../auth/authMethods");

postRouter.route("/create-post").post(verifyToken, createPost);

postRouter.route("/").get(getAllPosts);

postRouter
  .route("/posts-of-signedin-user")
  .get(verifyToken, getPostsSignedInUser);

module.exports = postRouter;
