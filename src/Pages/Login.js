import React, { useState } from "react";
import axios from "axios";
import useCheckToken from "../useCheckToken";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorCredentials, setErrorCredentials] = useState();
  const user = useCheckToken();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorCredentials("please provide email and password");
      setTimeout(() => {
        setErrorCredentials();
      }, 3000);
    } else {
      const { data } = await axios.post("http://localhost:5000/api/v1/login/", {
        email,
        password,
      });

      if (data.isMatch) {
        localStorage.setItem("token", data.token);

        setErrorCredentials(data.msg);
        setTimeout(() => {
          setErrorCredentials();
        }, 3000);
        window.location = "/";
      } else {
        setErrorCredentials(data.msg);
        setTimeout(() => {
          setErrorCredentials();
        }, 3000);
      }
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      {!user ? (
        <article className="article-login">
          <form className="form form-login" onSubmit={handleSubmit}>
            <input
              className="form-input "
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="type your email"
            />
            <br />
            <input
              className="form-input "
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="type your password"
            />
            <button className="btn">Submit</button>
            <span>
              <p className="form-alert">{errorCredentials}</p>
            </span>
          </form>
        </article>
      ) : (
        <div className="error">
          <h1 className="title">You are already connected</h1>
          <button className="btn return-btn" onClick={() => navigate("/")}>
            Return to Main Page
          </button>
        </div>
      )}
    </>
  );
};

export default Login;
