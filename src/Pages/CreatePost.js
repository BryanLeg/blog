import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName && title && text) {
      await axios.post("http://localhost:5000/api/v1/posts", {
        title,
        text,
        userName,
      });
      navigate("/");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="form-input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <br />
      <textarea
        className="form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        cols="30"
        rows="10"
        placeholder="type post here"
      ></textarea>
      <input
        className="form-input"
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Your name"
      />
      <button className="btn">Submit</button>
    </form>
  );
};

export default CreatePost;
