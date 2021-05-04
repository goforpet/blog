import React from 'react';
import classNames from 'classnames';

import CellPost from './cell-post';

export default function CellTileFeatured({ nodes, index }) {
  if (nodes.length > index) {
    return (
      <div className={classNames('tile', 'is-ancestor')}>
        {nodes.length > index && (
          <div className={classNames('tile', 'is-parent', 'is-8')}>
            <CellPost post={nodes[index]} className={classNames('tile', 'is-child')} />
          </div>
        )}
        {nodes.length > index + 1 && (
          <div className={classNames('tile', 'is-vertical', 'is-4')}>
            <div className={classNames('tile')}>
              <div className={classNames('tile', 'is-parent')}>
                <CellPost post={nodes[index + 1]} className={classNames('tile', 'is-child')} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
}
