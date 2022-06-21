import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FollowButton from "../Components/pages/ProfileComponents/FollowButton";
import UnfollowButton from "../Components/pages/ProfileComponents/UnfollowButton";

export const contextProfileDetails = React.createContext();

export default function ContextProfileDetails({
  user,
  isProfileOfSignedInUser,
  children,
}) {
  //here after the component mounts, Just add a fetch!

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

  return (
    <contextProfileDetails.Provider
      value={{
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
      }}
    >
      {children}
    </contextProfileDetails.Provider>
  );
}
