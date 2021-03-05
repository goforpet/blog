import React from "react"
import classNames from "classnames"

import PostAuthor from "../ui/post-author"
import PostDate from "../ui/post-date"
import ImageCredits from "../ui/image-credits"

export default function PostCredits({ post, authorImage, coverImage }) {
  if (post) {
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className={classNames("column", "is-one-half")}>
              <PostAuthor page={post} authorImage={authorImage} />
            </div>
            <div className={classNames("column", "is-one-half")}>
              <div className="card">
                <div className="card-content">
                  <PostDate date={post.date} />
                </div>
              </div>
              <ImageCredits image={coverImage} />
            </div>
          </div>
        </div>
      </section>
    )
  } else {
    return null
  }
}
