import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

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
    color: theme.palette.secondary.main,
    borderRadius: '35px',
    border: `2px solid ${theme.palette.secondary.main}`,
    zIndex: '1',
    cursor: 'pointer',
  },
  linkDec: { textDecoration: 'none' },
});

function AboutPage({ classes }) {
  return (
    <Grid className={classes.aboutPageDiv}>
      <Typography variant="h1" className={classes.mainTitle} color="secondary">
        About Me
      </Typography>
      <Typography variant="h5" color="secondary">
        My name is Sawyer Zincone and I&apos;m a Full-Stack Engineer with a
        passion for writing
        <span style={{ color: '#EE4266' }}> clean</span>-
        <span style={{ color: '#ECC30B' }}>efficient</span> code and
        <span style={{ color: '#ECC30B' }}> collaboration</span>. Lifelong
        learner with an insatiable{' '}
        <span style={{ color: '#EE4266' }}>curiosity</span> for new{' '}
        technologies/languages and is able to{' '}
        <span style={{ color: '#ECC30B' }}>implement</span> these ideas or break
        them down into simple, easy-to-understand designs.
      </Typography>
      <i
        className="fa fa-dribbble"
        style={{ fontSize: '1.6rem', margin: '.5rem auto' }}
        aria-hidden="true"
      />
      <Typography variant="h5" color="secondary">
        When I&apos;m not <span style={{ color: '#ECC30B' }}>programming</span>{' '}
        I&apos;m usually playing guitar, working-out, or relaxing with my wife
        and cats.
      </Typography>
      <Link
        component={RouterLink}
        to="/"
        underline="none"
        className={classes.linkDec}
      >
        <Button className={classes.homeLinkButton} type="submit">
          <i className="fa fa-home" aria-hidden="true" />
        </Button>
      </Link>
    </Grid>
  );
}
AboutPage.propTypes = { classes: PropTypes.objectOf(PropTypes.string) };
AboutPage.defaultProps = { classes: styles };

export default withStyles(styles)(AboutPage);
