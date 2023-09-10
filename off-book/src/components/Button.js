import React from 'react';
import styles from './Button.module.css';
const Button = ({ children, onButtonClick, disabled, style }) => {
  return (
    <button
      className={styles.button}
      onClick={onButtonClick}
      disabled={disabled}
      style={{ ...style, width: 'auto' }}
    >
      {children}
    </button>
  );
};

export default Button;
