import React from 'react';
import { useWishListContext } from '../contexts/WishListContextProvider';
import { styled } from 'styled-components';
import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider';
import formatCurrency from '../helpers/formatCurrency';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import useWishlistAdd from '../hooks/useWishlistAdd';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
const Wishlist = () => {
  //   const wishList = JSON.parse(localStorage.getItem('wishlist')) || [];
  const { wishList, dispatch } = useWishListContext();
  console.log(wishList);
  const userInfo = getFromLocalStorage('userInfo');
  console.log(userInfo);
  const { mutate: addToWishlist, isLoading: isAdding } = useWishlistAdd();
  const navigate = useNavigate();

  // calculating totalPrice of the books
  const totalPrice = wishList.reduce(
    (sum, book) => sum + book.quantity * book.price,
    0
  );

  console.log(wishList);
  function handleDeleteWishlist(bookid) {
    dispatch({
      type: 'deleteFromWishList',
      payload: { bookid: bookid, email: userInfo.email.split('@')[0] },
    });
  }

  function handleClearWishlist() {
    dispatch({ type: 'clearWishlist' });
  }

  return (
    <>
      <StyledWishListContainer>
        <WishListRow>
          <span></span>
          <TableHeader>Title</TableHeader>
          <TableHeader>Author</TableHeader>
          <TableHeader>Quantity</TableHeader>
          <TableHeader>Price</TableHeader>
          <TableHeader>Total Price</TableHeader>
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
                  <ButtonSpan
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
                  </ButtonSpan>
                  <span style={{ margin: '10px' }}>{book.quantity}</span>
                  <ButtonSpan
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
                  </ButtonSpan>
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
            <Button onButtonClick={handleClearWishlist}>Clear</Button>
            <Button
              onButtonClick={() =>
                addToWishlist({ user: userInfo.id, addedBooks: wishList })
              }
              disabled={isAdding}
            >
              Save for later
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
  background-color: #c5c6d0;
  text-align: right;
`;

const TableHeader = styled.span`
  font-size: 1rem;
  font-weight: 900;
  text-decoration: underline;
`;

const ButtonSpan = styled.span`
  background-color: #c5c6d0;
  padding: 3px;
  border-radius: 7px;
  &:hover {
    cursor: pointer;
  }
`;

const DeleteIconSpan = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

export default Wishlist;
