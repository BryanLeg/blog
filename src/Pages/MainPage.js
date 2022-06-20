import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const { data } = await axios.get("http://localhost:5000/api/v1/posts/");
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="posts">
      {posts.length > 0 ? (
        posts.map((post) => {
          const { id, title, post_text, user_name, date_posted } = post;

          return (
            <article
              className="single-post"
              key={id}
              onClick={() => navigate(`/post/${id}`)}
            >
              <h1 className="title">{title}</h1>
              <p className="post-text">{post_text}</p>
              <h6 className="username">
                <span className="published">Publié par</span>
                {user_name}
              </h6>
            </article>
          );
        })
      ) : (
        <div className="loading"></div>
      )}
    </div>
  );
};

export default MainPage;
