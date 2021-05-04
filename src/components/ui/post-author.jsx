import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import classNames from 'classnames';

import '../../scss/components/ui/_post-author.scss';

export default function PostAuthor({ page, authorImage }) {
  if (page && page.author) {
    return (
      <div className={classNames('card', 'post-author')}>
        <div className="card-content">
          <div className="media">
            {authorImage &&
            authorImage.localFile && (
              <div className="media-left">
                <GatsbyImage
                  image={getImage(authorImage.localFile)}
                  className={classNames('image', 'is-48x48')}
                  alt={page.author.name}
                  width="48"
                  height="48"
                />
              </div>
            )}
            {page.author && (
              <div className="media-content">
                <h5>A cura di</h5>
                <p className={classNames('title', 'is-5')}>{page.author.name}</p>
                <p className={classNames('subtitle', 'is-6')}>{page.author.title}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
