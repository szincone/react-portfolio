import React from "react";
import { Route, BrowserRouter as Router, Switch, useLocation } from "react-router-dom";
import { Grid, withStyles } from "@material-ui/core";
import { AnimatePresence } from "framer-motion";
import { AboutPage, ButtonLinks, HomePage, Particle } from "./components";
import { AppProps, RoutesProps, StylesFunction, Person, Urls } from "./types";

const styles: StylesFunction = (theme) => ({
  appContainer: {
    textAlign: "center",
    margin: "0 auto",
    fontSize: "62.5%",
    fontFamily: '"Oswald", sans-serif',
    background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    padding: theme.spacing(2),
  },
  containerWidth: {
    maxWidth: "800px",
    width: "100%",
    padding: theme.spacing(2),
  },
});

const Routes: React.FC<RoutesProps> = ({ person, urls, classes }) => {
  const location = useLocation();
  return (
    <Grid className={classes.containerWidth}>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/">
            <>
              <HomePage person={person} />
              <ButtonLinks urls={urls} />
            </>
          </Route>
          <Route path="/about" component={AboutPage} />
        </Switch>
      </AnimatePresence>
    </Grid>
  );
};

const App: React.FC<AppProps> = ({ classes }) => {
  const person: Person = {
    name: "Sawyer Zincone",
    skill: "Full-Stack Engineer",
    email: "sawyerzincone@gmail.com",
  };
  const urls: Urls = {
    github: "https://github.com/szincone/",
    linkedin: "https://www.linkedin.com/in/szincone/",
    email: "mailto:sawyerzincone@gmail.com",
  };
  return (
    <Grid className={classes.appContainer}>
      <Router>
        <Routes person={person} urls={urls} classes={classes} />
      </Router>
      <Particle />
    </Grid>
  );
};

export default withStyles(styles)(App);
