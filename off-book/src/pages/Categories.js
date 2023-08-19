import React, { useEffect, useState, useRef } from 'react';
import { styled } from 'styled-components';
import useBooks from '../hooks/useBooks';
import { SecondLayerBookContainer } from './Home';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
// import useGenreAdd from '../hooks/useGenreAdd';
import useGenres from '../hooks/useGenres';
import Header from '../components/Header';
const Categories = () => {
  const selectedGenre = useRef('');
  const sortPrice = useRef('');
  const [fetchQuery, setFetchQuery] = useState({
    selectedGenre: '',
    sortPrice: '',
  });

  const { data: books, isLoading: isGettingBooks } = useBooks(fetchQuery);
  const { data: genres, isLoading: isGettingGenres } = useGenres();

  console.log('Selected Genre', selectedGenre);

  function handleSelection(e) {
    console.log(e.target.innerText);
    if (e.target.innerText === 'All') {
      selectedGenre.current = '';
    } else {
      selectedGenre.current = e.target.innerText;
    }
    setFetchQuery((fetchQuery) => ({
      ...fetchQuery,
      selectedGenre: selectedGenre.current,
    }));
  }

  function handleSortSelection(e) {
    sortPrice.current = e.target.value;
    setFetchQuery((fetchQuery) => ({
      ...fetchQuery,
      sortPrice: sortPrice.current,
    }));
  }

  return (
    <Container>
      {isGettingGenres ? (
        <Loader />
      ) : (
        <SideGenres>
          <AllRow onClick={handleSelection} key={'All'}>
            All
          </AllRow>
          {genres.map((genre) =>
            selectedGenre.current !== genre.genre ? (
              <GenreRow onClick={handleSelection} key={genre.genre}>
                {genre.genre}
              </GenreRow>
            ) : (
              <SelectedRow onClick={handleSelection} key={genre.genre}>
                {genre.genre}
              </SelectedRow>
            )
          )}
        </SideGenres>
      )}
      <main>
        <SortTab>
          <div>
            <SelectTab defaultValue={sortPrice} onChange={handleSortSelection}>
              <option value={''}>Sort By Price</option>
              <option value={'Ascending'}>Ascending</option>
              <option value={'Descending'}>Descending</option>
            </SelectTab>
          </div>
        </SortTab>
        {selectedGenre.current ? (
          <h1>{selectedGenre.current} books</h1>
        ) : (
          <h1>All books</h1>
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
      </main>
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
  border-radius: 10px;
  background-color: #f4f3e6;
  height: 82vh;
  overflow: scroll;
`;

const AllRow = styled.p`
  cursor: pointer;
`;

const GenreRow = styled.p`
  border: 2px #c8c17e;

  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
`;
const SelectedRow = styled.p`
  border: 2px #c8c17e;
  font-weight: bolder;
  font-size: large;
  border-radius: 10px;
  text-decoration: underline;
  cursor: pointer;
`;

const SortTab = styled.div`
  display: flex;
  padding: 10px;
`;

const SelectTab = styled.select`
  padding: 10px;
  margin: 2px;
  border-radius: 20px;
`;

export default Categories;
