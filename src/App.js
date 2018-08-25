import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Particle from "./components/particles/Particle";
import { HomePage } from "./components/homepage/HomePage";
import { AboutPage } from "./components/aboutpage/AboutPage";
import { ButtonLinks } from "./components/buttonlinks/ButtonLinks";
import "./css/app.css";

class App extends Component {
  render() {
    return (
      <div className="app" style={{ minHeight: "100vh" }}>
        <Router basename={process.env.PUBLIC_URL}>
          <div className="appWidthDiv">
            <Route exact path="/" component={HomePage} />
            <Route exact path="/" component={ButtonLinks} />
            <Route path="/about" component={AboutPage} />
          </div>
        </Router>
        <Particle />
      </div>
    );
  }
}
export default App;
