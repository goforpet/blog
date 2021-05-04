import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton
} from 'react-share';
import { useLocation } from '@reach/router';

import '../../scss/components/ui/_share.scss';

export default function Share({ title }) {
  const location = useLocation();
  const url = location.href;

  return (
    <div className="share">
      <FacebookShareButton url={url} className="share-button">
        <span className="icon">
          <i className="icon-goforpet-facebook" />
        </span>
      </FacebookShareButton>
      <TwitterShareButton url={url} className="share-button" title={title}>
        <span className="icon">
          <i className="icon-goforpet-twitter" />
        </span>
      </TwitterShareButton>
      <LinkedinShareButton url={url} className="share-button">
        <span className="icon">
          <i className="icon-goforpet-linkedin" />
        </span>
      </LinkedinShareButton>
      <WhatsappShareButton url={url} className="share-button" title={title}>
        <span className="icon">
          <i className="icon-goforpet-whatsapp" />
        </span>
      </WhatsappShareButton>
      <TelegramShareButton url={url} className="share-button" title={title}>
        <span className="icon">
          <i className="icon-goforpet-telegram" />
        </span>
      </TelegramShareButton>
    </div>
  );
}
