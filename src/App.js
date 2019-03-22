import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//store
import { Provider } from "react-redux";
import store from "./store";

// components
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import AddClient from "./components/client/AddClient";
import ClientProfile from "./components/client/ClientProfile";
import EditClient from "./components/client/EditClient";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/client/add" component={AddClient} />
                <Route exact path="/client/:id" component={ClientProfile} />
                <Route exact path="/client/edit/:id" component={EditClient} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
