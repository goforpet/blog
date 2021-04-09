import React, { Component } from "react"
import { Link } from "gatsby"
import classNames from "classnames"

import NavbarStart from "./navbar-start"
import NavbarEnd from "./navbar-end"

import "../../scss/components/nav/_navbar.scss"

export default class Navbar extends Component {
  state = {
    isActive: false,
  }

  handleClick = e => {
    e.preventDefault()
    this.setState(state => ({ isActive: !state.isActive }))

    return false
  }

  render() {
    return (
      <nav
        className={classNames("navbar", "is-fixed-top", "is-light")}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-logo">
              <i className="icon-goforpet-logo"></i>
            </Link>
            <Link
              to="/"
              onClick={this.handleClick}
              role="button"
              className={classNames("navbar-burger", "burger", {
                "is-active": this.state.isActive,
              })}
              aria-label="menu"
              aria-expanded="false"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </Link>
          </div>
          <div
            className={classNames("navbar-menu", {
              "is-active": this.state.isActive,
            })}
          >
            <NavbarStart />
            <NavbarEnd />
          </div>
        </div>
      </nav>
    )
  }
}
