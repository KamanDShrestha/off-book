import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';

function useBooks() {
  const books = useQuery({
    queryKey: ['books'],
    queryFn: () => axiosInstance.get('/books').then((res) => res.data),
  });
  return books;
}
export default useBooks;
