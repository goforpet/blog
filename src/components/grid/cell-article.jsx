import React from "react"
import { Link } from "gatsby"

import GridDate from "../ui/grid-date"
import GridCategories from "../ui/grid-categories"
import PostThumb from "../ui/post-thumb"

import "../../scss/components/grid/_cell-article.scss"

export default function CellArticle({ post }) {
  return (
    <article
      className="cell-article"
      itemScope
      itemType="http://schema.org/Article"
    >
      <Link to={`/${post.slug}`}>
        <PostThumb post={post} />
      </Link>
      <div className="post-body">
        <h2 className="title">
          <Link to={`/${post.slug}`} itemProp="name">
            {post.title}
          </Link>
        </h2>
        <GridDate date={post.date} />
        <GridCategories categories={post.categories} />
        <div>
          {post.excerpt && <div className="excerpt">{post.excerpt}</div>}
        </div>
        <div className="post-link">
          <Link to={`/${post.slug}`} aria-label={`Leggi "${post.title}"`}>
            <i className="icon-goforpet-plus"></i> Leggi
          </Link>
        </div>
      </div>
    </article>
  )
}
