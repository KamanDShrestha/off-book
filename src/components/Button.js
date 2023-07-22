import React from 'react';
import styles from './Button.module.css';
const Button = ({ children, onButtonClick, disabled }) => {
  return (
    <button
      className={styles.button}
      onClick={onButtonClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
