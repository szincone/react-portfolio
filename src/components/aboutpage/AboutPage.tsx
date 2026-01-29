import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, Typography, withStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import { AboutPageProps, StylesFunction } from "../../types";

const styles: StylesFunction = (theme) => ({
  aboutPageDiv: {
    padding: "2rem",
    paddingTop: "5rem",
    zIndex: "1",
    position: "relative",
    maxWidth: "900px",
    margin: "0 auto",
  },
  mainTitle: {
    fontFamily: (theme.typography as any).headerFamily,
    fontSize: "3.5rem",
    fontWeight: 800,
    marginBottom: "2rem",
    background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textShadow: "0 4px 20px rgba(0, 212, 255, 0.3)",
  },
  contentText: {
    fontSize: "1.25rem",
    lineHeight: 1.8,
    marginBottom: "2rem",
    color: "#e0e0e0",
    fontWeight: 300,
  },
  highlight: {
    color: "#00d4ff",
    fontWeight: 500,
    textShadow: "0 0 10px rgba(0, 212, 255, 0.3)",
  },
  highlightPink: {
    color: "#ff006e",
    fontWeight: 500,
    textShadow: "0 0 10px rgba(255, 0, 110, 0.3)",
  },
  divider: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)",
    margin: "2rem auto",
    boxShadow: "0 0 20px rgba(0, 212, 255, 0.6)",
  },
  homeLinkButton: {
    marginTop: "3rem",
    padding: "0.9rem 2.2rem",
    fontSize: "1.8rem",
    background: "linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(255, 0, 110, 0.15) 100%)",
    color: theme.palette.secondary.main,
    borderRadius: "60px",
    border: "2px solid rgba(0, 212, 255, 0.4)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 20px rgba(0, 212, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      background: "linear-gradient(135deg, rgba(0, 212, 255, 0.25) 0%, rgba(255, 0, 110, 0.25) 100%)",
      border: "2px solid rgba(0, 212, 255, 0.6)",
      boxShadow: "0 8px 30px rgba(0, 212, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
      transform: "translateY(-2px)",
    },
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
      <Typography variant="h5" className={classes.contentText} color="secondary">
        I'm Sawyer Zincone, a Full-Stack Engineer fueled by a passion for
        crafting
        <span className={classes.highlightPink}> clean</span>,
        <span className={classes.highlight}> efficient</span> code and fostering
        <span className={classes.highlight}> collaboration</span>. Lifelong
        learner adept at translating
        <span className={classes.highlightPink}> complex</span> ideas into simple,
        easy-to-understand designs.
      </Typography>
      <div className={classes.divider} />
      <Typography variant="h5" className={classes.contentText} color="secondary">
        When I&apos;m not <span className={classes.highlight}>programming</span>{" "}
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
