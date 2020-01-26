import React from 'react';
import { Helmet } from 'react-helmet';

// eslint-disable-next-line react/prop-types
const wrapPageElement = ({ element }) => {
  return (
    <>
      <Helmet
        defer={false}
        htmlAttributes={{ lang: 'en' }}
        title="Mortgage calculator"
      >
        <meta charSet="utf-8" />
        <meta name="description" content="Mortgage calculator" />
      </Helmet>
      {element}
    </>
  );
};

export default wrapPageElement;
