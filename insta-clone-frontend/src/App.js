import "./App.css";
import NavigationBar from "./Components/shared/NavigationBar";
import { Routes, Route, Switch } from "react-router-dom";
import Home from "./Components/pages/Home";
import Login from "./Components/pages/LoginComponents/Login";
import Signup from "./Components/pages/SignUpComponents/Signup";
import Profile from "./Components/pages/ProfileComponents/Profile";
import CreatePost from "./Components/pages/CreatePost/CreatePost";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/createPost" element={<CreatePost />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
