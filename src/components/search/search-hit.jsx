import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Highlight, Snippet } from 'react-instantsearch-dom';

import '../../scss/components/search/_search-hit.scss';

export default function SearchHit({ hit }) {
  return (
    <div className="search-hit">
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
  );
}
