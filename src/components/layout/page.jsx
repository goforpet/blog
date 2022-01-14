import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Seo } from "@pittica/gatsby-plugin-seo"

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
      <Seo
        title={page ? page.title : null}
        description={page ? page.subtitle : null}
        path={pathname}
        keywords={keywords}
      />
      <Wrapper>{children}</Wrapper>
    </React.Fragment>
  )
}
