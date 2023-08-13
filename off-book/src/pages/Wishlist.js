import React from 'react';
import { useWishListContext } from '../contexts/WishListContextProvider';
import { styled } from 'styled-components';

const Wishlist = () => {
  const wishList = JSON.parse(localStorage.getItem('wishlist')) || [];
  console.log(wishList);
  return (
    <StyledWishListContainer>
      <WishListRow>
        <span></span>
        <span>Title</span>
        <span>Writer</span>
        <span>Published Date</span>
        <span>Price</span>
        <span>Total Price</span>
      </WishListRow>
      {wishList.length === 0
        ? 'You can add more books in the wishlist'
        : wishList.map((book) => (
            <WishListRow>
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
              <span>{book.published}</span>
              <span>Price</span>
              <span>TotalPrice</span>
            </WishListRow>
          ))}
    </StyledWishListContainer>
  );
};

const StyledWishListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WishListRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;

export default Wishlist;
