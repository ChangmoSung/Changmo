import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../actions/auth";

const NavBar = ({ user, logout }) =>
  user && (
    <nav>
      <ul className="wrapper">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user && user.role === "admin" && (
          <li>
            <Link to="/addAppsPage">Add apps</Link>
          </li>
        )}
        <li
          onClick={logout}
          onKeyDown={({ keyCode }) => keyCode === 13 && logout()}
          tabIndex="0"
        >
          Log out
        </li>
      </ul>
    </nav>
  );

NavBar.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(NavBar);
