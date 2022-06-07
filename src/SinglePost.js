import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SinglePost = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/v1/posts/${id}`
    );
    setPosts(data);
  };

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
  }, []);

  return (
    <>
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => {
            const { id, title, post_text, user_name, likes } = post;

            return (
              <article key={id}>
                <div>
                  <h1>{title}</h1>
                  <p>{post_text}</p>
                  <h4>{user_name}</h4>
                  <span>{likes}</span>
                </div>
                <button className="btn" onClick={() => likePost(id)}>
                  Like Post
                </button>
                <button className="btn" onClick={() => deletePost(id)}>
                  Delete Post
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <div>
          <h1>Post not found</h1>
          <button onClick={() => navigate("/")}>Main Page</button>
        </div>
      )}
    </>
  );
};

export default SinglePost;
