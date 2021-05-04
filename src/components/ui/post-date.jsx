import React from 'react';

import Caption from './caption';

import '../../scss/components/ui/_post-date.scss';

const PostDate = ({ date }) => (
  <div className="post-date">
    <Caption text="Pubblicato il" icon="date" />
    <time dateTime={date} itemProp="datePublished">
      {date}
    </time>
  </div>
);

export default PostDate;
