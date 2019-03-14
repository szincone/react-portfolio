import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { AboutPage, ButtonLinks, HomePage, Particle } from './components';
import './css/app.css';

export default function App() {
  const person = {
    name: 'Sawyer Zincone',
    skill: 'Full-Stack Engineer',
    email: 'szincone.work@gmail.com',
  };
  return (
    <div className="app">
      <Router basename={process.env.PUBLIC_URL}>
        <div className="appWidthDiv">
          <Route
            exact
            path="/"
            render={(props) => <HomePage {...props} person={person} />}
          />
          <Route
            exact
            path="/"
            render={(props) => <ButtonLinks {...props} />}
          />
          <Route path="/about" component={AboutPage} />
        </div>
      </Router>
      <Particle />
    </div>
  );
}
