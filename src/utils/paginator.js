const path = require('path');

exports.listing = (createPage, { limit, count, page, slug }) => {
  const length = Math.ceil(count / limit);

  Array.from({ length: length }).forEach((_, i) => {
    createPage({
      component: path.resolve('./src/templates/listing.jsx'),
      context: {
        id: page.id,
        page,
        count,
        limit,
        skip: i * limit,
        current: i + 1,
        group: slug
      },
      path: i === 0 ? `/${slug}/${page.slug}` : `/${slug}/${page.slug}/${i + 1}`
    });
  });
};

exports.articles = (createPage, { limit, count }) => {
  const length = Math.ceil(count / limit);

  Array.from({ length: length }).forEach((_, i) => {
    createPage({
      component: path.resolve('./src/templates/articles.jsx'),
      context: {
        count,
        limit,
        skip: i * limit,
        current: i + 1
      },
      path: i === 0 ? `/articles` : `/articles/${i + 1}`
    });
  });
};
