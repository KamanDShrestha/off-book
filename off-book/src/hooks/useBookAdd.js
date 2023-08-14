import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';
import { toast } from 'react-hot-toast';

export default function useBookAdd() {
  const queryClient = useQueryClient();
  const insertedBook = useMutation({
    mutationFn: (data) =>
      axiosInstance
        .post('/api/books', data, { withCredentials: true })
        .then((res) => res.data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(['books']);
    },
    onError: (data) => toast.error(data.response.data.message),
  });
  return insertedBook;
}
