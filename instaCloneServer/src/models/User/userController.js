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

//Purpose: get stats of the signed in user or the stats of the user whose profile we want to see.
const userDetailsAndProfilePicture = async (req, res, next) => {
  //in the user database, search for user with the name  of the  user.
  const name = req.params.name;

  const user = await userModel.find({ name: name }).select("-password");

  const userId = user[0]._id;

  //search for the number of posts from this user;
  const numPosts = await postModel.find({ postedBy: userId }).count();
  let numFollowers;
  let numFollowing;
  try {
    numFollowers = await userModel.aggregate([
      { $match: { _id: userId } },
      { $project: { numFollowers: { $size: "$followers" } } },
    ]);

    numFollowing = await userModel.aggregate([
      { $match: { _id: userId } },
      { $project: { numFollowing: { $size: "$following" } } },
    ]);
  } catch (err) {
    console.log(err);
  }

  //if the user, whose details being fetched , is not the signed in user, then check here if the signed in user is already following the user being fetched.

  let isFollowing = false;
  let isFetchingAnotherUser = req.user.name !== user[0].name;
  if (isFetchingAnotherUser) {
    //below checking if "another user" is being followed by the signed in user:
    const anotherUser = await userModel.find({
      _id: req.user._id,
      following: { $in: user[0]._id },
    });

    //after fetching the "another user": if the array.size = 0, hence the signed is user is not following the "another user". else signed in user is already following the "another user"
    if (anotherUser.length === 0) {
      isFollowing = false;
    } else {
      isFollowing = true;
    }
  }

  let objToSend = {
    user,
    numPosts,
    numFollowers: numFollowers[0].numFollowers,
    numFollowing: numFollowing[0].numFollowing,
  };

  if (isFetchingAnotherUser) {
    objToSend.isFollowing = isFollowing;
  }

  console.log(user[0]);
  if (user) {
    res.status(200).json(objToSend);
  } else {
    res.status(500).json({ error: "please sign in again" });
  }
};

//get user suggestions
const userSuggestions = async (req, res, next) => {
  try {
    const startingLetters = req.params.startingletter;

    //in the user database, search for user with name !== name of signed in user.
    //and with name starting with the letters that the user has typed
    const regExp = new RegExp(`^${startingLetters}`, "i");
    const user = await userModel
      .find({
        $and: [{ name: regExp }, { name: { $nin: `${req.user.name}` } }],
      })
      .select("-password -_id -email -imgUrl -__v")
      .limit(5);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const followUser = async (req, res, next) => {
  try {
    const userNameToFollow = req.params.name;

    //add a "follower" to the user being followed
    const updatedUser = await userModel.findOneAndUpdate(
      { name: userNameToFollow },
      { $push: { followers: req.user._id } },
      { new: true }
    );

    // NOW add a "following" to the signed in user:
    await userModel.updateOne(
      { _id: req.user._id },
      { $push: { following: updatedUser._id } }
    );

    //send the response
    res.status(200).json({
      message: `following user: ${userNameToFollow}`,
      numFollowersUpdated: updatedUser.followers.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error occured" });
  }
};

const unfollowUser = async (req, res, next) => {
  console.log(`the signed in user is: ${req.user}`);
  try {
    const userNameToUnfollow = req.params.name;

    //remoe "follower" of user being unfollowed
    const updatedUser = await userModel.findOneAndUpdate(
      { name: userNameToUnfollow },
      { $pull: { followers: req.user._id } },
      { new: true }
    );

    console.log(`the _id is : ${updatedUser._id}`);
    // NOW remove "following" of the signed in user:
    await userModel.updateOne(
      { _id: req.user._id },
      { $pull: { following: updatedUser._id } }
    );

    //send the response
    res.status(200).json({
      message: `unfollowed user: ${userNameToUnfollow}`,
      numFollowersUpdated: updatedUser.followers.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error occured" });
  }
};

exports.signUp = signUp;
exports.signIn = signIn;
exports.userSuggestions = userSuggestions;
exports.userDetailsAndProfilePicture = userDetailsAndProfilePicture;
exports.followUser = followUser;
exports.unfollowUser = unfollowUser;
