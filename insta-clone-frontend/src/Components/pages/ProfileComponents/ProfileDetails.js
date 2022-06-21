import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FollowButton from "./FollowButton";
import UnfollowButton from "./UnfollowButton";
import { useContext } from "react";
import { contextProfileDetails } from "../../../Contexts/ProfileDetailsContext";
export default function ProfileDetails() {
  const {
    userDetails,
    numPosts,
    numFollowers,
    numFollowing,
    isFollowing,
    setIsFollowing,
    setNumFollowers,
    posts,
    isProfileOfSignedInUser,
    user,
  } = useContext(contextProfileDetails);

  //here after the component mounts, Just add a fetch!
  /* 
  const [posts, setPosts] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [numPosts, setNumPosts] = useState(null);
  const [numFollowers, setNumFollowers] = useState(-1);
  const [numFollowing, setNumFollowing] = useState(-1);
  const [isFollowing, setIsFollowing] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      //fetch the  posts that are stored in DB

      const response = await fetch(`/posts/${user}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((resp) => resp.json())
        .then((respBody) => respBody)
        .catch((err) => console.log(err));
      console.log(response);
      setPosts(response);
    };

    const fetchDetails = async () => {
      //fetch the  posts that are stored in DB
      const response = await fetch(`/user/userdetails/${user}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((resp) => resp.json())
        .then((respBody) => respBody)
        .catch((err) => console.log(err));
      console.log(response);
      setUserDetails(response.user[0]);
      setNumPosts(response.numPosts);
      setNumFollowers(response.numFollowers);
      setNumFollowing(response.numFollowing);

      if (response.isFollowing !== undefined) {
        setIsFollowing(response.isFollowing);
      }
    };

    fetchPosts();
    fetchDetails();
  }, []);
 */
  return (
    <div>
      <div className="main_description">
        <div className="profile_image">
          <img
            src={userDetails.imgUrl ? userDetails.imgUrl : ""}
            alt="profile pic"
          />
        </div>

        <div className="user_description">
          <div className="name">{userDetails.name}</div>
          <div className="user_stats">
            <div className="posts">{numPosts} Posts</div>
            <div className="followers">{numFollowers} followers</div>
            <div className="following">{numFollowing} following</div>
          </div>
          {!isProfileOfSignedInUser && !isFollowing && (
            <FollowButton
              setIsFollowing={setIsFollowing}
              setNumFollowers={setNumFollowers}
            />
          )}
          {!isProfileOfSignedInUser && isFollowing && (
            <UnfollowButton
              setNumFollowers={setNumFollowers}
              setIsFollowing={setIsFollowing}
            />
          )}
        </div>
      </div>
      <div className="divider"></div>
      <div className="picture_grid">
        {posts.map((element) => (
          <div key={element._id} className="grid_item">
            <img src={element.imgUrl} alt="random" />
          </div>
        ))}
      </div>
    </div>
  );
}
