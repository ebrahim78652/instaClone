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
});

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
