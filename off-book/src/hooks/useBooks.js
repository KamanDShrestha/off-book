import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';

function useBooks(fetchQuery) {
  console.log(fetchQuery);
  const books = useQuery({
    queryKey: ['books', fetchQuery],
    queryFn: () =>
      axiosInstance
        .get('/books', {
          params: {
            genre: fetchQuery?.selectedGenre,
            sortByPrice: fetchQuery?.sortPrice,
          },
        })
        .then((res) => res.data),
  });
  return books;
}
export default useBooks;
