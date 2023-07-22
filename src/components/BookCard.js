import React from 'react';

const BookCard = ({ bookInfo }) => {
  return (
    <div style={styles.cardStyles}>
      <img
        src={bookInfo.volumeInfo.imageLinks?.smallThumbnail}
        alt={bookInfo.volumeInfo.title}
      />
      <h2>{bookInfo.volumeInfo.title}</h2>
    </div>
  );
};

const styles = {
  cardStyles: {
    height: '500px',
  },
};

export default BookCard;
