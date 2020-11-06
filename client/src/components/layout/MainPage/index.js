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
    const answer = window.confirm(
      "Are you sure you want to permanently delete the app?"
    );

    if (answer) {
      removeApps(_id);
      deleteS3Object(fileName);
    }
  };

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className={`container mainPage ${appInfo.appId && "disableMainPage"}`}>
      <div className="wrapper mainPageContainer">
        <h1>Welcome!</h1>
        <div className="appContainer">
          {apps.map(({ _id, appName, fileUrl, fileName }, i) => (
            <div key={i} className="app">
              <div className="appImage">
                <img src={fileUrl} alt={appName} />
                <i
                  className="fas fa-cog"
                  onClick={(e) => e.target.nextSibling.classList.toggle("show")}
                  onKeyDown={(e) =>
                    e.keyCode === 13 &&
                    e.target.nextSibling.classList.toggle("show")
                  }
                  tabIndex="0"
                ></i>
                <div className={`optionButtons ${!appInfo.appId && "hidden"}`}>
                  <button onClick={() => setAppInfo({ appId: _id, fileName })}>
                    Edit
                  </button>
                  <button onClick={() => onClick(_id, fileName)}>Remove</button>
                </div>
              </div>
              <p>{appName}</p>
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
