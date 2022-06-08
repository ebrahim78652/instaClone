import "./App.css";
import NavigationBar from "./Components/NavigationBar";
import { Routes, Route, Switch } from "react-router-dom";
import Home from "./Components/pages/Home";
import Login from "./Components/pages/Login";
import Signup from "./Components/pages/Signup";
import Profile from "./Components/pages/Profile";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
