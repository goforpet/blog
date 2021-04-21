import React from 'react';
import { connectStateResults, Index, PoweredBy } from 'react-instantsearch-dom';

import SearchHits from './search-hits';

import '../../scss/components/search/_search-result.scss';

const SearchWrapper = connectStateResults(({ searchResults, children }) => {
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

export default function SearchResult({ index }) {
  return (
    <Index indexName={index}>
      <SearchWrapper>
        <SearchHits />
        <PoweredBy className="search-poweredby" />
      </SearchWrapper>
    </Index>
  );
}
