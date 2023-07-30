import React from 'react';

const ErrorText = ({ message }) => {
  return <p style={{ ...errorTextStyles }}>{message}</p>;
};

const errorTextStyles = {
  fontSize: '12px',
  color: 'red',
  marginTop: '0',
};

export default ErrorText;
