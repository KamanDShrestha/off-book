import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';
import { toast } from 'react-hot-toast';
import setToLocalStorage from '../helpers/setToLocalStorage';
import { useNavigate } from 'react-router-dom';

export default function useRegisterUser() {
  const navigate = useNavigate();

  const registeredUser = useMutation({
    mutationFn: (data) =>
      axiosInstance
        .post('/api/register', data, { withCredentials: true })
        .then((res) => res.data),
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
      setToLocalStorage('userInfo', data);
      navigate('/');
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
