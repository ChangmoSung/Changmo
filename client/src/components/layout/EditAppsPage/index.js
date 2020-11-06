import React, { useState } from "react";
import "./index.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateApps } from "../../../actions/apps";
import deleteS3Object from "../../../utils/deleteS3Object";

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

const EditAppsPage = ({
  appInfo: { appId, fileName },
  setAppInfo,
  updateApps,
}) => {
  const [formData, setFormData] = useState({
    appName: "",
    appUrl: "",
    appImageFile: "",
  });

  const { appName, appUrl, appImageFile } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = {};
    if (appName) formDataToSubmit.appName = appName;
    if (appUrl) formDataToSubmit.appUrl = appUrl;
    if (appImageFile) formDataToSubmit.appImageFile = appImageFile;

    if (appImageFile) {
      deleteS3Object(fileName);
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
            updateApps(appId, formDataToSend);
          }
        }
      );
    } else if (appName || appUrl) {
      updateApps(appId, formDataToSubmit);
    } else {
      alert("Enter value");
    }

    setAppInfo({});
  };

  return (
    <div className="wrapper editAppsPageContainer">
      <h2>Edit your app</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="appName"
          placeholder="App name"
          onChange={onChange}
        />
        <input
          type="text"
          name="appUrl"
          placeholder="App url"
          onChange={onChange}
        />
        <input type="file" name="appImageFile" onChange={(e) => onChange(e)} />
        <button>Edit</button>
      </form>
      <button onClick={() => setAppInfo({})}>X</button>
    </div>
  );
};

EditAppsPage.propTypes = {
  updateApps: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { updateApps })(EditAppsPage);
