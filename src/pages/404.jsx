import React from "react"
import { Link } from "gatsby"
import classNames from "classnames"

export default function NotFoundPage() {
  return (
    <section className={classNames("hero", "is-halfheight")}>
      <div className="hero-body">
        <div>
          <p className="title">Errore 404</p>
          <p className="subtitle">Pagina Non Trovata</p>
          <div className="content">
            <Link to="/">
              <span className="icon-text">
                <span className="icon">
                  <i className="icon-goforpet-right"></i>
                </span>
                <span>Torna alla Home</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
