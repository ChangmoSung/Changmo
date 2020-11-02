import React, { useState, useRef } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addApps } from "../../../actions/apps";
import S3 from "aws-sdk/clients/s3";
const {
  REACT_APP_AWS_ACCESS_KEY_ID: accessKeyId,
  REACT_APP_AWS_SECRET_ACCESS_KEY: secretAccessKey,
  REACT_APP_AWS_REGION: region,
  REACT_APP_AWS_S3_APP_IMAGES_BUCKET: Bucket,
} = process.env;
const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId,
  secretAccessKey,
  region,
});

const AddAppsPage = ({ user, addApps, isAuthenticated }) => {
  const formEl = useRef(null);
  const [formData, setFormData] = useState({
    appName: "",
    appUrl: "",
    appImageFile: "",
  });
  const { appImageFile } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    formEl.current.reset();

    if (user && user.role === "admin") {
      s3.upload(
        {
          Bucket,
          Body: appImageFile,
          Key: appImageFile.name,
          ACL: "public-read",
        },
        (err, data) => {
          if (err) {
            throw err;
          } else {
            const formDataToSend = {
              ...formData,
              fileName: data.Key.split("/")[1],
              fileUrl: data.Location,
            };
            addApps(formDataToSend);
          }
        }
      );
    } else {
      alert(`Your role is ${user.role}. Please update your role to add apps`);
    }
  };

  if (!isAuthenticated) return <Redirect to="/" />;

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
            type="file"
            name="appImageFile"
            onChange={(e) => onChange(e)}
          />
          <button>Add</button>
        </form>
      </div>
    </div>
  );
};

AddAppsPage.propTypes = {
  user: PropTypes.object.isRequired,
  addApps: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addApps })(AddAppsPage);
