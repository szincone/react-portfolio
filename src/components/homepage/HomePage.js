import React from 'react';
import '../../css/homepage.css';

export const HomePage = (props) => {
  const emailStyle = {
    fontSize: '1.4rem',
    marginBottom: '.5rem',
  };

  return (
    <div className="homePageWrapper">
      <h1>{props.person.name}</h1>
      <div className="jobDescriptionDiv">
        <i className="fa fa-dribbble" aria-hidden="true" />
        <h4>{props.person.skill}</h4>
        <i className="fa fa-dribbble" aria-hidden="true" />
      </div>
      <div>
        <h4 style={emailStyle}>{props.person.email}</h4>
      </div>
    </div>
  );
};
