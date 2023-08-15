import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';

function useBooks(genre) {
  console.log(genre);
  const books = useQuery({
    queryKey: ['books', genre],
    queryFn: () =>
      axiosInstance
        .get('/books', {
          params: {
            genre,
          },
        })
        .then((res) => res.data),
  });
  return books;
}
export default useBooks;
