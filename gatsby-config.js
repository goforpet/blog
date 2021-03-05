require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: process.env.TITLE,
    description: process.env.DESCRIPTION,
    locale: {
      language: process.env.LOCALE,
      culture: process.env.CULTURE
    },
    siteUrl: process.env.URL,
    author: process.env.AUTHOR,
    organization: {
      company: process.env.ORG_COMPANY,
      address: process.env.ORG_ADDRESS_STREET,
      url: process.env.URL,
      logo: process.env.URL + '/logo.jpg',
      zipCode: process.env.ORG_ADDRESS_ZIPCODE,
      city: process.env.ORG_ADDRESS_CITY,
      province: process.env.ORG_ADDRESS_PROVINCE,
      country: process.env.ORG_ADDRESS_COUNTRY,
      email: process.env.EMAIL,
      taxId: process.env.ORG_TAX_ID,
      vatId: process.env.ORG_VAT_ID,
      registryId: process.env.ORG_REGISTRY_ID
    },
    keywords: [ '' ],
    shop: process.env.SHOP_URL,
    newsletter: process.env.NEWSLETTER_URL
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
          cookieName: 'goforpet-gdpr-analytics',
          anonymize: true,
          allowAdFeatures: false
        },
        facebookPixel: {
          pixelId: process.env.FACEBOOK_PIXEL,
          cookieName: 'goforpet-gdpr-marketing'
        },
        environments: [ 'production', 'development' ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: process.env.TITLE,
        short_name: process.env.TITLE,
        start_url: '/',
        background_color: process.env.COLOR_BACKGROUND,
        theme_color: process.env.COLOR_PRIMARY,
        display: 'minimal-ui',
        icon: 'static/icon.png'
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: '/sitemap.xml',
        exclude: [],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`,
        serialize: ({ site: { siteMetadata: { siteUrl } }, allSitePage }) =>
          allSitePage.edges.map(({ node }) => {
            return {
              url: new URL(node.path, siteUrl).href,
              changefreq: 'daily',
              priority: 0.7
            };
          })
      }
    },
    {
      resolve: `gatsby-source-graphcms`,
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
        buildMarkdownNodes: true,
        downloadLocalImages: true,
        locales: [ process.env.LOCALE ]
      }
    },
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-feed',
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
            serialize: ({ query: { site, allGraphCmsPost: { nodes } } }) => {
              return nodes.map(({ title, excerpt, publishedAt, slug, content: { html } }) => {
                return {
                  title,
                  description: excerpt,
                  date: publishedAt,
                  url: new URL(slug, site.siteMetadata.siteUrl).href,
                  guid: new URL(slug, site.siteMetadata.siteUrl).href,
                  custom_elements: [ { 'content:encoded': html } ]
                };
              });
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
            output: '/rss.xml',
            title: process.env.TITLE
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-page-progress`,
      options: {
        includePaths: [],
        excludePaths: [ '/', { regex: '^/pages' }, { regex: '^/articles' }, { regex: '^/categories' } ],
        height: 3,
        color: process.env.COLOR_PRIMARY
      }
    },
    {
      resolve: `@pittica/gatsby-plugin-seo`,
      options: {
        image: '/share.jpg',
        socials: {
          facebook: {
            app: process.env.FACEBOOK_APP,
            page: process.env.FACEBOOK_PAGE
          },
          instagram: {
            username: process.env.INSTAGRAM_USERNAME
          }
        }
      }
    },
    {
      resolve: `@pittica/gatsby-plugin-cookiehub`,
      options: {
        code: '4dd3307e',
        debug: (process.env.ENV || process.env.NODE_ENV) !== 'production',
        cookie: 'goforpet-gdpr'
      }
    },
    {
      resolve: `@pittica/gatsby-source-prestashop`,
      options: {
        url: process.env.SHOP_URL,
        key: process.env.SHOP_KEY,
        locale: process.env.LOCALE
      }
    }
  ]
};
