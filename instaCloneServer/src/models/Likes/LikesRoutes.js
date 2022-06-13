const express = require("express");
const likesRouter = express.Router();
const { verifyToken } = require("../auth/authMethods");
const { likesModel } = require("./LikesModel");

likesRouter
  .route("/")
  .get(verifyToken, (req, res, next) => {
    //this function gets all the posts, with th data whether the post is liked or no.

    //1. get all the posts that are currently in the database.
    //later change it to getting posts that only belong to the people //the signed in user follows.

    const postsToSend = likesModel.find({ user: req.user._id });
    console.log(postsToSend);
    //now we even need to populate this model
  })
  .post();

module.exports = likesRouter;
