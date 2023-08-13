import React from 'react';
import { styled, css } from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useWishListContext } from '../contexts/WishListContextProvider';
const BookCard = ({ bookInfo }) => {
  const navigate = useNavigate();

  const { saveWishList } = useWishListContext();

  function handleWishClick() {
    saveWishList(bookInfo);
  }

  return (
    <BookContainer>
      <ImageContainer src={bookInfo.imageLink} />

      <BookTitle onClick={() => navigate(`book/${bookInfo._id}`)}>
        {bookInfo.title}
      </BookTitle>

      <BookAuthor>By: {bookInfo.author}</BookAuthor>
      <AddToWishButton onClick={handleWishClick}>
        Add to Wishlist
      </AddToWishButton>
    </BookContainer>
  );
};

const BookContainer = styled.div`
  height: 72vh;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.img`
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
`;

const BookTitle = styled.span`
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 0px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    cursor: pointer;
  }
`;

const BookAuthor = styled.p`
  margin-top: 2px;
  font-size: x-small;
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

export default BookCard;
