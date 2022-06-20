import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCheckToken from "../useCheckToken";

const SinglePost = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const user = useCheckToken();

  const fetchPosts = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/posts/${id}`
    );
    setPosts(data);
    setTitle(data[0].title);
    setText(data[0].post_text);
  }, [id]);

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:5000/api/v1/posts/${id}`);
    navigate("/");
  };

  const likePost = async (id) => {
    await axios.put(`http://localhost:5000/api/v1/posts/${id}`);
    window.location.reload();
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    await axios.patch(`http://localhost:5000/api/v1/posts/${id}`, {
      title,
      text,
    });
    fetchPosts();
    setIsEditing(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      {posts.length > 0 ? (
        <div>
          {!isEditing ? (
            posts.map((post) => {
              const { id, title, post_text, user_name, likes } = post;

              return (
                <article key={id}>
                  <div className="singlepost-post">
                    <h1 className="title">{title}</h1>
                    <p className="singlepost-text">{post_text}</p>
                    <h6 className="username">
                      <span className="published">Publié par</span>
                      {user_name}
                    </h6>
                  </div>

                  {user && (
                    <div className="buttons">
                      <button
                        className="btn"
                        onClick={() => setIsEditing(true)}
                      >
                        edit post
                      </button>
                      <button
                        className="btn delete-btn"
                        onClick={() => deletePost(id)}
                      >
                        Delete Post
                      </button>
                    </div>
                  )}
                </article>
              );
            })
          ) : (
            <form className="form" onSubmit={(e) => handleSubmit(e, id)}>
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
          )}
        </div>
      ) : (
        <div className="error">
          <h1 className="title">Post not found</h1>
          <button className="btn return-btn" onClick={() => navigate("/")}>
            Return to Main Page
          </button>
        </div>
      )}
    </>
  );
};

export default SinglePost;
