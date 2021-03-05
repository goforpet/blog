import React from "react"
import { graphql } from "gatsby"

import Pagination from "../components/nav/pagination"
import ListingGrid from "../components/section/listing-grid"
import PageHeader from "../components/section/page-header"

function Listing({
  pageContext,
  data: {
    posts: { nodes },
  },
}) {
  return (
    <div>
      <PageHeader
        title={pageContext.page.name}
        subtitle={`${pageContext.count} articoli`}
      />
      <ListingGrid nodes={nodes} />
      <Pagination context={pageContext} />
    </div>
  )
}

export const pageQuery = graphql`
  query BlogCategoryQuery($id: String!, $limit: Int!, $skip: Int!) {
    posts: allGraphCmsPost(
      filter: { categories: { elemMatch: { id: { eq: $id } } } }
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

export default Listing
