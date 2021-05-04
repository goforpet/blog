import React from 'react';

import Caption from './caption';

const ImageCredits = ({ image }) => {
  if (image && image.credits && image.credits.html) {
    return (
      <div className="card">
        <div className="card-content">
          <React.Fragment>
            <Caption text="Crediti Immagine" icon="images" />
            <div
              dangerouslySetInnerHTML={{
                __html: image.credits.html
              }}
            />
          </React.Fragment>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ImageCredits;
