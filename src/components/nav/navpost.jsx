import React from 'react';
import classNames from 'classnames';

import NavpostItem from './navpost-item';

import '../../scss/components/nav/_navpost.scss';

export const Navpost = ({ next, previous }) => {
  if (next || previous) {
    return (
      <nav className="navpost" role="navigation" aria-label="main navigation">
        <div className={classNames('columns', 'is-vcentered', 'is-gapless')}>
          <div className={classNames('column', 'is-one-half')}>
            <NavpostItem post={previous} icon="left" />
          </div>
          <div className={classNames('column', 'is-one-half')}>
            <NavpostItem post={next} icon="right" />
          </div>
        </div>
      </nav>
    );
  } else {
    return null;
  }
};

export default Navpost;
