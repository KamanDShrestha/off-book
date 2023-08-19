import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from './Button';

const CheckoutProcess = ({ step1, step2, step3, step4 }) => {
  const navigate = useNavigate();

  return (
    <CheckOutProcessContainer>
      {step1 ? (
        <Button
          style={{ width: 'auto' }}
          onButtonClick={() => navigate('/login')}
        >
          Sign in
        </Button>
      ) : (
        <Button
          style={{ width: '2px' }}
          onButtonClick={() => navigate('/login')}
          disabled
        >
          Sign in
        </Button>
      )}

      {step2 ? (
        <Button
          style={{ width: 'auto' }}
          onButtonClick={() => navigate('/shipping')}
        >
          Shipping Details
        </Button>
      ) : (
        <Button style={{ width: 'auto' }} disabled>
          Shipping Details
        </Button>
      )}

      {step3 ? (
        <Button
          style={{ width: 'auto' }}
          onButtonClick={() => navigate('/payment')}
        >
          Payment Details
        </Button>
      ) : (
        <Button style={{ width: 'auto' }} disabled>
          Payment Details
        </Button>
      )}

      {step4 ? (
        <Button
          style={{ width: 'auto' }}
          onButtonClick={() => navigate('/order')}
        >
          Place Order
        </Button>
      ) : (
        <Button style={{ width: 'auto' }} disabled>
          Place Order
        </Button>
      )}
    </CheckOutProcessContainer>
  );
};

const CheckOutProcessContainer = styled.div`
  display: flex;
  padding: 20px;
  background-color: whitesmoke;
  gap: 20px;
  width: 80vw;
  margin: 20px;
  border-radius: 10px;
`;

export default CheckoutProcess;
