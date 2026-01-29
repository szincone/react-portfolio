import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import { HomePageProps, StylesFunction } from "../../types";

const styles: StylesFunction = (theme) => ({
  homepageWraper: {
    fontSize: "2rem",
    paddingTop: "20vh",
  },
  mainTitle: {
    fontSize: "3rem",
    fontFamily: (theme.typography as any).headerFamily,
    wordBreak: "break-word",
  },
  jobTitleDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  jobTitle: {
    padding: "0.75rem",
    fontWeight: "bold",
    wordBreak: "break-word",
  },
  email: {
    fontSize: "1.4rem",
    marginBottom: ".5rem",
    wordBreak: "break-word",
  },
});
const pageVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    x: -100,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

const HomePage: React.FC<HomePageProps> = ({ classes, person }) => {
  return (
    <Grid 
      className={classes.homepageWraper}
      component={motion.div}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
    >
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
};

export default withStyles(styles)(HomePage);
