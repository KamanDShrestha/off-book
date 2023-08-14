import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';
import { toast } from 'react-hot-toast';

function useBookDelete() {
  const queryClient = useQueryClient();
  const deletedBook = useMutation({
    mutationFn: (isbn) =>
      axiosInstance
        .post(`/api/books/${isbn}`, '', { withCredentials: true })
        .then((res) => res.data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(['books']);
    },
    onError: (data) => toast.error(data.response.data.message),
  });
  return deletedBook;
}

export default useBookDelete;
