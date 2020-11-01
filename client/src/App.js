import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./components/styles/styles.scss";
import NavBar from "./components/layout/NavBar/index.js";
import LandingPage from "./components/layout/LandingPage/index.js";
import MainPage from "./components/layout/MainPage/index.js";
import AddAppsPage from "./components/layout/AddAppsPage/index.js";

import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Route exact path="/" component={LandingPage} />
        <Switch>
          <Route exact path="/mainPage" component={MainPage} />
          <Route exact path="/addAppsPage" component={AddAppsPage} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
