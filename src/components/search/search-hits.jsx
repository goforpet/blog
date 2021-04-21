import React from 'react';
import classnames from 'classnames';
import { connectHits } from 'react-instantsearch-dom';

import SearchHit from './search-hit';

import '../../scss/components/search/_search-result.scss';

function Hits({ hits }) {
  return (
    <div className={classnames('columns', 'is-multiline', 'is-mobile')}>
      {hits.map((hit) => (
        <div
          className={classnames(
            'column',
            'is-one-third-tablet',
            'is-one-quarter-desktop',
            'is-half-mobile',
            'has-text-centered'
          )}
          key={hit.objectID}
        >
          <SearchHit hit={hit} />
        </div>
      ))}
    </div>
  );
}

export default connectHits(Hits);
