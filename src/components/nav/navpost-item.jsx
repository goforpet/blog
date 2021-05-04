import React from 'react';
import { Link } from 'gatsby';
import { getSrc } from 'gatsby-plugin-image';
import classNames from 'classnames';

import '../../scss/components/nav/_navpost-item.scss';

export const NavpostItem = ({ post, icon }) => {
  if (post) {
    return (
      <Link
        to={`/${post.slug}`}
        style={{
          backgroundImage:
            post.coverImage && post.coverImage.localFile ? `url(${getSrc(post.coverImage.localFile)})` : null
        }}
        className="navpost-item"
      >
        <span
          className={classNames({
            'has-background': post.coverImage && post.coverImage.localFile
          })}
        >
          {icon && <i className={`icon-goforpet-${icon}`} />}
          {post.title}
        </span>
      </Link>
    );
  } else {
    return null;
  }
};

export default NavpostItem;
