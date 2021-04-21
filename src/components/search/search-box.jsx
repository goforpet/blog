import React from 'react';
import classnames from 'classnames';
import { connectSearchBox } from 'react-instantsearch-dom';

import '../../scss/components/search/_search-box.scss';

export default connectSearchBox(({ refine, currentRefinement, onFocus }) => {
  return (
    <form className="search-box">
      <div className="field">
        <p className={classnames('control', 'has-icons-left', 'has-icons-right')}>
          <input
            className="input"
            type="text"
            placeholder="Cerca"
            aria-label="search"
            onChange={(e) => refine(e.target.value)}
            onFocus={onFocus}
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === 'escape') {
                refine('');
              }
            }}
            value={currentRefinement}
          />
          <span className={classnames('icon', 'is-small', 'is-left')}>
            <i className="icon-goforpet-search" />
          </span>
          <span
            className={classnames('icon', 'is-small', 'is-right', 'cancel', {
              'is-hidden': currentRefinement.length === 0
            })}
            onClick={() => refine('')}
            onKeyDown={() => refine('')}
            role="button"
            tabIndex={0}
          >
            <i className="icon-goforpet-cancel" />
          </span>
        </p>
      </div>
    </form>
  );
});
