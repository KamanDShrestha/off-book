import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import Header from '../components/Header';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import useBookAdd from '../hooks/useBookAdd';
import useGenreAdd from '../hooks/useGenreAdd';
const AddBooks = () => {
  const { register, handleSubmit, watch } = useForm();
  const { mutate: addNewBook } = useBookAdd();
  const { mutate: addNewGenre } = useGenreAdd();
  const providedImageLink = watch('imageLink', '');
  function handleBookAdd(data) {
    const genreList = data.genre.split(',');

    console.log(data);
    console.log(data.genre);
    addNewGenre(data.genre);
    addNewBook({ ...data, genre: genreList });
  }

  return (
    <BookAddContainer>
      <BookCoverContainer>
        {providedImageLink ? (
          <CoverContainer>
            <Header>Book Cover</Header>
            <AddImage src={providedImageLink} />
          </CoverContainer>
        ) : (
          <p>You can view your registered picture</p>
        )}
      </BookCoverContainer>
      <BookForm onSubmit={handleSubmit(handleBookAdd)}>
        <Header>Add Books - You surely can!</Header>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor='title'>Title</label>
          <input type='text' {...register('title')} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor='author'>Author</label>
          <input type='text' {...register('author')} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor='description'>Description</label>
          <textarea type='text' {...register('description')} rows={10} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor='isbn'>ISBN </label>
          <input type='text' {...register('isbn')} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor='price'>Price</label>
          <input type='number' {...register('price')} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor='genre'>Genre</label>
          <input
            type='text'
            placeholder='provide multiple genres by seperating genres by commas'
            {...register('genre')}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor='published'>Published Date</label>
          <input type='date' {...register('published')} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor='publisher'>Publisher</label>
          <input type='text' {...register('publisher')} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor='imageLink'>Image Link</label>
          <input type='text' {...register('imageLink')} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor='website'>Website</label>
          <input type='text' {...register('website')} />
        </div>
        <Button>Add Book</Button>
      </BookForm>
    </BookAddContainer>
  );
};

const BookAddContainer = styled.div`
  display: grid;
  grid-template-columns: 45% 55%;
  gap: 20px;
  padding: 20px;
  width: 100vw;
  height: 110dvh;
  margin: 30px;
`;

const BookForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  column-gap: '20px';
  overflow-y: scroll;
  margin: 10px;
`;

const BookCoverContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
`;

const AddImage = styled.img`
  height: auto;
  width: 100%;
`;

export default AddBooks;
