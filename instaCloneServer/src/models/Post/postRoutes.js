const express = require("express");
const postRouter = express.Router();
const { createPost } = require("./postController");
const { verifyToken } = require("../auth/authMethods");

postRouter.route("/create-post").post(verifyToken, createPost);

module.exports = postRouter;
