import React from "react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <div className="nav-bar">
      <div className="logo">Logo</div>
      <ul>
        <li>
          <Link to="/login">Login</Link>{" "}
        </li>
        <li>
          <Link to="signup">Sign up</Link>
        </li>
        <li>
          <Link to="profile">Profile</Link>{" "}
        </li>
      </ul>
    </div>
  );
}
