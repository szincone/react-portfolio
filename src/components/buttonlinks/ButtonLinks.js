import React from "react";
import { Link } from "react-router-dom";

import "../../css/buttonlinks.css";

export const ButtonLinks = props => {
  return (
    <div className="mainLinksDiv">
      <a
        target="_blank"
        href="https://github.com/szincone"
        rel="noopener noreferrer"
      >
        <button className="button">
          <i className="fa fa-github" aria-hidden="true" />
        </button>
      </a>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/szincone/"
        rel="noopener noreferrer"
      >
        <button className="button">
          <i className="fa fa-linkedin" aria-hidden="true" />
        </button>
      </a>
      <a
        target="_blank"
        href="mailto:szincone.work@gmail.com"
        rel="noopener noreferrer"
      >
        <button className="button">
          <i className="fa fa-envelope" aria-hidden="true" />
        </button>
      </a>
      <Link to="/about">
        <button className="button aboutMeButton">
          <i className="fa fa-user" aria-hidden="true" />
        </button>
      </Link>
    </div>
  );
};
