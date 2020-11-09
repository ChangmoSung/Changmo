import React, { useState } from "react";
import "./index.scss";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signup } from "../../../actions/auth";

const SignupPage = ({ signup, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const [goBack, toggleGoBack] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password);
  };

  if (isAuthenticated) return <Redirect to="/mainPage" />;
  if (goBack) return <Redirect to="/" />;

  return (
    <div className="container signupPage">
      <div className="wrapper signupPageContainer">
        <h1>Please sign up to enjoy Changmo's apps</h1>
        <p>I hope you'll have a wonderful day :)</p>
        <form onSubmit={onSubmit}>
          <input
            type="name"
            name="name"
            onChange={onChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            onChange={onChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={onChange}
            placeholder="Password"
          />
          <div className="buttonContainer">
            <button>Sign Up</button>
            <button type="button" onClick={() => toggleGoBack(true)}>
              Go back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

SignupPage.propTypes = {
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(SignupPage);
