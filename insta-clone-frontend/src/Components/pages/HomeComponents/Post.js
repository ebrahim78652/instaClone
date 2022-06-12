import React from "react";

export default function Post({ title, body, imgUrl }) {
  return (
    <div className="card home-card">
      <h5>ramesh</h5>
      <div className="card-image">
        <img src={imgUrl} alt="" />
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
