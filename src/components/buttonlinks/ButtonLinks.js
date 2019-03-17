import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
// import '../../css/buttonlinks.css';

const styles = (theme) => ({
  button: {
    margin: '0.5rem',
    padding: '0.5rem 2rem',
    fontSize: '2rem',
    background: '#d7263d',
    color: 'white',
    borderRadius: '35px',
    border: '2px solid white',
    zIndex: '1',
    cursor: 'pointer',
  },
  aLink: {
    zIndex: '1',
    color: theme.palette.secondary,
  },
});

function ButtonLinks(props) {
  const { classes } = props;
  return (
    <Grid className="mainLinksDiv">
      <a
        target="_blank"
        href="https://github.com/szincone"
        rel="noopener noreferrer"
        className="tooltip"
      >
        <Button className={classes.button}>
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
        <Button className={classes.button}>
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
        <Button className={classes.button}>
          <i className="fa fa-envelope" aria-hidden="true" />
          <span className="tooltiptext">Mail</span>
        </Button>
      </a>
      <Link to="/about" className="tooltip">
        <Button className={classes.button}>
          <i className="fa fa-user" aria-hidden="true" />
          <span className="tooltiptext">About</span>
        </Button>
      </Link>
    </Grid>
  );
}
ButtonLinks.propTypes = { classes: PropTypes.objectOf(PropTypes.string) };
ButtonLinks.defaultProps = { classes: styles };

export default withStyles(styles)(ButtonLinks);
