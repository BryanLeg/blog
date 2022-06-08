import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SinglePost = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/posts/${id}`
    );
    setPosts(data);
  }, [id]);

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:5000/api/v1/posts/${id}`);
    navigate("/");
  };

  const likePost = async (id) => {
    await axios.put(`http://localhost:5000/api/v1/posts/${id}`);
    window.location.reload();
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => {
            const { id, title, post_text, user_name, likes } = post;

            return (
              <article key={id}>
                <div className="singlepost-post">
                  <h1 className="title">{title}</h1>
                  <p className="singlepost-text">{post_text}</p>
                  <h4 className="username">{user_name}</h4>
                  <span className="likes">
                    Likes: {likes}
                    <button
                      className="btn like-btn"
                      onClick={() => likePost(id)}
                    >
                      Like Post
                    </button>
                  </span>
                </div>
                <button
                  className="btn delete-btn"
                  onClick={() => deletePost(id)}
                >
                  Delete Post
                </button>
              </article>
            );
          })}
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
