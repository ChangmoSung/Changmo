import React, { useState, useRef } from "react";
import "./index.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addApps } from "../../../actions/apps";

const AddAppsPage = ({ role, addApps }) => {
  const formEl = useRef(null);
  const [formData, setFormData] = useState({
    appName: "",
    appUrl: "",
    fileName: "",
    fileUrl: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    formEl.current.reset();

    if (role === "admin") addApps(formData);
    else alert(`Your role is ${role}. Please update your role to add apps`);
  };

  return (
    <div className="container addAppsPage">
      <div className="wrapper addAppsPageContainer">
        <h1>Would you like to add an app?</h1>
        <form ref={formEl} onSubmit={onSubmit}>
          <input
            type="text"
            name="appName"
            onChange={onChange}
            placeholder="App name"
            required
          />
          <input
            type="text"
            name="appUrl"
            onChange={onChange}
            placeholder="App url"
            required
          />
          <input
            type="text"
            name="fileName"
            onChange={onChange}
            placeholder="File name"
            required
          />
          <input
            type="text"
            name="fileUrl"
            onChange={onChange}
            placeholder="File url"
          />
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

AddAppsPage.propTypes = {
  role: PropTypes.string.isRequired,
  addApps: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  role: state.auth.user.role,
});

export default connect(mapStateToProps, { addApps })(AddAppsPage);
