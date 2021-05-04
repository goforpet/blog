import React from 'react';

import Caption from './caption';
import Categories from './categories';

import '../../scss/components/ui/_post-categories.scss';

const PostCategories = ({ categories }) => {
  if (categories && categories.length > 0) {
    return (
      <div className="post-categories">
        <Caption text={categories.length > 1 ? 'Categorie' : 'Categoria'} icon="folder" />
        <Categories categories={categories} />
      </div>
    );
  } else {
    return null;
  }
};

export default PostCategories;
