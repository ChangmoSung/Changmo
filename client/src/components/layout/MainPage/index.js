import React, { useEffect } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getApps, removeApps } from "../../../actions/apps";
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

const MainPage = ({ getApps, removeApps, apps, isAuthenticated }) => {
  useEffect(() => {
    getApps();
  }, [getApps]);

  const onClick = (_id, fileName) => {
    removeApps(_id);
    s3.deleteObject({ Bucket, Key: fileName }, (err, data) => {
      if (err) throw err;
      else console.log(data);
    });
  };

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="container mainPage">
      <div className=" wrapper mainPageContainer">
        <h1>Welcome!</h1>
        <div className="appContainer">
          {apps.map(({ _id, appName, fileUrl, fileName }, i) => (
            <div key={i} className="appImage">
              <img src={fileUrl} alt={appName} />
              <p>{appName}</p>
              <button onClick={() => onClick(_id, fileName)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

MainPage.propTypes = {
  getApps: PropTypes.func.isRequired,
  removeApps: PropTypes.func.isRequired,
  apps: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  apps: state.apps.apps,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getApps, removeApps })(MainPage);
