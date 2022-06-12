const mongoose = require("mongoose");

const postsLikedByUser = new mongoose.Schema({
  user: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectID,
  },

  post: {
    ref: "posts",
    type: mongoose.Schema.Types.ObjectID,
  },

  isLiked: {
    type: Boolean,
    default: false,
  },
});

const likesModel = mongoose.model("likes", postsLikedByUser);
modules.export = likesModel;
