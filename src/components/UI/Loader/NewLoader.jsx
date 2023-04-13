import React from 'react';
import ContentLoader from 'react-content-loader';
const NewLoader = (props) => (
  <ContentLoader
    speed={1}
    width={520}
    height={90}
    viewBox="0 0 520 90"
    backgroundColor="#8bdaea"
    foregroundColor="#fff"
    {...props}>
    <rect x="10" y="5" rx="0" ry="0" width="150" height="80" />
    <rect x="210" y="25" rx="0" ry="0" width="220" height="18" />
  </ContentLoader>
);

export default NewLoader;
