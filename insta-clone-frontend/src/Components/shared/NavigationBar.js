import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../store/userSlice";

export default function NavigationBar() {
  let activeStyle = {
    textDecoration: "underline",
  };

  const user = useSelector((state) => state.user);

  return (
    <div className="nav-bar">
      <Link to="/" className="logo">
        Instagram
      </Link>
      <ul>
        {!user && (
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/login"
            >
              Login
            </NavLink>{" "}
          </li>
        )}

        {!user && (
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/signup"
            >
              Sign up
            </NavLink>
          </li>
        )}

        {user && (
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/profile"
            >
              Profile
            </NavLink>{" "}
          </li>
        )}
        {user && (
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/createPost"
            >
              Create a post
            </NavLink>{" "}
          </li>
        )}
      </ul>
    </div>
  );
}
