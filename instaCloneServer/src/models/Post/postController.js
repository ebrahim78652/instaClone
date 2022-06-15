const postModel = require("./postModel");
const userModel = require("../User/userModel");

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
    const posts = await postModel.find({}).populate({
      path: "postedBy",
      select: "-password  -__v",
    });

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
