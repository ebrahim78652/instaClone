const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  imgUrl: {
    type: String,
    required: false,
    default: "no picture",
  },

  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
    default: [],
  },

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

userSchema.methods.validatePassword = async function (passwordFromUser) {
  console.log(this);
  const result = await bcrypt
    .compare(passwordFromUser, this.password)
    .then((res) => {
      if (res) {
        return true;
      }
      return false;
    });

  return result;
};

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
