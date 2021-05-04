import React from 'react';
import { Link } from 'gatsby';

import '../../scss/components/ui/_categories.scss';

const PostCategories = ({ categories }) => {
  if (categories && categories.length > 0) {
    return (
      <dl className="categories">
        {categories.map((category, index) => {
          return (
            <dd key={index}>
              <Link className="category-name" to={`/categories/${category.slug}`} title={category.name}>
                {category.name}
              </Link>
            </dd>
          );
        })}
      </dl>
    );
  } else {
    return null;
  }
};

export default PostCategories;
