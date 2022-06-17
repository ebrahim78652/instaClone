const userModel = require("../User/userModel");
const likesModel = require("./LikesModel");

const populateLikes = async (newCreatedPost, creatorOfPost) => {
  //now get the followers of this user.
  const resultFromDB = await userModel.find(
    { _id: creatorOfPost._id },
    { followers: 1 }
  );

  const followersArr = resultFromDB[0].followers;

  arrDocuments = followersArr.map((follower) => {
    return { user: follower, post: newCreatedPost._id };
  });

  await likesModel.create(arrDocuments);
};

exports.populateLikes = populateLikes;
