import React from "react";

export default function Home() {
  return (
    <div className="home">
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
          <h4>titile</h4>
          <p>this is amazing </p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>
      <div className="card home-card">
        <h5>remarsh</h5>
        <div className="card-image">
          <img
            src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=611&q=80"
            alt=""
          />
        </div>
        <div className="card-content">
          <h4>titile</h4>
          <p>this is amazing </p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>
      <div className="card home-card">
        <h5>remarsh</h5>
        <div className="card-image">
          <img
            src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=611&q=80"
            alt=""
          />
        </div>
        <div className="card-content">
          <h4>titile</h4>
          <p>this is amazing </p>
          <input type="text" placeholder="add a comment" />
        </div>
      </div>
    </div>
  );
}
