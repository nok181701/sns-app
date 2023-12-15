import Profile from "src/pages/Profile";
import Home from "./pages/Home";
import Login from "src/pages/Login";
import Register from "src/pages/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
