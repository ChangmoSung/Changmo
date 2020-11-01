import React, { useState } from "react";
import "./index.scss";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../../actions/auth";

const LandingPage = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) return <Redirect to="/mainPage" />;

  return (
    <div className="container landingPage">
      <div className="wrapper landingPageContainer">
        <h1>Welcome to Changmo's world!</h1>
        <p>I hope you'll have a wonderful day :)</p>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            onChange={onChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChange}
            placeholder="Password"
            required
          />
          <button>Log in</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

LandingPage.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LandingPage);
