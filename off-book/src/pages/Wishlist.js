import React from 'react';
import { useWishListContext } from '../contexts/WishListContextProvider';
import { styled } from 'styled-components';
import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider';

const Wishlist = () => {
  //   const wishList = JSON.parse(localStorage.getItem('wishlist')) || [];
  const { wishList, dispatch } = useWishListContext();
  console.log(wishList);
  const { userInfo } = useAuthenticationContext();
  console.log(userInfo);

  const totalPrice = wishList.reduce(
    (sum, book) => sum + book.quantity * book.price,
    0
  );

  return (
    <>
      <StyledWishListContainer>
        <WishListRow>
          <span></span>
          <span>Title</span>
          <span>Author</span>
          <span>Quantity</span>
          <span>Price</span>
          <span>Total Price</span>
        </WishListRow>
        {wishList.length === 0
          ? 'You can add more books in the wishlist'
          : wishList.map((book) => (
              <WishListRow key={book.isbn}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={book.imageLink}
                    alt={book.title}
                    style={{ height: '100px' }}
                  />
                </div>
                <span>{book.title}</span>
                <span>{book.author}</span>
                <span>
                  <span
                    onClick={() =>
                      dispatch({
                        type: 'decreaseQuantity',
                        payload: {
                          book: book,
                          email: userInfo.email.split('@')[0],
                        },
                      })
                    }
                  >
                    ➖
                  </span>
                  {book.quantity}
                  <span
                    onClick={() =>
                      dispatch({
                        type: 'increaseQuantity',
                        payload: {
                          email: userInfo.email.split('@')[0],
                          book: book,
                        },
                      })
                    }
                  >
                    ➕
                  </span>
                </span>
                <span>{book.price}</span>
                <span>{book.quantity * book.price}</span>
              </WishListRow>
            ))}
        <TotalRow>
          <div>
            <p>Total Order Price:{totalPrice}</p>
          </div>
        </TotalRow>
      </StyledWishListContainer>
    </>
  );
};

const StyledWishListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const WishListRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;

const TotalRow = styled.div`
  font-size: larger;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;

  text-align: right;
`;

export default Wishlist;
