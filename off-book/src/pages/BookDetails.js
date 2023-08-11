import React from 'react';
import { useSearchParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useSearchParams();
  console.log(id);

  return <div>BookDetails</div>;
};

export default BookDetails;
