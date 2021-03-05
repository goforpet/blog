import React, { Component } from "react"
import { Link } from "gatsby"
import classNames from "classnames"

import "../../scss/components/nav/_pagination.scss"

export default class Pagination extends Component {
  render() {
    if (this.props.context.page && this.props.context.count > 1) {
      return (
        <nav
          className={classNames("pagination", "is-centered")}
          role="navigation"
          aria-label="pagination"
        >
          <ul className="pagination-list">{this.paginate()}</ul>
        </nav>
      )
    } else {
      return null
    }
  }

  ellipsis(upper) {
    return (
      <li key={"page-" + (upper ? "ellipsis-upper" : "ellipsis-lower")}>
        <span className="pagination-ellipsis">...</span>
      </li>
    )
  }

  item(context, page) {
    let link = ""

    if (context.group) {
      link += "/" + context.group
    }

    if (context.page.slug) {
      link += "/" + context.page.slug
    }

    if (page > 1) {
      link += "/" + page
    }

    const current = context.current === page

    return (
      <li key={"page-" + page}>
        <Link
          to={link}
          className={classNames("pagination-link", {
            "is-current": current,
          })}
          aria-label={`Pagina ${page}`}
          aria-current={current ? "page" : null}
        >
          {page}
        </Link>
      </li>
    )
  }

  paginate() {
    const context = this.props.context
    const count = Math.ceil(context.count / context.limit)
    const items = []

    if (count > 1) {
      items.push(this.item(context, 1))

      if (context.current > 3) {
        items.push(this.ellipsis(false))
      }
    }

    for (let i = 0; i < count; i++) {
      let page = i + 1

      if (
        page !== 1 &&
        page !== count &&
        page < context.current + 2 &&
        page > context.current - 2
      ) {
        items.push(this.item(context, page))
      }
    }

    if (count > 1) {
      if (context.current < count - 2) {
        items.push(this.ellipsis(true))
      }

      items.push(this.item(context, count))
    }

    return items
  }
}
