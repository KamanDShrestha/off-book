import React from 'react';
import { useForm } from 'react-hook-form';
import { useCartContext } from '../contexts/CartContextProvider';
import { styled } from 'styled-components';
import Header from '../components/Header';
import Button from '../components/Button';
const Shipping = () => {
  const { cart, dispatch } = useCartContext();
  const { register, handleSubmit } = useForm({
    defaultValues: cart.shippingAddress,
  });

  function handleOrder(data) {
    console.log(data);
    dispatch({
      type: 'setShippingAddress',
      payload: {
        address: data.address,
        city: data.city,
        district: data.district,
        country: data.address,
      },
    });
  }

  return (
    <OrderContainer>
      <form onSubmit={handleSubmit(handleOrder)}>
        <Header>Place your order!</Header>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
          }}
        >
          <label htmlFor='address'>Address</label>
          <input type='text' {...register('address')} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
          }}
        >
          <label htmlFor='city'>City</label>
          <input type='text' {...register('city')} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
          }}
        >
          <label htmlFor='district'>District</label>
          <input type='text' {...register('district')} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
          }}
        >
          <label htmlFor='country'>Country</label>
          <input type='text' {...register('country')} />
        </div>
        <Button style={{ margin: 'auto' }}>Order now!</Button>
      </form>
    </OrderContainer>
  );
};

const OrderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
  text-align: center;
`;

export default Shipping;
