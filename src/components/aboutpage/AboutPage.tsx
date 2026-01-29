import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, Typography, withStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import { AboutPageProps, StylesFunction } from "../../types";

const styles: StylesFunction = (theme) => ({
  aboutPageDiv: {
    padding: "1rem",
    paddingTop: "5rem",
    zIndex: "1",
    position: "relative",
  },
  mainTitle: {
    fontFamily: '"Rubik Mono One", sans-serif',
    fontSize: "2.2rem",
    marginBottom: ".8rem",
  },
  homeLinkButton: {
    margin: "1.5rem 0.5rem",
    padding: "0.5rem 2rem",
    fontSize: "2rem",
    background: (theme.palette.primary as any).accent,
    color: theme.palette.secondary.main,
    borderRadius: "35px",
    border: `2px solid ${theme.palette.secondary.main}`,
    zIndex: "1",
    cursor: "pointer",
  },
});

const pageVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    x: 100,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

const AboutPage: React.FC<AboutPageProps> = ({ classes }) => {
  return (
    <Grid 
      className={classes.aboutPageDiv}
      component={motion.div}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
    >
      <Typography variant="h1" className={classes.mainTitle} color="secondary">
        About Me
      </Typography>
      <Typography variant="h5" color="secondary">
        I'm Sawyer Zincone, a Full-Stack Engineer fueled by a passion for
        crafting
        <span style={{ color: "#EE4266" }}> clean</span>,
        <span style={{ color: "#ECC30B" }}> efficient</span> code and fostering
        <span style={{ color: "#ECC30B" }}> collaboration</span>. Lifelong
        learner adept at translating
        <span style={{ color: "#EE4266" }}> complex</span> ideas into simple,
        easy-to-understand designs.
      </Typography>
      <i
        className="fa fa-dribbble"
        style={{ fontSize: "1.6rem", margin: ".5rem auto" }}
        aria-hidden="true"
      />
      <Typography variant="h5" color="secondary">
        When I&apos;m not <span style={{ color: "#ECC30B" }}>programming</span>{" "}
        I&apos;m usually playing guitar, working-out, or relaxing with my wife
        and cats.
      </Typography>
      <Link component={RouterLink} to="/" underline="none">
        <Button className={classes.homeLinkButton} type="submit">
          <i className="fa fa-home" aria-hidden="true" />
        </Button>
      </Link>
    </Grid>
  );
};

export default withStyles(styles)(AboutPage);
