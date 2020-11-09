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
          onClick={() => {
            const answer = window.confirm("Are you sure you want to sign out?");
            if (answer) logout();
          }}
          onKeyDown={({ keyCode }) => {
            if (keyCode === 13) {
              const answer = window.confirm(
                "Are you sure you want to sign out?"
              );
              if (answer) logout();
            }
          }}
          tabIndex="0"
        >
          Sign out
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
