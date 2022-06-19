import "./App.css";
import NavigationBar from "./Components/shared/NavigationBar";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/pages/HomeComponents/Home";
import Login from "./Components/pages/LoginComponents/Login";
import Signup from "./Components/pages/SignUpComponents/Signup";
import ProfileSignedInUser from "./Components/pages/ProfileComponents/ProfileSignedInUser";
import CreatePost from "./Components/pages/CreatePost/CreatePost";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "./store/userSlice";
import ProfileSearchedUser from "./Components/pages/ProfileComponents/ProfileSearchedUser";
import { useState } from "react";

function App() {
  const user = useSelector((state) => state.userReducers.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage && !user) {
      console.log("user present in localStorage but not in local State.");
      dispatch(actions.loginUser(JSON.parse(userFromLocalStorage)));
    }
  }, []);

  return (
    <div>
      <NavigationBar />
      <Routes>
        {!user && <Route path="/login" element={<Login />}></Route>}
        {!user && <Route path="/signup" element={<Signup />}></Route>}
        {user && (
          <Route path="/profile" element={<ProfileSignedInUser />}></Route>
        )}
        {user && (
          <Route
            path="/profileSearchedUser"
            element={<ProfileSearchedUser />}
          ></Route>
        )}
        {user && <Route path="/createPost" element={<CreatePost />}></Route>}
        <Route
          path="/"
          element={
            <ProtectedRoute user={localStorage.getItem("user")}>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
