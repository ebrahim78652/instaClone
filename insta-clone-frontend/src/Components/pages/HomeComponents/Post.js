import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Loading from "../../shared/Loading";

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
  const [commentInput, setCommentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onHeartClicked = async (e) => {
    console.log("heart clicked");
    setIsLoading(true);

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
    setIsLoading(false);
  };

  const onSendClicked = async (e) => {
    setIsLoading(true);
    console.log("send button clicked");
    console.log(commentInput);

    const response = await fetch(`/posts/comment`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      body: JSON.stringify({ post: _id, content: commentInput }),
    });

    const bodyOfResponse = await response.json();
    console.log(bodyOfResponse);
    setComments(bodyOfResponse.comments);
    setIsLoading(false);
    setCommentInput("");
  };

  return (
    <div className="card home-card">
      <></>
      <div className="postedBy">{postedBy}</div>
      <div className="card-image">
        <img src={imgUrl} alt="" />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
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
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              type="text"
              placeholder="add a comment"
            />
            <i onClick={onSendClicked} className="material-icons">
              send
            </i>
          </div>
          <div className="comments">
            {postComments
              .slice(0)
              .reverse()
              .map((comment) => (
                <div key={comment._id}>
                  <div className="comment">
                    <div className="comment_author">
                      {comment.writtenBy.name}
                    </div>
                    <div className="comment_content">{comment.content}</div>
                  </div>
                  <div className="divider"></div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
