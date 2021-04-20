import React, { useState } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import classnames from 'classnames';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import SearchBox from '../search/search-box';
import SearchResult from '../search/search-result';

import NavbarStart from './navbar-start';

import '../../scss/components/nav/_navbar.scss';

export default function Navbar() {
  const [ isActive, setActive ] = useState(false);
  const [ query, setQuery ] = useState();
  const [ hasFocus, setFocus ] = useState(false);
  const { sitePlugin: { pluginOptions: { indexName, appId, apiSearchKey } } } = useStaticQuery(
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
  );
  const algoliaClient = algoliasearch(appId, apiSearchKey);

  const searchClient = {
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            processingTimeMS: 0
          }))
        });
      }

      return algoliaClient.search(requests);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setActive(!isActive);

    return false;
  };

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      <nav className={classnames('navbar', 'is-fixed-top', 'is-light')} role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-logo">
              <i className="icon-goforpet-logo" />
            </Link>
            <Link
              to="/"
              onClick={handleClick}
              role="button"
              className={classnames('navbar-burger', 'burger', {
                'is-active': isActive
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
            className={classnames('navbar-menu', {
              'is-active': isActive
            })}
          >
            <NavbarStart />
            <div className="navbar-end">
              <div className="navbar-item">
                <SearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <SearchResult show={query && query.length > 0 && hasFocus} index={indexName} />
    </InstantSearch>
  );
}
