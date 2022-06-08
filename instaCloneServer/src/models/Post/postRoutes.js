const express = require("express");
const postRouter = express.Router();
const { createPost, getAllPosts } = require("./postController");
const { verifyToken } = require("../auth/authMethods");

postRouter.route("/create-post").post(verifyToken, createPost);

postRouter.route("/posts").get(getAllPosts);

module.exports = postRouter;
