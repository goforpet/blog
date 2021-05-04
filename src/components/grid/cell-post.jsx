import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';

import PostThumb from '../ui/post-thumb';

import '../../scss/components/grid/_cell-post.scss';

export default function CellPost({ post, className }) {
  return (
    <article
      className={classNames('cell-post', { 'has-excerpt': post.excerpt }, className)}
      itemScope
      itemType="http://schema.org/Article"
    >
      <Link to={`/${post.slug}`}>
        <PostThumb post={post} link={false} />
        <div className="cell-body">
          <span className="title" itemProp="name">
            {post.title}
          </span>
          {post.excerpt && <span className="subtitle">{post.excerpt}</span>}
        </div>
      </Link>
    </article>
  );
}
