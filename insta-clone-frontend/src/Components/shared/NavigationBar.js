import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../store/userSlice";
import AutoComplete from "./AutoComplete";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const navigate = useNavigate();

  console.log("navigation bar loading");
  let activeStyle = {
    textDecoration: "underline",
  };

  const user = useSelector((state) => state.userReducers.user);
  const dispatch = useDispatch();

  //on logout clicked:
  const onLogOutClicked = () => {
    localStorage.clear();
    dispatch(actions.logoutUser());
    navigate("/login");
  };

  return (
    <div className="nav-bar">
      <Link to="/" className="logo">
        Instagram
      </Link>

      {user && <AutoComplete />}

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
        {user && (
          <li>
            <div onClick={onLogOutClicked} className="btn  #f44336 red">
              Log Out
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}
