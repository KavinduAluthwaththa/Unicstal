'use client';

import React from 'react';

const GlobalCustomBackground: React.FC = () => {
  return (
    <div className="global-custom-bg">
      {/* Multiple background layers for depth */}
      <div className="custom--bg primary-bg"></div>
      <div className="custom--bg secondary-bg"></div>
      <div className="custom--bg accent-bg"></div>
    </div>
  );
};

export default GlobalCustomBackground;