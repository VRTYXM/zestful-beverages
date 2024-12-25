import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <div className="product-block-wrapper">
    <ContentLoader
      className="product-block"
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="4" y="272" rx="5" ry="5" width="273" height="20" />
      <rect x="5" y="316" rx="10" ry="10" width="272" height="85" />
      <rect x="2" y="433" rx="23" ry="23" width="103" height="28" />
      <rect x="128" y="423" rx="20" ry="20" width="152" height="43" />
      <rect x="70" y="0" rx="10" ry="10" width="140" height="255" />
    </ContentLoader>
  </div>
);

export default Skeleton;
