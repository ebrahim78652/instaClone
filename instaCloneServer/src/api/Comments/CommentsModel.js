const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  writtenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  content: {
    type: String,
  },
});

const commentsModel = mongoose.model("comments", commentsSchema);
module.exports = commentsModel;
