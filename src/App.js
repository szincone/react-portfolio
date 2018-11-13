import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Particle from "./components/particles/Particle";
import { HomePage } from "./components/homepage/HomePage";
import { AboutPage } from "./components/aboutpage/AboutPage";
import { ButtonLinks } from "./components/buttonlinks/ButtonLinks";

import "./css/app.css";

class App extends Component {
  state = {
    person: {
      name: "Sawyer Zincone",
      skill: "Full-Stack Developer",
      email: "szincone.work@gmail.com",
    },
  };

  render() {
    return (
      <div className="app">
        <Router basename={process.env.PUBLIC_URL}>
          <div className="appWidthDiv">
            <Route
              exact
              path="/"
              render={props => (
                <HomePage {...props} person={this.state.person} />
              )}
            />
            <Route
              exact
              path="/"
              render={props => <ButtonLinks {...props} />}
            />
            <Route path="/about" component={AboutPage} />
          </div>
        </Router>
        <Particle />
      </div>
    );
  }
}
export default App;
