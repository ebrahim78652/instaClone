import React, { useEffect } from "react";
import { useState } from "react";

export default function Post({ title, body, imgUrl, _id, isLiked }) {
  const [postIsLiked, setIsLiked] = useState(isLiked);

  const onHeartClicked = async (e) => {
    console.log("heart clicked");

    const response = await fetch(`/posts/like`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      body: JSON.stringify({ post: _id }),
    });

    const bodyOfResponse = await response.json();

    setIsLiked(bodyOfResponse.isLiked);
  };

  return (
    <div className="card home-card">
      <h5>ramesh</h5>
      <div className="card-image">
        <img src={imgUrl} alt="" />
      </div>
      <div className="card-content">
        <i
          onClick={onHeartClicked}
          style={postIsLiked ? { color: "red" } : { color: "black" }}
          className="material-icons"
        >
          favorite
        </i>
        <h4>{title}</h4>
        <p>{body}</p>
        <input type="text" placeholder="add a comment" />
      </div>
    </div>
  );
}
