import React from "react"
import classNames from "classnames"

import CellPost from "./cell-post"

export default function CellTileRegular({ nodes, index }) {
  if (nodes.length > index) {
    return (
      <div className={classNames("tile", "is-ancestor")}>
        {nodes.length > index && (
          <div className={classNames("tile", "is-parent")}>
            <CellPost
              post={nodes[index]}
              className={classNames("tile", "is-child")}
            />
          </div>
        )}
        {nodes.length > index + 1 && (
          <div className={classNames("tile", "is-parent")}>
            <CellPost
              post={nodes[index + 1]}
              className={classNames("tile", "is-child")}
            />
          </div>
        )}
        {nodes.length > index + 2 && (
          <div className={classNames("tile", "is-parent")}>
            <CellPost
              post={nodes[index + 2]}
              className={classNames("tile", "is-child")}
            />
          </div>
        )}
      </div>
    )
  } else {
    return null
  }
}
