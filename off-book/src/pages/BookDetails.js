import React from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import useBookDetail from '../hooks/useBookDetail';
import css from 'styled-components';
import CollapsingText from '../components/CollapsingText';
import Button from '../components/Button';
import { useWishListContext } from '../contexts/WishListContextProvider';
import Loader from '../components/Loader';
import useBookDelete from '../hooks/useBookDelete';

import getFromLocalStorage from '../helpers/getFromLocalStorage';
import formatCurrency from '../helpers/formatCurrency';
const BookDetails = () => {
  const { id } = useParams();
  console.log(id);

  const { data, isLoading } = useBookDetail(id);
  console.log(data);

  const { dispatch } = useWishListContext();
  const userInfo = getFromLocalStorage('userInfo');

  const { mutate, isLoading: isDeleting } = useBookDelete();

  const isAdmin = userInfo ? (userInfo.role === 'admin' ? true : false) : false;
  console.log('should be admin', isAdmin);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <StyledBookDetailContainer
          style={isDeleting ? { filter: 'grayscale(100%)' } : {}}
        >
          <StyledImageContainer>
            <StyledImage src={data?.imageLink} alt={data?.title} />
          </StyledImageContainer>
          <StyledBookDetails>
            <StyledHeading variant='title' as={'h1'}>
              {data?.title}
            </StyledHeading>
            <StyledHeading variant='description' as={'h3'}>
              Description
            </StyledHeading>
            <CollapsingText style={{ fontSize: '13px' }}>
              {data?.description}
            </CollapsingText>
            <StyledHeading as={'p'} style={{ fontSize: '15px' }}>
              Price: {formatCurrency(data?.price)}
            </StyledHeading>
            <StyledHeading as={'p'} style={{ fontSize: '15px' }}>
              Genres: {data?.genre.join(', ')}
            </StyledHeading>
            <StyledHeading as={'p'} style={{ fontSize: '15px' }}>
              Author: {data?.author}
            </StyledHeading>
            <StyledHeading as={'p'} style={{ fontSize: '15px' }}>
              ISBN: {data?.isbn}
            </StyledHeading>

            {isAdmin ? (
              <Button onButtonClick={() => mutate(data?.isbn)}>
                Delete book 🗑️
              </Button>
            ) : (
              <Button
                onButtonClick={() =>
                  dispatch({
                    type: 'saveWishList',
                    payload: { email: userInfo.email, book: data },
                  })
                }
              >
                Add to Wishlist
              </Button>
            )}
          </StyledBookDetails>
        </StyledBookDetailContainer>
      )}
    </>
  );
};

const StyledBookDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  padding: 20px;
  margin: 20px;
  gap: 40px;
`;

const StyledImageContainer = styled.div`
  height: 80vh;
`;

const StyledImage = styled.img`
  height: auto;
  width: 100%;
`;

const StyledBookDetails = styled.div`
  height: 80dvh;
  overflow: scroll;
`;

const StyledHeading = styled.p`
  /* ${(props) =>
    props.variant === 'title' &&
    css`
      font-size: 500px;
      color: red;
    `}
  ${(props) =>
    props.variant === 'description' &&
    css`
      font-size: 1cqmin;
    `} */
`;

export default BookDetails;
