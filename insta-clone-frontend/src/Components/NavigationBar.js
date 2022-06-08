import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function NavigationBar() {

    let activeStyle = {
        textDecoration: "underline",
      };


  return (
    <div className="nav-bar">
      <div className="logo">Instagram</div>
      <ul>
        <li>
          <NavLink  style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } to="/login">Login</NavLink>{" "}
        </li>
        <li>
          <NavLink  style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } to="signup">Sign up</NavLink>
        </li>
        <li>
          <NavLink  style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } to="profile">Profile</NavLink>{" "}
        </li>
      </ul>
    </div>
  );
}
