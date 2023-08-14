import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';
import { toast } from 'react-hot-toast';

function useDeleteUser() {
  const queryClient = useQueryClient();
  const deletedUser = useMutation({
    mutationFn: (email) =>
      axiosInstance
        .delete(`/api/users/${email}`, { withCredentials: true })
        .then((res) => res.data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(['users']);
    },
  });
  return deletedUser;
}

export default useDeleteUser;
