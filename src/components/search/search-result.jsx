import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import classnames from 'classnames';
import { connectStateResults, Highlight, connectHits, Index, Snippet, PoweredBy } from 'react-instantsearch-dom';

import '../../scss/components/search/_search-result.scss';

const HitCount = connectStateResults(({ searchResults, children }) => {
  const hitCount = searchResults && searchResults.nbHits;

  return hitCount > 0 ? (
    <div className="search-result">
      <div className="hit-count">
        <h2 className="title">
          {hitCount} risultat{hitCount !== 1 ? `i` : `o`}
        </h2>
      </div>
      {children}
    </div>
  ) : null;
});

const PageHit = ({ hit }) => {
  return (
    <div
      className={classnames(
        'column',
        'is-one-third-tablet',
        'is-one-quarter-desktop',
        'is-half-mobile',
        'has-text-centered'
      )}
    >
      <div className="hit">
        {hit.image && (
          <Link to={`/${hit.slug}`} className="hit-thumb">
            <GatsbyImage image={getImage(hit.image)} alt={hit.title} width="320" height="320" />
          </Link>
        )}
        <Link to={`/${hit.slug}`} className="hit-snippet">
          <h4 className="title">
            <Highlight attribute="title" hit={hit} tagName="mark" />
          </h4>
          <Snippet attribute="excerpt" hit={hit} tagName="mark" />
        </Link>
      </div>
    </div>
  );
};

const Hits = ({ hits }) => {
  return (
    <div className={classnames('columns', 'is-multiline', 'is-mobile')}>
      {hits.map((hit) => <PageHit hit={hit} key={hit.objectID} />)}
    </div>
  );
};

const HitsConnector = connectHits(Hits);

const SearchResult = ({ index }) => (
  <Index indexName={index}>
    <HitCount>
      <HitsConnector />
      <PoweredBy className="search-poweredby" />
    </HitCount>
  </Index>
);

export default SearchResult;
