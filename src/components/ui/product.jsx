import React from 'react';
import classNames from 'classnames';

import ProductImage from './product-image';

import '../../scss/components/ui/_product.scss';

export default function Product({ product }) {
  if (product && product.name) {
    const { name, excerpt, link } = product;

    return (
      <div className={classNames('product', 'columns', 'is-multiline')}>
        <ProductImage product={product} />
        <div className={classNames('column', 'is-9')}>
          <h4 className="subtitle">
            <a href={link} title={name}>
              {name}
            </a>
          </h4>
          <div dangerouslySetInnerHTML={{ __html: excerpt }} className="content" />
        </div>
        <div className={classNames('column', 'is-12', 'product-action', 'has-text-centered')}>
          <a href={link} title={name} className={classNames('button', 'is-danger', 'is-medium')}>
            <span className="icon">
              <i className="icon-goforpet-right" />
            </span>
            <span>Vedi il prodotto</span>
          </a>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
