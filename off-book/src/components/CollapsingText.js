import React from 'react';
import { useState } from 'react';
const CollapsingText = ({ children, style }) => {
  const [collapsed, setIsCollapsed] = useState(true);
  console.log(children);
  const displayingText = collapsed
    ? children?.split(' ').slice(0, 16).join(' ')
    : children;

  return (
    <div style={{ ...style }}>
      {displayingText}
      {collapsed ? '...' : ''}{' '}
      <span
        onClick={() => setIsCollapsed((collapsed) => !collapsed)}
        style={{ color: 'skyblue' }}
      >
        {collapsed ? 'Show more' : 'Show less'}
      </span>
    </div>
  );
};

export default CollapsingText;
