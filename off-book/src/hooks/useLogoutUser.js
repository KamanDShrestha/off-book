import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';
import { toast } from 'react-hot-toast';

function useLogoutUser() {
  const loggedOutUser = useMutation({
    mutationFn: () =>
      axiosInstance
        .post('/api/logout', '', { withCredentials: true })
        .then((res) => res.data),
    onSuccess: (data) => toast.success(data.message),
    onError: (data) => toast.error(data.response.data.message),
  });
  return loggedOutUser;
}

export default useLogoutUser;
