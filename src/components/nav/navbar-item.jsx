import React from "react"
import { Link } from "gatsby"
import classNames from "classnames"

import "../../scss/components/nav/_navbar-item.scss"

function NavbarItem({ page, location }) {
  if (page) {
    const slug = "/pages/" + page.slug

    return (
      <Link
        to={slug}
        className={classNames("navbar-item", {
          "is-active": location.pathname.startsWith(slug),
        })}
      >
        {page.title}
      </Link>
    )
  } else {
    return null
  }
}

export default NavbarItem
