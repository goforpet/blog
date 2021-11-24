import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import classnames from "classnames"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch } from "react-instantsearch-dom"

import SearchBox from "../search/search-box"
import SearchResult from "../search/search-result"
import NavbarStart from "./navbar-start"

import "../../scss/components/nav/_navbar.scss"

export default function Navbar() {
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)
  const [query, setQuery] = useState()
  const [hasFocus, setFocus] = useState(false)
  const {
    sitePlugin: {
      pluginOptions: { indexName, appId, apiSearchKey },
    },
  } = useStaticQuery(
    graphql`
      query {
        sitePlugin(name: { eq: "gatsby-plugin-algolia" }) {
          pluginOptions {
            indexName
            appId
            apiSearchKey
          }
        }
      }
    `
  )
  const algoliaClient = algoliasearch(appId, apiSearchKey)
  const searchClient = {
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            processingTimeMS: 0,
          })),
        })
      }

      return algoliaClient.search(requests)
    },
  }

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      <nav
        className={classnames("navbar", "is-fixed-top", "is-light")}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-logo">
              <i className="icon-goforpet-logo" />
            </Link>
            <Link
              to="/"
              onClick={e => {
                e.preventDefault()
                setMenu(false)
                setSearch(!search)

                return false
              }}
              role="button"
              className={classnames("navbar-burger", {
                "is-active": search,
              })}
              aria-label="menu"
              aria-expanded="false"
            >
              <i className="icon-goforpet-search" />
            </Link>
            <Link
              to="/"
              onClick={e => {
                e.preventDefault()
                setMenu(!menu)
                setSearch(false)

                return false
              }}
              role="button"
              className={classnames("navbar-burger", "burger", {
                "is-active": menu,
              })}
              aria-label="menu"
              aria-expanded="false"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </Link>
          </div>
          <div
            className={classnames("navbar-menu", {
              "is-active": menu,
            })}
          >
            <NavbarStart />
          </div>
          <div
            className={classnames("navbar-menu", {
              "is-active": search,
            })}
          >
            <div className="navbar-end">
              <div className="navbar-item">
                <SearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <SearchResult
        show={query && query.length > 0 && hasFocus}
        index={indexName}
      />
    </InstantSearch>
  )
}
