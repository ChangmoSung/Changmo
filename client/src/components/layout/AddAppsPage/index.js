import React, { useState, useRef } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { addApps } from "../../../actions/apps";
import { addPrivateApps } from "../../../actions/users";
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

const AddAppsPage = ({
  user,
  addApps,
  addPrivateApps,
  isAuthenticated,
  error,
}) => {
  const formEl = useRef(null);
  const [goBack, toggleGoBack] = useState(false);
  const [formData, setFormData] = useState({
    appName: "",
    appUrl: "",
    appImageFile: "",
    appType: "",
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
          Key: `${appImageFile.name}-${uuidv4()}`,
          ACL: "public-read",
        },
        (err, data) => {
          if (err) {
            throw err;
          } else {
            let type = formData.appType;
            delete formData.appType;
            delete formData.appImageFile;

            const formDataToSend = {
              ...formData,
              fileName: data.Key.split("/")[1],
              fileUrl: data.Location,
            };

            if (type === "public") {
              addApps(formDataToSend);
            } else if (type === "private") {
              addPrivateApps(formDataToSend);
            } else {
              addApps(formDataToSend);
              addPrivateApps(formDataToSend);
            }

            if (error.message) alert("App name and url have to be unique :)");

            const answer = window.confirm("Would you like to add more apps?");
            if (!answer && !error.message) toggleGoBack(true);
          }
        }
      );
    } else {
      alert(`Your role is ${user.role}. Please update your role to add apps`);
    }
  };

  if (!isAuthenticated) return <Redirect to="/" />;
  if (goBack) return <Redirect to="/mainPage" />;

  return (
    <div className="container addAppsPage">
      <div className="wrapper addAppsPageContainer">
        <h1>Would you like to add an app?</h1>
        <form ref={formEl} onSubmit={onSubmit}>
          <div className="radioButtoncontainer">
            <label>Public</label>
            <input
              type="radio"
              name="appType"
              value="public"
              onChange={onChange}
              required
            />
          </div>
          <div className="radioButtoncontainer">
            <label>Private</label>
            <input
              type="radio"
              name="appType"
              value="private"
              onChange={onChange}
              required
            />
          </div>
          <div className="radioButtoncontainer">
            <label>Both</label>
            <input
              type="radio"
              name="appType"
              value="publicAndPrivate"
              onChange={onChange}
              required
            />
          </div>
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
            required
          />
          <div className="buttonContainer">
            <button>Add</button>
            <button type="button" onClick={() => toggleGoBack(true)}>
              Go back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddAppsPage.propTypes = {
  user: PropTypes.object.isRequired,
  addApps: PropTypes.func.isRequired,
  addPrivateApps: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.apps.error,
});

export default connect(mapStateToProps, { addApps, addPrivateApps })(
  AddAppsPage
);
