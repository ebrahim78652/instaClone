import React, { useEffect } from "react";
import { useState, useRef } from "react";

export default function Post({ title, body, imgUrl, _id, isLiked, postedBy }) {
  const [postIsLiked, setIsLiked] = useState(isLiked);
  const commentInput = useRef(null);

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
    console.log(bodyOfResponse);

    setIsLiked(bodyOfResponse.isLiked);
  };

  const onSendClicked = async (e) => {
    console.log("send button clicked");
    console.log(commentInput.current.value);

    const response = await fetch(`/posts/comment`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      body: JSON.stringify({ post: _id, content: commentInput.current.value }),
    });

    const bodyOfResponse = await response.json();
    console.log(bodyOfResponse);
  };

  return (
    <div className="card home-card">
      <h5>{postedBy}</h5>
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
        <div className="comment_and_send">
          <input ref={commentInput} type="text" placeholder="add a comment" />
          <i onClick={onSendClicked} className="material-icons">
            send
          </i>
        </div>
        <div className="comments">
          <div className="">
            hey Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
            magnam id molestias dolor voluptates ut.
          </div>

          <div className="">hey</div>
          <div className="">hey</div>
          <div className="">hey</div>
          <div className="">hey</div>
        </div>
      </div>
    </div>
  );
}
