import React from 'react';

import '../../scss/components/ui/_caption.scss';

const Caption = ({ text, icon }) => {
  if (text) {
    if (icon) {
      return (
        <h4 className="caption">
          <span className="icon-text">
            <span className="icon">
              <i className={`icon-goforpet-${icon}`} />
            </span>
            <span>{text}</span>
          </span>
        </h4>
      );
    } else {
      return (
        <h4 className="caption">
          <span>{text}</span>
        </h4>
      );
    }
  } else {
    return null;
  }
};

export default Caption;
