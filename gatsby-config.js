require("dotenv").config()

const siteUrl = process.env.URL || `https://${process.env.HOST}`

module.exports = {
  siteMetadata: {
    title: process.env.TITLE,
    description: process.env.DESCRIPTION,
    locale: {
      language: process.env.LOCALE,
      culture: process.env.CULTURE,
    },
    siteUrl,
    author: process.env.AUTHOR,
    organization: {
      company: process.env.ORG_COMPANY,
      address: process.env.ORG_ADDRESS_STREET,
      url: siteUrl,
      logo: new URL("/logo.jpg", siteUrl).href,
      zipCode: process.env.ORG_ADDRESS_ZIPCODE,
      city: process.env.ORG_ADDRESS_CITY,
      province: process.env.ORG_ADDRESS_PROVINCE,
      country: process.env.ORG_ADDRESS_COUNTRY,
      email: process.env.EMAIL,
      taxId: process.env.ORG_TAX_ID || "",
      vatId: process.env.ORG_VAT_ID || "",
      registryId: process.env.ORG_REGISTRY_ID || "",
    },
    keywords: [""],
    shop: process.env.SHOP_URL,
    newsletter: process.env.NEWSLETTER_URL,
  },
  plugins: [
    `gatsby-plugin-mdx`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: process.env.GOOGLE_ANALYTICS_ID,
          cookieName: "goforpet-gdpr-analytics",
          anonymize: true,
          allowAdFeatures: false,
        },
        facebookPixel: {
          pixelId: process.env.FACEBOOK_PIXEL,
          cookieName: "goforpet-gdpr-marketing",
        },
        environments: ["production", "development"],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: process.env.TITLE,
        short_name: process.env.TITLE,
        start_url: "/",
        background_color: process.env.COLOR_BACKGROUND,
        theme_color: process.env.COLOR_PRIMARY,
        display: "minimal-ui",
        icon: "static/icon.png",
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: "/./",
        query: `
          {
            allSitePage {
              nodes {
                path
                context {
                  page {
                    updatedAt
                  }
                  type
                }
              }
            }
        }`,
        resolvePages: ({ allSitePage: { nodes } }) =>
          nodes.map(({ path, context }) => {
            const page = {
              path: new URL(path, siteUrl).href,
              changefreq: "daily",
              priority: 0.5,
              lastmod: null,
            }

            if (context) {
              if (context.page && context.page.updatedAt) {
                page.lastmod = context.page.updatedAt
              }

              if (context.type) {
                switch (context.type) {
                  case "post":
                    page.changefreq = "monthly"
                    page.priority = 0.7
                    break
                  case "page":
                    page.priority = 0.8
                    break
                  default:
                    page.priority = path === "/" ? 1.0 : 0.5
                    break
                }
              }
            }

            return page
          }),
        serialize: ({ path, changefreq, priority, lastmod }) => {
          return { url: path, changefreq, priority, lastmod }
        },
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_ADMIN_KEY,
        apiSearchKey: process.env.ALGOLIA_API_SEARCH_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries: [
          {
            query: `{
              pages: allGraphCmsPost(filter: {stage: {eq: PUBLISHED}}) {
                nodes {
                  objectID: id
                  slug
                  tags
                  internal {
                    contentDigest
                  }
                  excerpt
                  title
                  coverImage {
                    localFile {
                      childImageSharp {
                        gatsbyImageData(
                          width: 320
                          height: 320
                          placeholder: BLURRED
                          formats: [AUTO, WEBP, AVIF]
                        )
                      }
                    }
                  }
                }
              }
            }`,
            transformer: ({
              data: {
                pages: { nodes },
              },
            }) =>
              nodes.map(
                ({
                  objectID,
                  slug,
                  title,
                  excerpt,
                  tags,
                  internal: { contentDigest },
                  coverImage: { localFile },
                }) => ({
                  objectID,
                  slug,
                  title,
                  excerpt,
                  tags,
                  contentDigest,
                  image: localFile,
                })
              ),
            settings: {
              attributesToSnippet: [
                "path:5",
                "contentDigest",
                "title",
                "tags",
                "excerpt",
                "image",
              ],
              indexLanguages: [process.env.LOCALE],
              queryLanguages: [process.env.LOCALE],
              searchableAttributes: ["title", "tags", "excerpt", "slug"],
            },
          },
        ],
        matchFields: ["contentDigest", "slug"],
      },
    },
    {
      resolve: `gatsby-source-graphcms`,
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
        buildMarkdownNodes: true,
        downloadLocalImages: true,
        locales: [process.env.LOCALE],
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: {
                allGraphCmsPost: { nodes },
              },
            }) => {
              return nodes.map(
                ({ title, excerpt, publishedAt, slug, content: { html } }) => {
                  const url = new URL(slug, siteUrl).href

                  return {
                    title,
                    description: excerpt,
                    date: publishedAt,
                    url,
                    guid: url,
                    custom_elements: [{ "content:encoded": html }],
                  }
                }
              )
            },
            query: `
              {
                allGraphCmsPost(sort: { fields: date, order: DESC }) {
                  nodes {
                    id
                    publishedAt
                    excerpt
                    slug
                    title
                    content {
                      html
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: process.env.TITLE,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-page-progress`,
      options: {
        includePaths: [],
        excludePaths: [
          "/",
          { regex: "^/pages" },
          { regex: "^/articles" },
          { regex: "^/categories" },
        ],
        height: 3,
        color: process.env.COLOR_PRIMARY,
      },
    },
    {
      resolve: `@pittica/gatsby-plugin-seo`,
      options: {
        image: "/share.jpg",
        socials: {
          facebook: {
            app: process.env.FACEBOOK_APP,
            page: process.env.FACEBOOK_PAGE,
            icon: "icon-goforpet-facebook",
          },
          instagram: {
            username: process.env.INSTAGRAM_USERNAME,
            icon: "icon-goforpet-instagram",
          },
        },
      },
    },
    {
      resolve: `@pittica/gatsby-plugin-cookiehub`,
      options: {
        code: "4dd3307e",
        debug: (process.env.ENV || process.env.NODE_ENV) !== "production",
        cookie: "goforpet-gdpr",
      },
    },
    {
      resolve: `@pittica/gatsby-source-prestashop`,
      options: {
        url: process.env.SHOP_URL,
        key: process.env.SHOP_KEY,
        locale: process.env.LOCALE,
      },
    },
  ],
}
