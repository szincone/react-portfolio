import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
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
const HomePage: React.FC<HomePageProps> = ({ classes, person }) => {
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
};

export default withStyles(styles)(HomePage);
