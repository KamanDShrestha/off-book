import React from 'react';

import BookCard from '../components/BookCard';

import { css, styled } from 'styled-components';

import sineater from '../assets/bookcover01.jpeg';
import million from '../assets/bookcover02.jpeg';
import berlin from '../assets/bookcover03.jpeg';

import Header from '../components/Header';

import oldbooks from '../assets/oldbooks.jpg';
import Footer from '../components/Footer';

import useBooks from '../hooks/useBooks';
import Loader from '../components/Loader';

const API_KEY = 'AIzaSyC2FifrFWAqtlZx1OvZM_ULYpQco8FeetY';
const Home = () => {
  // const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   async function getBooks() {
  //     const books = await axios
  //       .get('http://localhost:8000/books')
  //       .then((res) => res.data);
  //     console.log(books);
  //     setBooks(books);
  //   }
  //   getBooks();
  // }, []);

  const { data: books, isLoading } = useBooks();
  require('react-dom');
  window.React2 = require('react');
  console.log('debugging', window.React1 === window.React2);
  const bookCovers = [sineater, million, berlin];
  return (
    <>
      <FirstLayer>
        <Text>
          <Heading>Find your next book !</Heading>
          <p>Here's your next catalogue of books that you can't put down! </p>
        </Text>

        {bookCovers.map((cover, index) => (
          <FirstLayerImageHolder
            src={cover}
            type={index % 2 !== 0 ? 'upside' : 'normal'}
          />
        ))}
      </FirstLayer>

      <SecondLayer>
        <Header>Best Sellers</Header>

        {isLoading ? (
          <Loader />
        ) : (
          <SecondLayerBookContainer>
            {books.map((bookInfo) => (
              <BookCard bookInfo={bookInfo} />
            ))}
          </SecondLayerBookContainer>
        )}
      </SecondLayer>

      <ThirdLayer>
        <ThirdLayerImageContainer>
          <ThirdLayerText>Boooks Fair</ThirdLayerText>
          <ThirdLayerText as={'p'}>Boo with a cause</ThirdLayerText>
        </ThirdLayerImageContainer>
        <ThirdLayerText>Boooks Fair </ThirdLayerText>
        <ThirdLayerText as={'p'}>Boo with a cause</ThirdLayerText>
      </ThirdLayer>

      <Footer />
    </>
  );
};

const Heading = styled.h1`
  font-size: 5.5vw;
  margin-bottom: 0;
`;

const FirstLayer = styled.div`
  height: 86vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #676060;
`;

const SecondLayer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const ThirdLayer = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #676060;

  &:hover {
    & > h1,
    & > p {
      z-index: 4;
      transform: scale(1.2);
    }
  }
`;

const ThirdLayerImageContainer = styled.div`
  background-color: #676060;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: whitesmoke;
  background-image: url(${oldbooks});
  background-repeat: no-repeat;
  background-size: cover;

  filter: blur(5px);
  margin: auto;
  &:hover {
    & > h1,
    & > p {
      display: none;
    }
  }
`;

const ThirdLayerText = styled.h1`
  position: absolute;
  margin: auto;
  font-weight: bolder;
  color: whitesmoke;
  z-index: -1;
  transition: all;
  transition-duration: 0.4s;
  ${(props) =>
    props.as === 'p' &&
    css`
      top: 60%;
      font-size: medium;
      font-weight: 400;
    `}
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
`;

const FirstLayerImageHolder = styled.div`
  ${(props) => css`
    background-image: url(${props.src});
  `}

  ${(props) =>
    props.type === 'upside' &&
    css`
      border-radius: 0 0 600px 600px;
    `}

    ${(props) =>
    props.type === 'normal' &&
    css`
      border-top-left-radius: 100%;
      border-top-right-radius: 100%;
    `}
  height: 40vh;
  background-repeat: no-repeat;
  background-size: cover;
  width: 220px;
  margin: 20px;
`;

export const SecondLayerBookContainer = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 30px;

  margin: auto;
  > * {
    padding: 10px;
    max-height: auto; /* Set a maximum height */
    overflow: auto;
  }
`;

export default Home;

/* display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 15px;
  gap: 3rem; */
