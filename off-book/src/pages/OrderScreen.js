import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetOrderById from '../hooks/useGetOrderById';
import Loader from '../components/Loader';
import Button from '../components/Button';
import formatCurrency from '../helpers/formatCurrency';
import { styled } from 'styled-components';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import usePayKhalti from '../hooks/usePayKhalti';
import useAuthPayment from '../hooks/useAuthPayment';
import useUpdatePayment from '../hooks/useUpdatePayment';
import { useQueryClient } from '@tanstack/react-query';
import { usePaymentContext } from '../contexts/PaymentContextProvider';

const OrderScreen = () => {
  const { id } = useParams();
  console.log(id);
  const { data: order, isLoading } = useGetOrderById(id);
  const { mutate: payViaKhalti, isLoading: isPaying } = usePayKhalti();
  // const { mutate: checkForPayment, isLoading: isPaid } = useAuthPayment();
  // const { mutate: updatePayment, isLoading: isUpdating } = useUpdatePayment();
  // const queryClient = useQueryClient();
  console.log(order);
  const { pidxOrder, setPidx } = usePaymentContext();
  const userInfo = getFromLocalStorage('userInfo');

  function handlePayment() {
    const orderData = {
      return_url: `https://www.google.com/`,
      website_url: 'https://www.google.com/',
      amount: order.totalPrice,
      purchase_order_id: id,
      purchase_order_name: order.user.email.split('@')[0],
      customer_info: {
        name: order.user.email.split('@')[0],
        email: order.user.email,
      },
      amount_breakdown: order.orderedBooks.map((book) => ({
        label: book.title,
        amount: book.price * book.quantity,
      })),
      product_details: order.orderedBooks.map((book) => ({
        identity: book._id,
        name: book.title,
        total_price: book.price * book.quantity,
        quantity: book.quantity,
        unit_price: book.price,
      })),
    };
    console.log(orderData);
    payViaKhalti(orderData, {
      onSuccess: (data) => {
        window.open(data.payment_url, '_blank');

        console.log(data);
        setPidx({ pidx: data.pidx, orderId: id });

        // usecheckForAuth({ pidx: data.pidx }, id);
        // const { data: authPayment, isLoading: isOngoing } = useAuthPayment({
        //   pidx: data.pidx,
        // });

        // checkForPayment(
        //   { pidx: data.pidx },
        //   {
        //     onSuccess: (data) => {
        //       console.log('isSuccessful');
        //       console.log(data.status);
        //       if (data.status === 'Pending') {
        //         console.log('now here completed');
        // updatePayment(id, {
        //   onSuccess: () => {
        //     queryClient.invalidateQueries(`[order, ${id}]`);
        //   },
        // });
        //       }
        //     },
        //   }
        // );
      },
    });
  }

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PlaceOrderContainer>
            <OverallDetail>
              <Heading style={{ fontSize: 'xx-large' }}>
                Order no. {order._id}
              </Heading>
              <DetailContainer>
                <Heading>Account :</Heading>
                <DetailParagraph>Name: {userInfo.firstName}</DetailParagraph>
                <DetailParagraph>Email: {userInfo.email}</DetailParagraph>
              </DetailContainer>
              <DetailContainer>
                <Heading>Delivery Address :</Heading>
                <DetailParagraph>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                </DetailParagraph>
                {order.isDelievered ? (
                  <InfoDiv>Delievered</InfoDiv>
                ) : (
                  <NotInfoDiv>Not delivered</NotInfoDiv>
                )}
              </DetailContainer>
              <DetailContainer>
                <Heading>Payment Information :</Heading>
                <DetailParagraph>{order.paymentMethod}</DetailParagraph>
                {order.isPaid ? (
                  <InfoDiv>Paid</InfoDiv>
                ) : (
                  <NotInfoDiv>Not paid</NotInfoDiv>
                )}
              </DetailContainer>
              <DetailContainer>
                <Heading>Your orders :</Heading>
                {order.orderedBooks.length === 0 ? (
                  <DetailParagraph>
                    You have not added anything to your cart
                  </DetailParagraph>
                ) : (
                  <OrderItems>
                    {order.orderedBooks.map((book) => (
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
                    Grand Total: {formatCurrency(order.totalPrice)}
                  </DetailParagraph>
                </DetailContainer>
              </DetailContainer>
            </OverallDetail>

            <DetailContainer>
              <Heading>Summary</Heading>
              <DetailParagraph>
                Product Total : {formatCurrency(order.totalPrice)}
              </DetailParagraph>
              <DetailParagraph>
                Delivery To : {order.shippingAddress.address}
              </DetailParagraph>
              <hr />
              <br />
              <DetailParagraph>
                Delivery charge : {formatCurrency(0.0)}
              </DetailParagraph>
              <DetailParagraph>
                Discount : {formatCurrency(0.0)}
              </DetailParagraph>
              <hr />
              <br />
              <DetailParagraph>
                Order Total : {formatCurrency(order.totalPrice)}
              </DetailParagraph>
              <Button onButtonClick={handlePayment}>
                {isPaying ? 'Paying' : 'Pay for your order'}
              </Button>
            </DetailContainer>
          </PlaceOrderContainer>
        </>
      )}
    </div>
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

const InfoDiv = styled.div`
  padding: 10px;
  background-color: aquamarine;
  font-size: xx-small;
`;

const NotInfoDiv = styled.div`
  padding: 10px;
  background-color: red;
  font-size: x-small;
  color: white;
`;

const OrderItems = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px;
  gap: 10px;
`;

export default OrderScreen;
