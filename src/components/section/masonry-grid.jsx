import React from 'react';
import classNames from 'classnames';

import CellTileFeatured from '../grid/cell-tile-featured';
import CellTileCentral from '../grid/cell-tile-central';
import CellTileRegular from '../grid/cell-tile-regular';

import '../../scss/components/section/_masonry-grid.scss';

export default function MasonryGrid({ nodes, children }) {
  return (
    <section className={classNames('section', 'masonry-grid')}>
      <div className="container">
        <CellTileFeatured nodes={nodes} index={0} />
        <CellTileRegular nodes={nodes} index={2} />
        {children}
        <CellTileCentral nodes={nodes} index={5} />
        <CellTileRegular nodes={nodes} index={8} />
        <CellTileFeatured nodes={nodes} index={11} />
      </div>
    </section>
  );
}
