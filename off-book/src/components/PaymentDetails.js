import React from 'react';
import Button from './Button';
import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { useCartContext } from '../contexts/CartContextProvider';
import { useNavigate } from 'react-router-dom';
import CheckoutProcess from './CheckoutProcess';

const PaymentDetails = () => {
  const { register, handleSubmit } = useForm();
  const { cart, dispatch } = useCartContext();
  const navigate = useNavigate();
  function handlePaymentSubmit(data) {
    if (cart.shippingAddress.address === '') {
      navigate('/shipping');
    }

    dispatch({ type: 'setPayment', payload: data.payment });
    navigate('/order');
  }

  return (
    <>
      <CheckoutProcess step1 step2 step3 />
      <h2>Choose your payment method:</h2>
      <PaymentForm onSubmit={handleSubmit(handlePaymentSubmit)}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type='radio'
            id='eSewa'
            name='payment'
            value={'eSewa'}
            {...register('payment')}
          />
          <label htmlFor='eSewa'>eSewa</label> <br />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type='radio'
            id='khalti'
            name='payment'
            value={'Khalti'}
            {...register('payment')}
          />
          <label htmlFor='khalti'>Khalti</label> <br />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type='radio'
            id='mBanking'
            name='payment'
            value={'Mobile-Banking'}
            {...register('payment')}
          />
          <label htmlFor='mBanking'>M-Banking</label> <br />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type='radio'
            id='c-card'
            name='payment'
            value={'Credit/Debit Card'}
            {...register('payment')}
          />
          <label htmlFor='c-card'>Credit/Debit Card</label> <br />
        </div>

        <Button>Continue</Button>
      </PaymentForm>
    </>
  );
};

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default PaymentDetails;
