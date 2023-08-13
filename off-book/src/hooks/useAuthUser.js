import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';
import setToLocalStorage from '../helpers/setToLocalStorage';
import { useNavigate } from 'react-router-dom';

// const { useMutation } = require('@tanstack/react-query');
// const { axiosInstance } = require('../services/axiosInstance');

export default function useAuthUser() {
  const navigate = useNavigate();
  const authenticatedUser = useMutation({
    mutationFn: (data) =>
      axiosInstance
        .post('/api/login', data, {
          withCredentials: true,
        })
        .then((res) => res.data),
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.message);
      setToLocalStorage('userInfo', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
      });
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });
  return authenticatedUser;
}
