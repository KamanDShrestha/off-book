import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';
import { toast } from 'react-hot-toast';

export default function useRegisterUser() {
  const registeredUser = useMutation({
    mutationFn: (data) =>
      axiosInstance.post('/api/register', data).then((res) => res.data),
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      //   toast.error(
      //     'The user cannot be registered. Please try again with valid credentials.'
      //   );
    },
  });
  return registeredUser;
}
