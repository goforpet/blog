import React from 'react';

import Categories from './categories';

import '../../scss/components/ui/_grid-categories.scss';

const GridCategories = ({ categories }) => {
  if (categories && categories.length > 0) {
    return (
      <div className="grid-categories">
        <span className="icon-text">
          <span className="icon">
            <i className="icon-goforpet-folder" />
          </span>
          <span className="list">
            <Categories categories={categories} />
          </span>
        </span>
      </div>
    );
  } else {
    return null;
  }
};

export default GridCategories;
