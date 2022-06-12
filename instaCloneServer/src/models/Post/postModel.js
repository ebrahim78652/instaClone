const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  body: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  postedBy: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },

  liked: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
