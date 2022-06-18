import React, { useEffect } from "react";
import { useState, useRef } from "react";

export default function Post({
  title,
  body,
  imgUrl,
  _id,
  isLiked,
  postedBy,
  comments,
}) {
  const [postIsLiked, setIsLiked] = useState(isLiked);
  const [postComments, setComments] = useState(comments);
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
    setComments(bodyOfResponse.comments);
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
          {postComments
            .slice(0)
            .reverse()
            .map((comment) => (
              <div key={comment._id}>{comment.content}</div>
            ))}
        </div>
      </div>
    </div>
  );
}
