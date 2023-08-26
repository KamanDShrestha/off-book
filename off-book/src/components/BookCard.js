import React from 'react';
import { styled, css } from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useWishListContext } from '../contexts/WishListContextProvider';
import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider';
import useBookDelete from '../hooks/useBookDelete';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import formatCurrency from '../helpers/formatCurrency';
const BookCard = ({ bookInfo }) => {
  const navigate = useNavigate();

  // const { saveWishList } = useWishListContext();
  const { dispatch } = useWishListContext();
  const userInfo = getFromLocalStorage('userInfo');

  const { mutate, isLoading: isDeleting } = useBookDelete();

  //checking if the logged in user is admin
  const isAdmin = userInfo ? (userInfo.role === 'admin' ? true : false) : false;

  function handleWishClick() {
    dispatch({
      type: 'saveWishList',
      payload: { email: userInfo.email.split('@')[0], book: bookInfo },
    });
  }

  function handleDeleteClick() {
    mutate(bookInfo.isbn);
  }

  return (
    <BookContainer style={isDeleting ? { filter: 'grayscale(100%)' } : {}}>
      {/* <div style={{ height: '80%' }}> */}
      <ImageContainer src={bookInfo.imageLink} />
      {/* </div> */}

      <BookDetails>
        <BookTitle onClick={() => navigate(`/book/${bookInfo._id}`)}>
          {bookInfo.title}
        </BookTitle>

        <BookAuthor>By: {bookInfo.author}</BookAuthor>
        <span>{formatCurrency(bookInfo.price)}</span>
      </BookDetails>

      {!isAdmin ? (
        <AddToWishButton
          onClick={handleWishClick}
          style={{ whiteSpace: 'nowrap' }}
        >
          Add to Wishlist
        </AddToWishButton>
      ) : (
        <DeleteButton
          onClick={handleDeleteClick}
          style={{ whiteSpace: 'nowrap' }}
        >
          Delete Book 🗑️
        </DeleteButton>
      )}
    </BookContainer>
  );
};

const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  position: relative;
  width: auto;
`;

const ImageContainer = styled.img`
  overflow: hidden;
  border-radius: 10px;
  width: 100%;
  /* width: auto; */
`;

const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const BookTitle = styled.p`
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
  }
`;

const BookAuthor = styled.p`
  margin-top: 2px;
  font-size: x-small;
  width: 100%;
`;

const AddToWishButton = styled.button`
  padding: 8px;
  width: 40%;
  margin: auto;
  border-radius: 20px;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #676060;
  color: whitesmoke;
  font-family: Poppins;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px;
`;

const DeleteButton = styled.button`
  padding: 8px;
  width: 40%;
  margin: auto;
  border-radius: 20px;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #676060;
  color: whitesmoke;
  font-family: Poppins;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px;
`;

export default BookCard;
