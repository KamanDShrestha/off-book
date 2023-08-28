import React from 'react';
import Button from './Button';
import { styled } from 'styled-components';
import usePlaceOrder from '../hooks/usePlaceOrder';
import { useCartContext } from '../contexts/CartContextProvider';
import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import { useNavigate } from 'react-router-dom';
import CheckoutProcess from './CheckoutProcess';
import formatCurrency from '../helpers/formatCurrency';
const PlaceOrder = () => {
  const { mutate } = usePlaceOrder();
  const userInfo = getFromLocalStorage('userInfo');
  const { cart } = useCartContext();
  console.log(cart);
  const navigate = useNavigate();
  const totalPrice = cart.booksList.reduce(
    (sum, book) => sum + book.price * book.quantity,
    0
  );

  function handlePlaceOrder() {
    const order = {
      user: userInfo.id,
      orderedBooks: cart.booksList,
      shippingAddress: cart.shippingAddress,
      totalPrice: totalPrice,
      shippingPrice: 50,
      isPaid: false,
      isDelivered: false,
      paymentMethod: cart.payment,
    };
    console.log(userInfo);
    console.log(cart);
    mutate(order);
  }

  function handleEditDelivery() {
    navigate('/shipping');
  }
  function handleEditPayment() {
    navigate('/payment');
  }
  function handleEditWishlist() {
    navigate('/wishlist');
  }

  return (
    <>
      <CheckoutProcess step1 step2 step3 step4 />
      <PlaceOrderContainer>
        <OverallDetail>
          <DetailContainer>
            <Heading>Account :</Heading>
            <DetailParagraph>Name: {userInfo.firstName}</DetailParagraph>
            <DetailParagraph>Email: {userInfo.email}</DetailParagraph>
          </DetailContainer>
          <DetailContainer>
            <Heading>Delivery Address :</Heading>
            <DetailParagraph>
              {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
            </DetailParagraph>
            <EditLink onClick={handleEditDelivery}>
              Edit your delivery address
            </EditLink>
          </DetailContainer>
          <DetailContainer>
            <Heading>Payment Information :</Heading>
            <DetailParagraph>{cart.payment}</DetailParagraph>
            <EditLink onClick={handleEditPayment}>
              Edit your payment method
            </EditLink>
          </DetailContainer>
          <DetailContainer>
            <Heading>Your orders :</Heading>
            {cart.booksList.length === 0 ? (
              <DetailParagraph>
                You have not added anything to your cart
              </DetailParagraph>
            ) : (
              <OrderItems>
                {cart.booksList.map((book) => (
                  <>
                    <img
                      src={book.imageLink}
                      alt={book.title}
                      style={{ height: '100px' }}
                    />
                    <p>{book.title}</p>
                    <p>
                      {book.quantity} * {formatCurrency(book.price)} ={' '}
                      {formatCurrency(book.quantity * book.price)}
                    </p>
                  </>
                ))}
              </OrderItems>
            )}
            <DetailContainer>
              <DetailParagraph>
                Grand Total: {formatCurrency(totalPrice)}
              </DetailParagraph>
            </DetailContainer>
            <EditLink onClick={handleEditWishlist}>Edit your wishlist</EditLink>
          </DetailContainer>
        </OverallDetail>

        <DetailContainer>
          <Heading>Summary</Heading>
          <DetailParagraph>
            Product Total : {formatCurrency(totalPrice)}
          </DetailParagraph>
          <DetailParagraph>
            Delivery To : {cart.shippingAddress.address}
          </DetailParagraph>
          <hr />
          <br />
          <DetailParagraph>
            Delivery charge : {formatCurrency(0.0)}
          </DetailParagraph>
          <DetailParagraph>Discount : {formatCurrency(0.0)}</DetailParagraph>
          <hr />
          <br />
          <DetailParagraph>
            Order Total : {formatCurrency(totalPrice)}
          </DetailParagraph>
          <Button onButtonClick={handlePlaceOrder}>Place your order</Button>
        </DetailContainer>
      </PlaceOrderContainer>
    </>
  );
};

const Heading = styled.span`
  font-size: x-large;
  text-decoration: underline;
`;

const DetailParagraph = styled.span`
  font-size: medium;
  font-weight: 600;
`;

const EditLink = styled.span`
  font-size: small;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }

  position: absolute;
  right: 10px;
`;

const PlaceOrderContainer = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
`;

const OverallDetail = styled.div`
  height: 67vh;
  overflow: scroll;
`;

const DetailContainer = styled.span`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 1rem;
  margin: 20px;
  position: relative;
`;

const OrderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const OrderItems = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px;
  gap: 10px;
`;

export default PlaceOrder;
