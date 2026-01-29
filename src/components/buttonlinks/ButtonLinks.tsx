import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, withStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import { ButtonLinksProps, StylesFunction } from "../../types";

const styles: StylesFunction = (theme) => ({
  button: {
    margin: "0.6rem",
    padding: "0.9rem 2.2rem",
    fontSize: "1.8rem",
    background: "linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(255, 0, 110, 0.15) 100%)",
    color: theme.palette.secondary.main,
    borderRadius: "60px",
    border: "2px solid rgba(0, 212, 255, 0.4)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 20px rgba(0, 212, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      background: "linear-gradient(135deg, rgba(0, 212, 255, 0.25) 0%, rgba(255, 0, 110, 0.25) 100%)",
      border: "2px solid rgba(0, 212, 255, 0.6)",
      boxShadow: "0 8px 30px rgba(0, 212, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
      transform: "translateY(-2px)",
    },
    "&:active": {
      transform: "translateY(0)",
      boxShadow: "0 4px 15px rgba(0, 212, 255, 0.3)",
    },
    "& i": {
      position: "relative",
      zIndex: 1,
    },
  },
  buttonContainer: {
    marginTop: "2rem",
  },
});

const buttonAnimationProps = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
  style: { display: "inline-block" as const },
};

const ButtonLinks: React.FC<ButtonLinksProps> = (props) => {
  const { classes, urls } = props;
  return (
    <Grid className={classes.buttonContainer}>
      <Link target="_blank" underline="none" href={urls.github}>
        <motion.div {...buttonAnimationProps}>
          <Button className={classes.button}>
            <i className="fa fa-github" aria-hidden="true" />
          </Button>
        </motion.div>
      </Link>
      <Link target="_blank" underline="none" href={urls.linkedin}>
        <motion.div {...buttonAnimationProps}>
          <Button className={classes.button}>
            <i className="fa fa-linkedin" aria-hidden="true" />
          </Button>
        </motion.div>
      </Link>
      <Link target="_blank" underline="none" href={urls.email}>
        <motion.div {...buttonAnimationProps}>
          <Button className={classes.button}>
            <i className="fa fa-envelope" aria-hidden="true" />
          </Button>
        </motion.div>
      </Link>
      <Link component={RouterLink} underline="none" to="/about">
        <motion.div {...buttonAnimationProps}>
          <Button className={classes.button}>
            <i className="fa fa-user" aria-hidden="true" />
          </Button>
        </motion.div>
      </Link>
    </Grid>
  );
};

export default withStyles(styles)(ButtonLinks);
