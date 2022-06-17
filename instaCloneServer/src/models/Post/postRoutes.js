const express = require("express");
const postRouter = express.Router();
const {
  createPost,
  getAllPosts,
  postsUser,
  likePost,
  makeComment,
} = require("./postController");

const { verifyToken } = require("../auth/authMethods");

postRouter.route("/create-post").post(verifyToken, createPost);

postRouter.route("/").get(verifyToken, getAllPosts);

postRouter.route("/like").put(verifyToken, likePost);

postRouter.route("/comment").put(verifyToken, makeComment);

postRouter.route("/posts-of-user/:name").get(verifyToken, postsUser);

module.exports = postRouter;
