import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
// import '../../css/buttonlinks.css';

const styles = (theme) => ({
  aboutPageDiv: {
    padding: '1rem',
    paddingTop: '5rem',
    zIndex: '1',
    position: 'relative',
  },
  mainTitle: {
    fontFamily: '"Rubik Mono One", sans-serif',
    fontSize: '2.2rem',
    marginBottom: '.8rem',
  },
  homeLinkButton: {
    margin: '1.5rem 0.5rem',
    padding: '0.5rem 2rem',
    fontSize: '2rem',
    background: theme.palette.primary.accent,
    color: 'white',
    borderRadius: '35px',
    border: '2px solid white',
    zIndex: '1',
    cursor: 'pointer',
  },
  linkDec: { textDecoration: 'none' },
});

function ButtonLinks(props) {
  return (
    <Grid className="mainLinksDiv">
      <a
        target="_blank"
        href="https://github.com/szincone"
        rel="noopener noreferrer"
        className="tooltip"
      >
        <Button className="button">
          <i className="fa fa-github" aria-hidden="true" />
          <span className="tooltiptext">GitHub</span>
        </Button>
      </a>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/szincone/"
        rel="noopener noreferrer"
        className="tooltip"
      >
        <Button className="button">
          <i className="fa fa-linkedin" aria-hidden="true" />
          <span className="tooltiptext">LinkedIn</span>
        </Button>
      </a>
      <a
        target="_blank"
        href="mailto:szincone.work@gmail.com"
        rel="noopener noreferrer"
        className="tooltip"
      >
        <Button className="button">
          <i className="fa fa-envelope" aria-hidden="true" />
          <span className="tooltiptext">Mail</span>
        </Button>
      </a>
      <Link to="/about" className="tooltip">
        <Button className="button aboutMeButton">
          <i className="fa fa-user" aria-hidden="true" />
          <span className="tooltiptext">About</span>
        </Button>
      </Link>
    </Grid>
  );
}

export default withStyles(styles)(ButtonLinks);
