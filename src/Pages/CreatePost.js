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
    <>
      {user ? (
        <article className="article-createPostForm">
          <form className="form createPost-form" onSubmit={handleSubmit}>
            <input
              className="form-input createPost-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <br />
            <textarea
              className="form-textarea createPost-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="type post here"
            ></textarea>
            <button className="btn">Submit</button>
          </form>
        </article>
      ) : (
        <div className="error">
          <h1 className="title">You do not have access to this page</h1>
          <button className="btn return-btn" onClick={() => navigate("/")}>
            Return to Main Page
          </button>
        </div>
      )}
    </>
  );
};

export default CreatePost;
