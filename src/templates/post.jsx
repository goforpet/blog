import React from "react"
import { graphql } from "gatsby"
import classNames from "classnames"

import PostHeader from "../components/section/post-header"
import PostData from "../components/section/post-data"
import PostCredits from "../components/section/post-credits"
import BodyContent from "../components/section/body-content"
import Navpost from "../components/nav/navpost"
import Product from "../components/ui/product"
import Share from "../components/ui/share"

import "../scss/templates/_post.scss"

function Post({
  data: { authorImage, coverImage, product, next, previous },
  pageContext: { page },
}) {
  return (
    <div className="post">
      <article itemScope itemType="http://schema.org/Article">
        <PostHeader title={page.title} image={coverImage} />
        <PostData post={page} />
        <BodyContent>{page.content.markdownNode.childMdx.body}</BodyContent>
        {product && (
          <section className={classNames("section", "section-product")}>
            <div className="container">
              <h3 className="title">Per questo argomento ti consigliamo</h3>
              <Product product={product} />
            </div>
          </section>
        )}
        <PostCredits
          post={page}
          authorImage={authorImage}
          coverImage={coverImage}
        />
      </article>
      <Navpost next={next} previous={previous} />
      <Share />
    </div>
  )
}

export const pageQuery = graphql`
  fragment AssetFields on GraphCMS_Asset {
    id
    credits {
      html
      markdown
      raw
      text
    }
  }

  fragment PostFields on GraphCMS_Post {
    id
    title
    slug
    coverImage {
      ...AssetFields
      localFile {
        childImageSharp {
          gatsbyImageData(
            width: 640
            height: 360
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }

  fragment PrestashopProduct on PrestashopProduct {
    id
    productId
    name
    excerpt
    link
    imageData {
      link
    }
  }

  query BlogPostQuery(
    $id: String!
    $productId: Int
    $nextId: String
    $previousId: String
  ) {
    authorImage: graphCmsAsset(
      authorAvatar: {
        elemMatch: { posts: { elemMatch: { id: { in: [$id] } } } }
      }
    ) {
      ...AssetFields
      localFile {
        childImageSharp {
          gatsbyImageData(
            width: 48
            height: 48
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
    coverImage: graphCmsAsset(
      coverImagePost: { elemMatch: { id: { eq: $id } } }
    ) {
      ...AssetFields
      localFile {
        childImageSharp {
          gatsbyImageData(
            width: 1600
            height: 800
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
    product: prestashopProduct(productId: { eq: $productId }) {
      ...PrestashopProduct
    }
    next: graphCmsPost(id: { eq: $nextId }) {
      ...PostFields
    }
    previous: graphCmsPost(id: { eq: $previousId }) {
      ...PostFields
    }
  }
`

export default Post
