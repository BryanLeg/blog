import React, { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [admins, setAdmins] = useState();
  const mail = "Brylegrain@gmail.com";

  const fetchAdmins = async () => {
    const { data } = await axios.post("http://localhost:5000/api/v1/admins/", {
      mail,
    });
    setAdmins(data);
  };

  console.log(admins);

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <form className="form">
      <input
        className="form-input"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="type your email"
      />
      <br />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="type your password"
      />
      <button className="btn">Submit</button>
    </form>
  );
};

export default Login;
