import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const NavBar = () => {
  return (
    <nav>
      <ul className="wrapper">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/addAppsPage">Add apps</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
