import axios from "axios";
import { useEffect, useState } from "react";

const useCheckToken = () => {
  const [user, setUser] = useState("");

  const getToken = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const { data } = await axios.get("http://localhost:5000/api/v1/auth/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data.userName);
    } else {
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return user;
};

export default useCheckToken;
