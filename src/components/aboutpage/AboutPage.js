import React from "react";
import { Link } from "react-router-dom";

import "../../css/aboutpage.css";

export const AboutPage = () => {
  return (
    <div className="aboutPageDiv">
      <h1>About Me</h1>
      <h4>
        My name is Sawyer Zincone and I am a full-stack developer with a passion
        for meaningful UI design, writing clean & efficient code, and
        collaboration. I enjoy tackling complex problems and turning them into
        simple, easy-to-understand designs.
      </h4>
      <i className="fa fa-dribbble" aria-hidden="true" />
      <h4>
        I am a former teacher math teacher who has a deep love for making things
        that make a difference. When I'm not coding I enjoy playing guitar,
        working out, or relaxing with my wife and cats.
      </h4>
      <Link to="/">
        <button className="button">
          <i className="fa fa-home" aria-hidden="true" />
        </button>
      </Link>
    </div>
  );
};
