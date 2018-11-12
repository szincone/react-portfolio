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
        className="tooltip"
      >
        <button className="button">
          <i className="fa fa-github" aria-hidden="true" />
          <span className="tooltiptext">GitHub</span>
        </button>
      </a>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/szincone/"
        rel="noopener noreferrer"
        className="tooltip"
      >
        <button className="button">
          <i className="fa fa-linkedin" aria-hidden="true" />
          <span className="tooltiptext">LinkedIn</span>
        </button>
      </a>
      <a
        target="_blank"
        href="mailto:szincone.work@gmail.com"
        rel="noopener noreferrer"
        className="tooltip"
      >
        <button className="button">
          <i className="fa fa-envelope" aria-hidden="true" />
          <span className="tooltiptext">Mail</span>
        </button>
      </a>
      <Link to="/about" className="tooltip">
        <button className="button aboutMeButton">
          <i className="fa fa-user" aria-hidden="true" />
          <span className="tooltiptext">About</span>
        </button>
      </Link>
    </div>
  );
};
