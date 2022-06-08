const postModel = require("./postModel");

exports.createPost = async (req, res, next) => {
  const { title, body, imgUrl } = req.body;
  const user = req.user;
  console.log(user);
  const newPost = new postModel({ title, body, imgUrl, postedBy: user._id });
  try {
    const result = await newPost.save();
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await postModel.find({}).populate({
      path: "postedBy",
      select: "-password -_id -__v",
    });

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getPostsSignedInUser = async (req, res, next) => {
  console.log(req.user);
  try {
    const posts = await postModel.find({ postedBy: req.user._id });

    /*  console.log(posts[0].postedBy._id.equals(req.user._id)); */
    console.log(posts);

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};
