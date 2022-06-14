import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function ProfileDetails({ user }) {
  //here after the component mounts, Just add a fetch!

  const [posts, setPosts] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      //fetch the  posts that are stored in DB

      const response = await fetch(`/posts/posts-of-user/${user}`, {
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
      setUserDetails(response[0]);
    };

    fetchPosts();
    fetchDetails();
  }, []);

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
            <div className="posts">40 posts</div>
            <div className="followers">40 followers</div>
            <div className="following">40 following</div>
          </div>
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
