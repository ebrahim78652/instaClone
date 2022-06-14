const express = require("express");
const postRouter = express.Router();
const { createPost, getAllPosts, postsUser } = require("./postController");

const { verifyToken } = require("../auth/authMethods");

postRouter.route("/create-post").post(verifyToken, createPost);

postRouter.route("/").get(getAllPosts);

postRouter.route("/posts-of-user/:name").get(verifyToken, postsUser);

module.exports = postRouter;
