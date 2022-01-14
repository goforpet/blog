import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { getSrc } from "gatsby-plugin-image"
import { Seo } from "@pittica/gatsby-plugin-seo"

import Wrapper from "../element/wrapper"

export default function PostLayout({
  children,
  data: { coverImage },
  pageContext: { page },
  location: { pathname },
}) {
  const {
    site: {
      siteMetadata: { keywords },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          keywords
        }
      }
    }
  `)
  const image =
    coverImage && coverImage.localFile ? getSrc(coverImage.localFile) : null

  return (
    <React.Fragment>
      <Seo
        postData={page}
        image={image}
        isBlogPost={true}
        title={page.title}
        description={page.excerpt}
        path={pathname}
        keywords={keywords}
        author={page.author ? page.author.name : null}
      />
      <Wrapper>{children}</Wrapper>
    </React.Fragment>
  )
}
