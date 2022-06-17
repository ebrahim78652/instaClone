const userModel = require("../User/userModel");
const likesModel = require("./LikesModel");

const populateLikes = async (newCreatedPost, creatorOfPost) => {
  //now get the followers of this user.
  const resultFromDB = await userModel.find(
    { _id: creatorOfPost._id },
    { followers: 1 }
  );

  console.log("***************************");
  console.log(resultFromDB[0].followers);
  const followersArr = resultFromDB[0].followers;
  console.log("***************************");



/*     for (const follower of followersArr) {
    try {
      const like = new likesModel({ user: follower, post: newCreatedPost._id });
    } catch (err) {
      console.log(err);
    }
  }

  await Promise.all(
    followersArr.map(async (follower) => {
      const like = new likesModel({ user: follower, post: newCreatedPost._id });
      await like.save();
    })
  ); */
  
  arrDocuments = followersArr.map((follower)=>{
    return { user: follower, post: newCreatedPost._id };
  });

  await likesModel.create(arrDocuments);
  
};

exports.populateLikes = populateLikes;
