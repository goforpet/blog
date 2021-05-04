import React from 'react';
import classNames from 'classnames';

export default function ProductImage({ product: { name, imageData, link } }) {
  if (imageData && imageData.link) {
    return (
      <div className={classNames('column', 'is-3')}>
        <a href={link} title={name}>
          <figure className="product-image">
            <img src={imageData.link} alt={name} className={classNames('image', 'is-square')} />
          </figure>
        </a>
      </div>
    );
  } else {
    return null;
  }
}
