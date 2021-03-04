import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utilities/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import RegisterContainer from "./components/auth/RegisterContainer";
import LoginContainer from "./components/auth/LoginContainer";
import DashboardContainer from "./components/dashboard/DashboardContainer";
import PrivateRoute from "./components/auth/PrivateRoute";
import InfoContainer from "./components/info/InfoContainer"

<<<<<<< HEAD
import restaurant_pic from './img/Restaurant_Pic.png'
import map from './img/map.png'

// import "bootstrap/dist/css/bootstrap.min.css";
=======
import HomePage from "./components/HomePage";
import SinglePlace from "./components/SinglePlace";
>>>>>>> 0b2929c8a4f6faf66eb0f789223b58323afb1f80

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={LoginContainer} />
              <Route exact path="/register" component={RegisterContainer} />
<<<<<<< HEAD
              <Route exact path="/info" render={(props) => <InfoContainer restaurant_pic={restaurant_pic} mapInfo={map} />} />
=======
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/single/:id" component={SinglePlace} />

>>>>>>> 0b2929c8a4f6faf66eb0f789223b58323afb1f80
              <PrivateRoute
                exact
                path="/dashboard"
                component={DashboardContainer}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
