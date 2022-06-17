const express = require("express");
const likesRouter = express.Router();
const { verifyToken } = require("../auth/authMethods");
const { likesModel } = require("./LikesModel");

/* likesRouter
  .route("/")
  .get(verifyToken, )
  

module.exports = likesRouter; */
