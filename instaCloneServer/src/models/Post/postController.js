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
