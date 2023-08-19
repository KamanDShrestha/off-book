import React from 'react';
import { useForm } from 'react-hook-form';
import { useCartContext } from '../contexts/CartContextProvider';
import { styled } from 'styled-components';
import Header from '../components/Header';
import Button from '../components/Button';
import CheckoutProcess from '../components/CheckoutProcess';
import { useNavigate } from 'react-router-dom';
const Shipping = () => {
  const { cart, dispatch } = useCartContext();
  const { register, handleSubmit } = useForm({
    defaultValues: cart.shippingAddress,
  });

  const navigate = useNavigate();

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
    navigate('/payment');
  }

  console.log(cart);

  return (
    <OrderContainer>
      <CheckoutProcess step1 step2 />
      <form onSubmit={handleSubmit(handleOrder)}>
        <Header>Provide shipping details!</Header>
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
        <Button style={{ margin: 'auto' }}>Continue</Button>
      </form>
    </OrderContainer>
  );
};

const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;
  text-align: center;
`;

export default Shipping;
