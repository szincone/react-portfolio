import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, withStyles } from "@material-ui/core";
import { ButtonLinksProps, StylesFunction } from "../../types";

const styles: StylesFunction = (theme) => ({
  button: {
    margin: "0.5rem",
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

const ButtonLinks: React.FC<ButtonLinksProps> = (props) => {
  const { classes, urls } = props;
  return (
    <Grid>
      <Link target="_blank" underline="none" href={urls.github}>
        <Button className={classes.button}>
          <i className="fa fa-github" aria-hidden="true" />
        </Button>
      </Link>
      <Link target="_blank" underline="none" href={urls.linkedin}>
        <Button className={classes.button}>
          <i className="fa fa-linkedin" aria-hidden="true" />
        </Button>
      </Link>
      <Link target="_blank" underline="none" href={urls.email}>
        <Button className={classes.button}>
          <i className="fa fa-envelope" aria-hidden="true" />
        </Button>
      </Link>
      <Link component={RouterLink} underline="none" to="/about">
        <Button className={classes.button}>
          <i className="fa fa-user" aria-hidden="true" />
        </Button>
      </Link>
    </Grid>
  );
};

export default withStyles(styles)(ButtonLinks);
