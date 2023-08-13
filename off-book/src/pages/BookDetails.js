import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';
import useBookDetail from '../hooks/useBookDetail';
import css from 'styled-components';
import CollapsingText from '../components/CollapsingText';
import Button from '../components/Button';
import { useWishListContext } from '../contexts/WishListContextProvider';
const BookDetails = () => {
  const { id } = useParams();
  console.log(id);

  const { data } = useBookDetail(id);
  console.log(data);

  const { saveWishList } = useWishListContext();

  return (
    <StyledBookDetailContainer>
      <StyledImage src={data?.imageLink} alt={data?.title} />
      <div>
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
          ISBN: {data?.isbn}
        </StyledHeading>
        <Button onButtonClick={() => saveWishList(data)}>
          Add to Wishlist
        </Button>
      </div>
    </StyledBookDetailContainer>
  );
};

const StyledBookDetailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 20px;
  margin: 20px;
  gap: 20px;
`;

const StyledImage = styled.img`
  height: 500px;
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
