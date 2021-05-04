import React from 'react';

import BodyContent from '../components/section/body-content';
import PageHeader from '../components/section/page-header';

export default function Page({ pageContext: { page } }) {
  return (
    <div className="page">
      <PageHeader {...page} />
      <BodyContent>{page.content.markdownNode.childMdx.body}</BodyContent>
    </div>
  );
}
