import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/aboutpage.css';

export const AboutPage = () => {
  return (
    <div className="aboutPageDiv">
      <h1>About Me</h1>
      <h4>
        My name is Sawyer Zincone and I'm a Full-Stack Engineer with a passion
        for writing<span style={{ color: '#EE4266' }}> clean </span>&{' '}
        <span style={{ color: '#ECC30B' }}>efficient code,</span> and
        <span style={{ color: '#ECC30B' }}> collaboration</span>. Lifelong
        learner with an insatiable{' '}
        <span style={{ color: '#EE4266' }}>curiosity</span> for new
        technologies/languages and is able to{' '}
        <span style={{ color: '#ECC30B' }}>implement</span> these ideas or break
        them down into simple, easy-to-understand designs.
      </h4>
      <i className="fa fa-dribbble" aria-hidden="true" />
      <h4>
        When I'm not <span style={{ color: '#ECC30B' }}>programming</span> I'm
        usually playing guitar, working-out, or relaxing with my wife and cats.
      </h4>
      <Link to="/">
        <button className="button">
          <i className="fa fa-home" aria-hidden="true" />
        </button>
      </Link>
    </div>
  );
};
