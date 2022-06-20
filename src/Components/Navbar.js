import React from "react";
import { Link } from "react-router-dom";
import useCheckToken from "../useCheckToken";

const Navbar = () => {
  const user = useCheckToken();

  const disconnect = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav>
      <div className="navlogo">Blog-Perso</div>
      <Link className="navlinks" to="/">
        Main page
      </Link>
      <Link className="navlinks" to="/about">
        About me
      </Link>
      {user === "bryan legrain" ? (
        <>
          <Link className="navlinks" to="/create-post">
            Create post
          </Link>
          <Link className="navlinks" to="/" onClick={() => disconnect()}>
            Disconnect
          </Link>
        </>
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navbar;
