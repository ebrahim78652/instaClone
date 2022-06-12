import React from "react";
import { useEffect, useState } from "react";

export default function ProfileDetails() {
  //here after the component mounts, Just add a fetch!

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      //fetch the  posts that are stored in DB
      const response = await fetch("/posts/posts-of-signedin-user", {
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

    fetchPosts();
  }, []);

  return (
    <div>
      <div className="main_description">
        <div className="profile_image">
          <img
            src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            alt="random"
          />
        </div>

        <div className="user_description">
          <div className="name">Test name</div>
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
