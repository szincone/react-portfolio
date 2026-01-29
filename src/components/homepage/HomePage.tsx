import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import { HomePageProps, StylesFunction } from "../../types";

const styles: StylesFunction = (theme) => ({
  homepageWraper: {
    fontSize: "2rem",
    paddingTop: "15vh",
    position: "relative",
  },
  mainTitle: {
    fontSize: "4rem",
    fontFamily: (theme.typography as any).headerFamily,
    fontWeight: 800,
    wordBreak: "break-word",
    background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "1rem",
  },
  jobTitleDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2rem",
  },
  jobTitle: {
    padding: "0.75rem 1.5rem",
    fontWeight: 600,
    wordBreak: "break-word",
    background: "linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(255, 0, 110, 0.1) 100%)",
    borderRadius: "50px",
    border: "2px solid rgba(0, 212, 255, 0.3)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0, 212, 255, 0.2)",
  },
  divider: {
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)",
    margin: "0 1rem",
    boxShadow: "0 0 12px rgba(0, 212, 255, 0.6)",
  },
  email: {
    fontSize: "1.3rem",
    marginTop: "1.5rem",
    wordBreak: "break-word",
    color: "#e0e0e0",
    fontWeight: 300,
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
        <div className={classes.divider} />
        <Typography variant="h4" color="secondary" className={classes.jobTitle}>
          {person.skill}
        </Typography>
        <div className={classes.divider} />
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
