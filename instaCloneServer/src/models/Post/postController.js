const postModel = require("./postModel");
const userModel = require("../User/userModel");
const { populateLikes } = require("../Likes/LikesController");
const likesModel = require("../Likes/LikesModel");

exports.createPost = async (req, res, next) => {
  const { title, body, imgUrl } = req.body;
  console.log(req.body);

  if (!title || !body || !imgUrl) {
    res.status(422).json({ error: "Please enter all fields" });
  }
  const user = req.user;
  console.log(user);
  const newPost = new postModel({ title, body, imgUrl, postedBy: user._id });
  try {
    const result = await newPost.save();
    console.log(`this is the new post that was created: ${newPost}`);
    //populate the likes table below.
    populateLikes(newPost, user);
    res.status(201).json({
      result,
      message: "Post Created!",
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await likesModel.find({ user: req.user._id }).populate({
      path: "post",
    });

    console.log("*******************************");
    console.log("These are the posts for the home page");
    console.log(posts);
    console.log("*******************************");

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

exports.postsUser = async (req, res, next) => {
  console.log(req.user);
  try {
    const user = await userModel.find({ name: req.params.name });

    const userId = user[0]._id;

    const posts = await postModel.find({ postedBy: userId });

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

/* try {
  const posts = await likesModel.find({ user: req.user._id }).populate({
    path: "post",
  });

  console.log("*******************************");
  console.log("These are the posts for the home page");
  console.log(posts);
  console.log("*******************************");

   res.status(200).json(posts);
} catch (err) {
  next(err);
} */
