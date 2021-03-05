import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import "../../scss/components/ui/_post-thumb.scss"

export default function PostThumb({ post }) {
  if (post.coverImage && post.coverImage.localFile) {
    const image = getImage(post.coverImage.localFile)

    return <GatsbyImage image={image} alt={post.title} className="post-thumb" width="640" height="440" />
  } else {
    return null
  }
}
