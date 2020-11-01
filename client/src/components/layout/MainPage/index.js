import React, { useState, useEffect } from "react";
import "./index.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getApps } from "../../../actions/apps";

const MainPage = ({ getApps, apps }) => {
  useEffect(() => {
    getApps();
  }, [getApps]);

  return (
    <div className="container mainPage">
      <div className=" wrapper mainPageContainer">
        <h1>Welcome!</h1>
        <div className="appContainer">
          {apps.map(({ appName, fileUrl }, i) => (
            <div key={i} className="appImage">
              <img src={fileUrl} alt={appName} />
              <p>{appName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

MainPage.propTypes = {
  getApps: PropTypes.func.isRequired,
  apps: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  apps: state.apps.apps,
});

export default connect(mapStateToProps, { getApps })(MainPage);
