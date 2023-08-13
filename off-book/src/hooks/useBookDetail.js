import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';
function useBookDetail(bookId) {
  console.log(bookId);
  const bookDetail = useQuery({
    queryKey: ['book', bookId],
    queryFn: () =>
      axiosInstance.get(`/api/book/${bookId}`).then((res) => {
        console.log(res.data);
        return res.data;
      }),
  });
  return bookDetail;
}

export default useBookDetail;
