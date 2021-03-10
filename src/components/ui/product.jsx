import React from "react"
import classNames from "classnames"

import "../../scss/components/ui/_product.scss"

export default function Product({ product }) {
  if (product && product.name) {
    const { name, imageData, excerpt, link } = product

    return (
      <div className="product">
        <div className="box">
          <div className="media">
            {imageData && imageData.link && (
              <div className="media-left">
                <a href={link} title={name}>
                  <figure className="product-image">
                    <img
                      src={imageData.link}
                      alt={name}
                      className={classNames("image", "is-128x128")}
                    />
                  </figure>
                </a>
              </div>
            )}
            <div className="media-content">
              <div className="content">
                <h4>
                  <a href={link} title={name}>
                    {name}
                  </a>
                </h4>
                <div dangerouslySetInnerHTML={{ __html: excerpt }} />
                <div className="product-action">
                  <a
                    href={link}
                    title={name}
                    className={classNames("button", "is-danger", "is-medium")}
                  >
                    <span className="icon">
                      <i className="icon-goforpet-right"></i>
                    </span>
                    <span>Vedi il prodotto</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}
