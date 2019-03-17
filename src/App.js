import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Grid, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { AboutPage, ButtonLinks, HomePage, Particle } from './components';

const styles = (theme) => ({
  appContainer: {
    textAlign: 'center',
    margin: '0 auto',
    fontSize: '62.5%',
    fontFamily: '"Oswald", sans-serif',
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
  },
  containerWidth: { maxWidth: '800px' },
});

function App({ classes }) {
  const person = {
    name: 'Sawyer Zincone',
    skill: 'Full-Stack Engineer',
    email: 'szincone.work@gmail.com',
  };
  const urls = {
    github: 'https://github.com/szincone/',
    linkedin: 'https://www.linkedin.com/in/szincone/',
    email: 'mailto:szincone.work@gmail.com',
  };
  return (
    <Grid className={classes.appContainer}>
      <Router>
        <Grid className={classes.containerWidth}>
          <Route
            exact
            path="/"
            render={(props) => <HomePage {...props} person={person} />}
          />
          <Route
            exact
            path="/"
            render={(props) => <ButtonLinks {...props} urls={urls} />}
          />
          <Route path="/about" component={AboutPage} />
        </Grid>
      </Router>
      <Particle />
    </Grid>
  );
}
App.propTypes = { classes: PropTypes.objectOf(PropTypes.string) };
App.defaultProps = { classes: styles };

export default withStyles(styles)(App);
