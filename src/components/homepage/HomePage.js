import React from "react";
import "../../css/homepage.css";

export const HomePage = props => {
  return (
    <div className="homePageWrapper">
      <h1>{props.person.name}</h1>
      <div className="jobDescriptionDiv">
        <i className="fa fa-dribbble" aria-hidden="true" />
        <h4>{props.person.skill}</h4>
        <i className="fa fa-dribbble" aria-hidden="true" />
      </div>
    </div>
  );
};
