import React from 'react';
import { useLocation } from '@reach/router';
import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies';
import { consent } from '@pittica/gatsby-plugin-cookiehub';

import Header from './header';
import Footer from './footer';

import '../../scss/components/element/_wrapper.scss';

export default function Wrapper({ children }) {
  const location = useLocation();

  consent(() => initializeAndTrack(location));

  return (
    <div className="wrapper">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
}
