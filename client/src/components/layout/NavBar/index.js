import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const NavBar = ({ user }) => {
  return (
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
      </ul>
    </nav>
  );
};

NavBar.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(NavBar);
