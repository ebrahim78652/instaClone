const userModel = require("../User/userModel");
const likesModel = require("./LikesModel");

//Purpose of below method: keep track if a follower has liked a post
//everytime a user makes a post, this method is called.
//for every follower that the poster has, make an entry
//in the "likes" schema.
const populateLikes = async (newCreatedPost, creatorOfPost) => {
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
