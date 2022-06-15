const bcrypt = require("bcrypt");
const { next } = require("cli");
const userModel = require("./userModel");
const postModel = require("../Post/postModel");
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

//get stats of the signed in user or the stats of the user whose profile we want to see.
//profile of other users can be returned if: url param passed.
const userDetailsAndProfilePicture = async (req, res, next) => {
  console.log("user details method called");
  //in the user database, search for user with the name  of the  user.
  const name = req.params.name;

  const user = await userModel.find({ name: name }).select("-password");
  console.log(`user object which will be sent: ${user}`);

  const userId = user[0]._id;
  console.log("******************************");
  console.log("The user Id is: " + userId);
  console.log("******************************");
  //search for the number of posts from this user;
  const numPosts = await postModel.find({ postedBy: userId }).count();

  if (user) {
    res.status(200).json({ user, numPosts });
  } else {
    res.status(500).json({ error: "please sign in again" });
  }

  /*   //else we will return the signed in user
  const user = await userModel.find({ _id: req.user._id }).select("-password");
  console.log(`user object which will be sent: ${user}`);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(500).json({ error: "please sign in again" });
  } */
};

//get user suggestions
const userSuggestions = async (req, res, next) => {
  console.log("user suggestion method called");
  const startingLetters = req.params.startingletter;
  //in the user database, search for user with id of the signed in user.
  const regExp = new RegExp(`^${startingLetters}`, "i");
  const user = await userModel
    .find({ $and: [{ name: regExp }, { name: { $nin: `${req.user.name}` } }] })
    .select("-password -_id -email -imgUrl -__v")
    .limit(5);

  console.log(`user object which will be sent: ${user}`);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(500).json({ error: "please sign in again" });
  }
};

//follow a user
const followUser = async (req, res, next) => {
  console.log(`the signed in user is: ${req.user}`);
  try {
    const userNameToFollow = req.params.name;

    await userModel.updateOne(
      { name: userNameToFollow },
      { $push: { followers: req.user._id } }
    );
    const temp = await userModel.find({ name: userNameToFollow });
    console.log(temp);
    console.log(`the fetched user after udpating is: ${temp}`);

    console.log(`the _id is : ${temp._id}`);
    // NOW add a following to the signed in user:
    await userModel.updateOne(
      { _id: req.user._id },
      { $push: { following: temp[0]._id } }
    );

    const temp2 = await userModel.find({ _id: req.user._id });
    console.log(`the signed in user after udpating is: ${temp2}`);

    //send the response
    res.status(200).json({ message: `following user: ${userNameToFollow}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error occured" });
  }
};
exports.protectedRoute = (req, res, next) => {
  res.status(200).json("confidential data");
};

exports.signUp = signUp;
exports.signIn = signIn;
exports.userSuggestions = userSuggestions;
exports.userDetailsAndProfilePicture = userDetailsAndProfilePicture;
exports.followUser = followUser;
