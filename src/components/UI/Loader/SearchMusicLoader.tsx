import React from 'react';
import ContentLoader from 'react-content-loader';

const SearchMusicLoader = (props) => (
  <ContentLoader
    speed={1.5}
    width={200}
    height={208}
    viewBox="0 0 200 208"
    backgroundColor="#a870d7"
    foregroundColor="#dcc0e2"
    {...props}>
    <rect x="14" y="14" rx="0" ry="0" width="172" height="140" />
    <rect x="14" y="178" rx="0" ry="0" width="172" height="14" />
    <rect x="14" y="159" rx="0" ry="0" width="172" height="14" />
  </ContentLoader>
);

export default SearchMusicLoader;
