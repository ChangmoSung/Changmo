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

  const onClick = (e, _id, fileName) => {
    e.target.parentNode.classList.toggle("show");

    const answer = window.confirm(
      "Are you sure you want to permanently delete the app?"
    );
    if (answer) {
      removeApps(_id);
      deleteS3Object(fileName);
    }
  };

  const toggleAnimation = (e) =>
    e.currentTarget.lastChild.classList.toggle("animate__rubberBand");

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className={`container mainPage ${appInfo.appId && "disableMainPage"}`}>
      <div className="wrapper mainPageContainer">
        <h1>Welcome!</h1>
        <div className="appContainer">
          {apps.map(({ _id, appName, appUrl, fileUrl, fileName }, i) => (
            <div key={i} className="app">
              <div className="appImage">
                <a
                  href={appUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                  onFocus={(e) => toggleAnimation(e)}
                  onBlur={(e) => toggleAnimation(e)}
                  onMouseEnter={(e) => toggleAnimation(e)}
                  onMouseLeave={(e) => toggleAnimation(e)}
                  onClick={({ currentTarget }) => currentTarget.blur()}
                >
                  <img src={fileUrl} alt={appName} />
                  <span className="animate__animated">Go to the app</span>
                </a>
                <i
                  className="fas fa-cog"
                  onClick={(e) => e.target.nextSibling.classList.toggle("show")}
                  onKeyDown={(e) =>
                    e.keyCode === 13 &&
                    e.target.nextSibling.classList.toggle("show")
                  }
                  tabIndex="0"
                ></i>
                <div className="optionButtons">
                  <button onClick={() => setAppInfo({ appId: _id, fileName })}>
                    Edit
                  </button>
                  <button onClick={(e) => onClick(e, _id, fileName)}>
                    Remove
                  </button>
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
