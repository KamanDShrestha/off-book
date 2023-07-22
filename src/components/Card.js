import React from 'react';

const Card = ({ children }) => {
  return (
    <>
      <div style={{ ...cardStyles }}>{children}</div>
    </>
  );
};

const cardStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  zIndex: '3',
  backgroundColor: 'white',
  color: '#676060',
  padding: '20px',
  borderRadius: '10px',
  //   display: flex;
  //   flex-direction: column;
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  boxShadow:
    'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
  /* box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
      rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px; */
};

export default Card;
