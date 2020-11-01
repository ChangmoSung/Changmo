import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const NavBar = () => {
  return (
    <nav>
      <ul className="wrapper">
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/">ABOUT</Link>
        </li>
        <li>
          <Link to="/">APP1</Link>
        </li>
        <li>
          <Link to="/">APP2</Link>
        </li>
        <li>
          <Link to="/">APP3</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
