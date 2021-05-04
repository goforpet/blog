import React from 'react';
import classNames from 'classnames';
import { getSrc } from 'gatsby-plugin-image';

import '../../scss/components/section/_post-header.scss';

export default function PostHeader({ title, image }) {
  return (
    <header
      className="post-header"
      style={{
        backgroundImage: image && image.localFile ? `url(${getSrc(image.localFile)})` : null
      }}
    >
      <div className="container">
        <div className={classNames('columns', 'is-vcentered')}>
          <div className={classNames('column', 'is-two-third')}>
            <h1 className="title">{title}</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
