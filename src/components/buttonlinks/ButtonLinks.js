import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, withStyles } from '@material-ui/core';
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
});

function ButtonLinks(props) {
  const { classes } = props;
  return (
    <Grid>
      <Link underline="none" href="https://github.com/szincone">
        <Button className={classes.button}>
          <i className="fa fa-github" aria-hidden="true" />
        </Button>
      </Link>
      <Link
        target="_blank"
        underline="none"
        href="https://www.linkedin.com/in/szincone/"
      >
        <Button className={classes.button}>
          <i className="fa fa-linkedin" aria-hidden="true" />
        </Button>
      </Link>
      <Link
        target="_blank"
        underline="none"
        href="mailto:szincone.work@gmail.com"
      >
        <Button className={classes.button}>
          <i className="fa fa-envelope" aria-hidden="true" />
        </Button>
      </Link>
      <Link component={RouterLink} to="/about">
        <Button className={classes.button}>
          <i className="fa fa-user" aria-hidden="true" />
        </Button>
      </Link>
    </Grid>
  );
}
ButtonLinks.propTypes = { classes: PropTypes.objectOf(PropTypes.string) };
ButtonLinks.defaultProps = { classes: styles };

export default withStyles(styles)(ButtonLinks);
