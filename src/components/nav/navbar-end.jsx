import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { useLocation } from "@reach/router"

import NavbarItem from "./navbar-item"

export default function NavbarStart() {
  const location = useLocation()
  const {
    site: {
      siteMetadata: { shop },
    },
    pages,
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          shop
        }
      }
      pages: allGraphCmsPage(filter: { menu: { eq: true } }) {
        nodes {
          id
          slug
          title
        }
      }
    }
  `)

  return (
    <div className="navbar-end">
      <Link to="/articles" className="navbar-item">
        Articoli
      </Link>
      {pages.nodes.map((page, index) => {
        return <NavbarItem key={index} page={page} location={location} />
      })}
      <a href={shop} className="navbar-item">
        Shop
      </a>
    </div>
  )
}
