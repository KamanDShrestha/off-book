import React from 'react';

const CenteringComponent = ({ children, styles }) => {
  return <div style={{ ...centeringStyles, ...styles }}>{children}</div>;
};

const centeringStyles = {
  height: '80vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default CenteringComponent;
