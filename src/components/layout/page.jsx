import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { SEO } from "@pittica/gatsby-plugin-seo"

import Wrapper from "../element/wrapper"

export default function PageLayout({
  children,
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

  return (
    <React.Fragment>
      <SEO
        title={
          page
            ? page.seo && page.seo.title
              ? page.seo.title
              : page.title
            : null
        }
        description={
          page
            ? page.seo && page.seo.description
              ? page.seo.description
              : page.subtitle
            : null
        }
        path={pathname}
        keywords={
          page
            ? page.seo && page.seo.keywords
              ? page.seo.keywords
              : keywords
            : keywords
        }
      />
      <Wrapper>{children}</Wrapper>
    </React.Fragment>
  )
}
