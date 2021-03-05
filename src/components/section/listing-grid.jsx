import React from "react"
import classNames from "classnames"

import CellArticle from "../grid/cell-article"

export default function ListingGrid({ nodes }) {
  return (
    <section className="section">
      <div className="container">
        <div className={classNames("columns", "is-multiline")}>
          {nodes.map(post => {
            return (
              <div
                key={post.id}
                className={classNames("column", "is-one-third")}
              >
                <CellArticle post={post} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
