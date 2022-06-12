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
  const dispatch = useDispatch();

  //on logout clicked:
  const onLogOutClicked = () => {
    localStorage.clear();
    dispatch(actions.logoutUser());
  };

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
