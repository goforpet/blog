require('dotenv').config();

const path = require('path');
const moment = require('moment');
const paginator = require('./src/utils/paginator');

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const { data } = await graphql(`
    query {
      categories: allGraphCmsCategory(
        filter: { stage: { eq: PUBLISHED } }
      ) {
        nodes {
          id
          stage
          slug
          name
        }
      }
      pages: allGraphCmsPage(
        filter: { stage: { eq: PUBLISHED } }
      ) {
        nodes {
          id
          content {
            markdownNode {
              childMdx {
                body
              }
            }
          }
          seo {
            description
            image {
              url
            }
            keywords
            title
          }
          slug
          subtitle
          title
        }
      }
      posts: allGraphCmsPost(
        sort: { fields: date, order: DESC }
        filter: { stage: { eq: PUBLISHED } }
      ) {
        edges {
          nextPost: next {
            id
            slug
            title
          }
          page: node {
            id
            author {
              id
              name
              title
            }
            content {
              markdownNode {
                childMdx {
                  body
                }
              }
            }
            date: formattedDate
            productId
            excerpt
            seo {
              description
              image {
                url
              }
              keywords
              title
            }
            slug
            title
            categories {
              name
              slug
            }
            tags
            updatedAt
          }
          previousPost: previous {
            id
            slug
            title
          }
        }
      }
    }
  `);

  if (data.errors) {
    throw data.errors;
  }

  const categories = {};

  data.posts.edges.forEach(({ nextPost, page, previousPost }) => {
    if (page.categories) {
      page.categories.forEach((category) => {
        if (categories[category.slug]) {
          categories[category.slug] += 1;
        } else {
          categories[category.slug] = 1;
        }
      });
    }

    createPage({
      component: path.resolve('./src/templates/post.jsx'),
      context: {
        id: page.id,
        page,
        previousPost,
        nextPost,
        previousId: previousPost ? previousPost.id : null,
        nextId: nextPost ? nextPost.id : null,
        productId: page.productId,
        type: 'post'
      },
      path: `/${page.slug}`
    });
  });

  data.pages.nodes.forEach((page) => {
    createPage({
      component: path.resolve('./src/templates/page.jsx'),
      context: {
        page,
        type: 'page'
      },
      path: `/pages/${page.slug}`
    });
  });

  data.categories.nodes.forEach((page) => {
    paginator.listing(createPage, { limit: 15, count: categories[page.slug], page, slug: 'categories' });
  });

  paginator.articles(createPage, { limit: 15, count: data.posts.edges.length, slug: 'articles' });
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    GraphCMS_Post: {
      formattedDate: {
        type: 'String',
        resolve: (source) => {
          const date = new Date(source.date);
          const m = moment(date);
          m.locale(process.env.LOCALE);

          return m.format('l');
        }
      }
    }
  };

  createResolvers(resolvers);
};
