import React from 'react';

const Header = ({ children }) => {
  return (
    <h1 style={{ margin: 'auto', zIndex: '4', textAlign: 'center' }}>
      {children}
    </h1>
  );
};

export default Header;
