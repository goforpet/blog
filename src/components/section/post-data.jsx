import React from "react"
import classNames from "classnames"

import PostTags from "../ui/post-tags"
import PostCategories from "../ui/post-categories"

export default function PostData({ post }) {
  if (post.categories || post.tags) {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            {post.categories && post.categories.length > 0 && (
              <div className={classNames("column", "is-one-half")}>
                <div className="card">
                  <div className="card-content">
                    <PostCategories categories={post.categories} />
                  </div>
                </div>
              </div>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className={classNames("column", "is-one-half")}>
                <div className="card">
                  <div className="card-content">
                    <PostTags tags={post.tags} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  } else {
    return null
  }
}
