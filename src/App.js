import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import SinglePost from "./Pages/SinglePost";
import CreatePost from "./Pages/CreatePost";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<MainPage />}></Route>
        <Route path="/create-post" element={<CreatePost />}></Route>
        <Route path="/post/:id" element={<SinglePost />}></Route>
        <Route path="/admin" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
