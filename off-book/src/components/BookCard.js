import React from 'react';
import { styled, css } from 'styled-components';
const BookCard = ({ bookInfo }) => {
  return (
    <BookContainer>
      <ImageContainer src={bookInfo.imageLink} />
      <BookTitle>{bookInfo.title}</BookTitle>
      <BookAuthor>By: {bookInfo.author}</BookAuthor>
    </BookContainer>
  );
};

const BookContainer = styled.div`
  width: 22vw;
  height: 500px;
`;

const ImageContainer = styled.div`
  ${(props) => css`
    background-image: url(${props.src});
  `}
  height: 64vh;
  width: 22vw;
  background-size: cover;
  background-repeat: no-repeat;
`;

const BookTitle = styled.span`
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookAuthor = styled.p`
  margin-top: 2px;
  font-size: x-small;
`;

export default BookCard;
