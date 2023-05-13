import "./App.scss";

import React, { Fragment } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Footer from "./components/Layout/Footer";
import {
	GoogleReCaptchaProvider
} from "react-google-recaptcha-v3";
import Navbar from "./components/Layout/Navbar";
import Notification from "./components/Layout/Notification";
import { Provider } from "react-redux";
import Routes from "./components/Routing/Routes";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
		<GoogleReCaptchaProvider reCaptchaKey="6LeT8QYmAAAAACJDv1HzFXHK-mtUrzO0r0t0s28z" useEnterprise={true}>
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route component={Routes} />
            </Switch>
            <Footer />
          </Fragment>
        </Router>
        <Notification />
      </GoogleReCaptchaProvider>
    </Provider>
  );
};

export default App;
