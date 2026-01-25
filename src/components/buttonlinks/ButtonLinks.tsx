import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, withStyles } from "@material-ui/core";
import { motion } from "framer-motion";
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
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ display: "inline-block" }}
        >
          <Button className={classes.button}>
            <i className="fa fa-github" aria-hidden="true" />
          </Button>
        </motion.div>
      </Link>
      <Link target="_blank" underline="none" href={urls.linkedin}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ display: "inline-block" }}
        >
          <Button className={classes.button}>
            <i className="fa fa-linkedin" aria-hidden="true" />
          </Button>
        </motion.div>
      </Link>
      <Link target="_blank" underline="none" href={urls.email}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ display: "inline-block" }}
        >
          <Button className={classes.button}>
            <i className="fa fa-envelope" aria-hidden="true" />
          </Button>
        </motion.div>
      </Link>
      <Link component={RouterLink} underline="none" to="/about">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ display: "inline-block" }}
        >
          <Button className={classes.button}>
            <i className="fa fa-user" aria-hidden="true" />
          </Button>
        </motion.div>
      </Link>
    </Grid>
  );
};

export default withStyles(styles)(ButtonLinks);
