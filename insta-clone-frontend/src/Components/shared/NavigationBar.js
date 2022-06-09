import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function NavigationBar() {
  let activeStyle = {
    textDecoration: "underline",
  };

  return (
    <div className="nav-bar">
      <Link to="/" className="logo">
        Instagram
      </Link>
      <ul>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/login"
          >
            Login
          </NavLink>{" "}
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/signup"
          >
            Sign up
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/profile"
          >
            Profile
          </NavLink>{" "}
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/createPost"
          >
            Create a post
          </NavLink>{" "}
        </li>
      </ul>
    </div>
  );
}
