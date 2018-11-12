import React from "react";
import { Link } from "react-router-dom";

import "../../css/aboutpage.css";

export const AboutPage = () => {
  return (
    <div className="aboutPageDiv">
      <h1>About Me</h1>
      <h4>
        My name is Sawyer Zincone and I am a full-stack developer with a passion
        for meaningful <span style={{ color: "#EE4266" }}>UI design, </span>
        writing clean &{" "}
        <span style={{ color: "#ECC30B" }}>efficient code,</span> and
        <span style={{ color: "#ECC30B" }}> collaboration</span>. I'm mainly
        working in <span style={{ color: "#ECC30B" }}> Javascript</span> or{" "}
        <span style={{ color: "#EE4266" }}> Python</span> and enjoy tackling
        complex problems while turning them into simple, easy-to-understand
        designs.
      </h4>
      <i className="fa fa-dribbble" aria-hidden="true" />
      <h4>
        I am a former math teacher who has a deep love for making things that
        make a difference and help improve people's lives. When I'm not
        programming I enjoy playing guitar, working out, or relaxing with my
        wife and cats.
      </h4>
      <Link to="/">
        <button className="button">
          <i className="fa fa-home" aria-hidden="true" />
        </button>
      </Link>
    </div>
  );
};
