const bcrypt = require("bcrypt");
const { next } = require("cli");
const userModel = require("./userModel");
const signToken = require("../auth/authMethods").signToken;

const saltRounds = 10;

const signUp = (req, res, next) => {
  //extract the data form the res body/ header
  console.log(req.body);
  const { name, password, email, imgUrl } = req.body;
  if (!(name && password && email)) {
    res.status(422).json({ error: "Please enter all fields" });
  }
  //now hash the  password
  bcrypt
    .hash(password, saltRounds)
    .then((hashedPassword) => {
      const user = new userModel({
        name,
        email,
        password: hashedPassword,
        imgUrl,
      });
      return user.save();
    })
    .then((savedDoc) => {
      res.status(201).json("User created!");
    })
    .catch((err) => {
      next(err);
    });
};

const signIn = async (req, res, next) => {
  console.log(req.body.email);

  //first find the user in the database
  const userDoc = await userModel.findOne({ email: req.body.email }).exec();

  //if no user found, respond
  if (!userDoc) {
    res.status(500).json({ error: "user credentials are false" });
  }

  //check if the password is valid
  const isValidPassword = await userDoc.validatePassword(req.body.password);

  //sign the token and send it to the user if the password is valid!
  if (isValidPassword) {
    const token = signToken({ _id: userDoc._id });
    res
      .status(200)
      .send({ token, user: { name: userDoc.name }, message: "user signed in" });
  } else {
    res.status(500).json({ error: "user credentials are false" });
  }
};

//get stats of the signed in user.
const userDetailsAndProfilePicture = async (req, res, next) => {
  console.log("iser details method called");
  //in the user database, search for user with id of the signed in user.
  const user = await userModel.find({ _id: req.user._id }).select("-password");
  console.log(`user object which will be sent: ${user}`);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(500).json({ error: "please sign in again" });
  }
};

//get user suggestions
const userSuggestions = async (req, res, next) => {
  console.log("user suggestion method called");
  const startingLetters = req.params.startingletter;
  //in the user database, search for user with id of the signed in user.
  const regExp = new RegExp(`^${startingLetters}`, "i");
  const user = await userModel
    .find({ $and: [{ name: regExp }, { name: { $nin: `${req.user.name}` } }] })
    .select("-password -_id -email -imgUrl -__v");

  console.log(`user object which will be sent: ${user}`);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(500).json({ error: "please sign in again" });
  }
};

exports.protectedRoute = (req, res, next) => {
  res.status(200).json("confidential data");
};

exports.signUp = signUp;
exports.signIn = signIn;
exports.userSuggestions = userSuggestions;
exports.userDetailsAndProfilePicture = userDetailsAndProfilePicture;
