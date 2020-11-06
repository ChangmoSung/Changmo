import React, { useEffect, useState } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getApps, removeApps } from "../../../actions/apps";
import deleteS3Object from "../../../utils/deleteS3Object";
import EditAppsPage from "../EditAppsPage/index.js";

const MainPage = ({ getApps, removeApps, apps, isAuthenticated }) => {
  useEffect(() => {
    getApps();
  }, [getApps]);

  const [appInfo, setAppInfo] = useState({});

  const onClick = (_id, fileName) => {
    removeApps(_id);
    deleteS3Object(fileName);
  };

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className={`container mainPage ${appInfo.appId && "disableMainPage"}`}>
      <div className="wrapper mainPageContainer">
        <h1>Welcome!</h1>
        <div className="appContainer">
          {apps.map(({ _id, appName, fileUrl, fileName }, i) => (
            <div key={i} className="appImage">
              <img src={fileUrl} alt={appName} />
              <p>{appName}</p>
              <button onClick={() => setAppInfo({ appId: _id, fileName })}>
                Edit
              </button>
              <button onClick={() => onClick(_id, fileName)}>Remove</button>
            </div>
          ))}
        </div>
      </div>
      {appInfo.appId && (
        <EditAppsPage appInfo={appInfo} setAppInfo={setAppInfo} />
      )}
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
