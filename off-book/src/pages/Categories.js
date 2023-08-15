import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import useBooks from '../hooks/useBooks';
import { SecondLayerBookContainer } from './Home';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
// import useGenreAdd from '../hooks/useGenreAdd';
import useGenres from '../hooks/useGenres';
const Categories = () => {
  //   const genres = ['All', 'Mystery', 'Comedy', 'Thriller'];

  const [selectedGenre, setSelectedGenre] = useState('');

  const { data: books, isLoading: isGettingBooks } = useBooks(selectedGenre);
  const { data: genres, isLoading: isGettingGenres } = useGenres();

  console.log('Selected Genre', selectedGenre);

  function handleSelection(e) {
    console.log(e.target.innerText);
    if (e.target.innerText === 'All') {
      setSelectedGenre('');
    } else {
      setSelectedGenre(e.target.innerText);
    }
  }

  return (
    <Container>
      {isGettingGenres ? (
        <Loader />
      ) : (
        <SideGenres>
          <p onClick={handleSelection} key={'All'}>
            All
          </p>
          {genres.map((genre) => (
            <p onClick={handleSelection} key={genre.genre}>
              {genre.genre}
            </p>
          ))}
        </SideGenres>
      )}
      {isGettingBooks ? (
        <Loader />
      ) : (
        <SecondLayerBookContainer>
          {books.map((bookInfo) => (
            <BookCard bookInfo={bookInfo} key={`${bookInfo.isbn}`} />
          ))}
        </SecondLayerBookContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  gap: 20px;
`;

const SideGenres = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: gray;
`;

export default Categories;
