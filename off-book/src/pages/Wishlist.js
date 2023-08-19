import React from 'react';
import { useWishListContext } from '../contexts/WishListContextProvider';
import { styled } from 'styled-components';
import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider';
import formatCurrency from '../helpers/formatCurrency';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
const Wishlist = () => {
  //   const wishList = JSON.parse(localStorage.getItem('wishlist')) || [];
  const { wishList, dispatch } = useWishListContext();
  console.log(wishList);
  const { userInfo } = useAuthenticationContext();
  console.log(userInfo);

  const navigate = useNavigate();

  // calculating totalPrice of the books
  const totalPrice = wishList.reduce(
    (sum, book) => sum + book.quantity * book.price,
    0
  );

  console.log(wishList);
  function handleDeleteWishlist(bookid) {
    dispatch({ type: 'deleteFromWishList', payload: bookid });
  }

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
          <span></span>
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
                <span>{formatCurrency(book.price)}</span>
                <span>{formatCurrency(book.quantity * book.price)}</span>
                <DeleteIconSpan onClick={() => handleDeleteWishlist(book._id)}>
                  🗑️
                </DeleteIconSpan>
              </WishListRow>
            ))}
        <TotalRow>
          <div>
            <p>Total Order Price: {formatCurrency(totalPrice)}</p>
            <Button onButtonClick={() => navigate('/shipping')}>
              Place Order
            </Button>
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
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
`;

const TotalRow = styled.div`
  font-size: larger;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f4f3e6;
  text-align: right;
`;

const DeleteIconSpan = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

export default Wishlist;
