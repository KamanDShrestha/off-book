import React from 'react';
import { useState } from 'react';

const Input = ({
  placeHolder,
  name,
  type,
  onTextChange,
  styles,
  value,
  checked,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  function handleVisibility(e) {
    e.preventDefault();
    setIsVisible((isVisible) => !isVisible);
  }

  if (type === 'checkbox') {
    return (
      <input
        style={{ ...inputStyles.checkBoxStyles, ...styles }}
        name={name}
        type={type}
        placeholder={placeHolder}
        onChange={onTextChange}
        checked={checked}
      />
    );
  }
  return (
    <div style={{ position: 'relative' }}>
      <input
        style={{ ...inputStyles.inputStyles, ...styles }}
        name={name}
        type={isVisible ? 'text' : type}
        placeholder={placeHolder}
        onChange={onTextChange}
        value={value}
      />
      {type === 'password' && (
        <button
          style={{ ...inputStyles.visibiltyStyles }}
          onClick={handleVisibility}
        >
          {isVisible ? (
            <span style={{ fontSize: '15px' }}> 👀 </span>
          ) : (
            <span style={{ fontSize: '15px' }}>🕶️</span>
          )}
        </button>
      )}
    </div>
  );
};

const inputStyles = {
  inputStyles: {
    outline: 'none',
    borderWidth: '1px',
    borderRadius: '10px',
    width: '22rem',
    height: '2rem',
    marginBottom: '10px',
    paddingLeft: '15px',
    fontFamily: 'Poppins',
  },
  checkBoxStyles: {
    width: '12px',
    height: '12px',
    display: 'inline',
  },

  visibiltyStyles: {
    position: 'absolute',
    right: '5px',
    top: '8px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    background: 'none',
  },
};

export default Input;
