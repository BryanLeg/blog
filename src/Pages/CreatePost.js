import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useCheckToken from "../useCheckToken";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const user = useCheckToken();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && text) {
      await axios.post("http://localhost:5000/api/v1/posts", {
        title,
        text,
        user,
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
      <button className="btn">Submit</button>
    </form>
  );
};

export default CreatePost;
