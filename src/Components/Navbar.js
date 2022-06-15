import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="navlogo">Blog</div>
      <Link className="navlinks" to="/">
        Main Page
      </Link>
      <Link className="navlinks" to="/create-post">
        Create post
      </Link>
    </nav>
  );
};

export default Navbar;
