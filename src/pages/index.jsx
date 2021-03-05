import React from "react"
import { graphql } from "gatsby"

import MasonryGrid from "../components/section/masonry-grid"
import Cta from "../components/section/cta"

function IndexPage({
  data: {
    site: {
      siteMetadata: { newsletter, shop },
    },
    allGraphCmsPost: { nodes },
  },
}) {
  return (
    <>
      <MasonryGrid nodes={nodes}>
        <Cta url={newsletter} text="Iscriviti">
          <h2 className="title">
            Iscriviti alla nostra newsletter per restare sempre informato!
          </h2>
        </Cta>
      </MasonryGrid>
      <Cta url={shop} text="Vai allo Shop">
        <h2 className="title">
          Visita il nostro shop per vedere la nostra selezione
        </h2>
      </Cta>
    </>
  )
}

export const indexPageQuery = graphql`
  {
    site {
      siteMetadata {
        newsletter
        shop
      }
    }
    allGraphCmsPost(sort: { fields: date, order: DESC }) {
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
                height: 320
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

export default IndexPage
