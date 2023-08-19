import React from 'react';
import Button from './Button';
import { styled } from 'styled-components';
const PlaceOrder = () => {
  return (
    <OrderDiv>
      <Button>Place your order</Button>
    </OrderDiv>
  );
};

const OrderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

export default PlaceOrder;
