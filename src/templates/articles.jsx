import React from "react"
import { graphql } from "gatsby"

import Pagination from "../components/nav/pagination"
import ListingGrid from "../components/section/listing-grid"
import PageHeader from "../components/section/page-header"

function Articles({
  pageContext,
  data: {
    posts: { nodes },
  },
}) {
  return (
    <div>
      <PageHeader title="Articoli" subtitle={`${pageContext.count} articoli`} />
      <ListingGrid nodes={nodes} />
      <Pagination context={pageContext} />
    </div>
  )
}

export const pageQuery = graphql`
  query BlogArticlesQuery($limit: Int!, $skip: Int!) {
    posts: allGraphCmsPost(
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        date: formattedDate
        excerpt
        slug
        title
        coverImage {
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 640
                height: 440
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
        categories {
          name
          slug
        }
      }
    }
  }
`

export default Articles
