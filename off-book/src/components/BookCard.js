import React from 'react';
import { styled, css } from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useWishListContext } from '../contexts/WishListContextProvider';
import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider';
import useBookDelete from '../hooks/useBookDelete';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
const BookCard = ({ bookInfo }) => {
  const navigate = useNavigate();

  // const { saveWishList } = useWishListContext();
  const { dispatch } = useWishListContext();
  const userInfo = getFromLocalStorage('userInfo');

  const { mutate, isLoading } = useBookDelete();

  //checking if the logged in user is admin
  const isAdmin = userInfo ? (userInfo.role === 'admin' ? true : false) : false;
  console.log(isAdmin);

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
    <BookContainer style={isLoading ? { filter: 'grayscale(100%)' } : {}}>
      <ImageContainer src={bookInfo.imageLink} />

      <BookTitle onClick={() => navigate(`book/${bookInfo._id}`)}>
        {bookInfo.title}
      </BookTitle>

      <BookAuthor>By: {bookInfo.author}</BookAuthor>

      {!isAdmin ? (
        <AddToWishButton onClick={handleWishClick}>
          Add to Wishlist
        </AddToWishButton>
      ) : (
        <DeleteButton onClick={handleDeleteClick}>Delete Book 🗑️</DeleteButton>
      )}
    </BookContainer>
  );
};

const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.img`
  overflow: hidden;
  border-radius: 10px;
  /* width: 100%; */
  width: 100%;
  height: 100%;
`;

const BookTitle = styled.p`
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
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
