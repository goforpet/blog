import React from "react"
import classNames from "classnames"

import "../../scss/components/section/_cta.scss"

export default function Cta({ url, text, children }) {
  return (
    <section className={classNames("section", "cta")}>
      <section className="hero">
        <div className="hero-body">
          <div className="content">{children}</div>
          <div className="content">
            <a
              href={url}
              className={classNames("button", "is-link", "is-large")}
              title={text}
            >
              <span className="icon">
                <i className="icon-goforpet-right"></i>
              </span>
              {text}
            </a>
          </div>
        </div>
      </section>
    </section>
  )
}
