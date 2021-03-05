import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import Table from './src/components/mdx/table';

import Post from './src/components/layout/post';
import Page from './src/components/layout/page';

import './src/scss/style.scss';

const wrapPageElement = ({ element, props }) => {
  if (props.pageContext && props.pageContext.type === 'post') {
    return <Post {...props}>{element}</Post>;
  } else {
    return <Page {...props}>{element}</Page>;
  }
};

const componens = { table: Table };

const wrapRootElement = ({ element }) => <MDXProvider components={componens}>{element}</MDXProvider>;

export { wrapPageElement, wrapRootElement };
