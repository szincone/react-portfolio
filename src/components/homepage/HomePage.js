import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  homepageWraper: {
    fontSize: '2rem',
    paddingTop: '20vh',
  },
  mainTitle: {
    fontSize: '3rem',
    fontFamily: '"Rubik Mono One", sans-serif',
    wordBreak: 'break-word',
  },
  jobTitleDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  jobTitle: {
    padding: '0.75rem',
    fontWeight: 'bold',
    wordBreak: 'break-word',
  },
  email: {
    fontSize: '1.4rem',
    marginBottom: '.5rem',
    wordBreak: 'break-word',
  },
});
function HomePage({ classes, person }) {
  return (
    <Grid className={classes.homepageWraper}>
      <Typography variant="h2" color="secondary" className={classes.mainTitle}>
        {person.name}
      </Typography>
      <Grid className={classes.jobTitleDiv}>
        <i className="fa fa-dribbble" aria-hidden="true" />
        <Typography variant="h4" color="secondary" className={classes.jobTitle}>
          {person.skill}
        </Typography>
        <i className="fa fa-dribbble" aria-hidden="true" />
      </Grid>
      <Grid>
        <Typography variant="h4" color="secondary" className={classes.email}>
          {person.email}
        </Typography>
      </Grid>
    </Grid>
  );
}
HomePage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  person: PropTypes.objectOf(PropTypes.string),
};
HomePage.defaultProps = {
  classes: styles,
  person: {
    name: 'Sawyer Zincone',
    skill: 'Full-Stack Engineer',
    email: 'szincone.work@gmail.com',
  },
};

export default withStyles(styles)(HomePage);
