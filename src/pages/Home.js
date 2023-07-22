import React, { useState } from 'react';
import { useEffect } from 'react';
import BookCard from '../components/BookCard';
import Input from '../components/Input';

const API_KEY = 'AIzaSyC2FifrFWAqtlZx1OvZM_ULYpQco8FeetY';
const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=percy&key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setBooks(data.items));
  }, [searchQuery]);
  console.log(books);
  return (
    <>
      <Input
        value={searchQuery}
        type={'text'}
        name={'search'}
        onTextChange={(e) => e.target.value}
      />
      <ul>
        {books.map((book) => (
          <BookCard bookInfo={book} />
        ))}
      </ul>
    </>
  );
};

export default Home;
