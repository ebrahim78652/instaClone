import React from "react";

export default function Post({ title, body, imgUrl }) {
  return (
    <div className="card home-card">
      <h5>remarsh</h5>
      <div className="card-image">
        <img
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=611&q=80"
          alt=""
        />
      </div>
      <div className="card-content">
        <i style={{ color: "red" }} className="material-icons">
          favorite
        </i>
        <h4>{title}</h4>
        <p>{body}</p>
        <input type="text" placeholder="add a comment" />
      </div>
    </div>
  );
}
