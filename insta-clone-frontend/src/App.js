import "./App.css";
import NavigationBar from "./Components/shared/NavigationBar";
import { Routes, Route } from "react-router-dom";
import HomeWrapper from "./Components/pages/HomeComponents/HomeWrapper";
import LoginWrapper from "./Components/pages/LoginComponents/LoginWrapper";
import SignupWrapper from "./Components/pages/SignUpComponents/SignupWrapper";
import ProfileSignedInUser from "./Components/pages/ProfileComponents/ProfileSignedInUser";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "./store/userSlice";
import ProfileSearchedUser from "./Components/pages/ProfileComponents/ProfileSearchedUser";
import CreatePostWrapper from "./Components/pages/CreatePost/CreatePostWrapper";
import ErrorBoundary from "./Components/shared/Error";

function App() {
  const user = useSelector((state) => state.userReducers.user);
  const dispatch = useDispatch();

  //if the react app is refreshed, and if a user already exists in the localStorage, then: update the store with the user from the localStorage.
  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage && !user) {
      console.log("user present in localStorage but not in local State.");

      dispatch(actions.loginUser(JSON.parse(userFromLocalStorage)));
    }
  }, []);

  //below: different Routes loaded depending on if a user has already logged in
  return (
    <div>
      <NavigationBar />

      <Routes>
        {!user && <Route path="/login" element={<LoginWrapper />}></Route>}
        {!user && <Route path="/signup" element={<SignupWrapper />}></Route>}
        {user && (
          <Route path="/profile" element={<ProfileSignedInUser />}></Route>
        )}
        {user && (
          <Route
            path="/profileSearchedUser"
            element={<ProfileSearchedUser />}
          ></Route>
        )}
        {user && (
          <Route path="/createPost" element={<CreatePostWrapper />}></Route>
        )}
        <Route
          path="/"
          element={
            <ProtectedRoute user={localStorage.getItem("user")}>
              <HomeWrapper />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
