import React from "react"

import Caption from "./caption"

import "../../scss/components/ui/_post-tags.scss"

const PostTags = ({ tags }) => {
  if (tags && tags.length > 0) {
    return (
      <div className="post-tags">
        <Caption text="Tag" icon="tags" />
        <dl>
          {tags.map((tag, index) => {
            return (
              <dd key={index}>
                <span className="tag-name" title={tag}>
                  {tag}
                </span>
              </dd>
            )
          })}
        </dl>
      </div>
    )
  } else {
    return null
  }
}

export default PostTags
