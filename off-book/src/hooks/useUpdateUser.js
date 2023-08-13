import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';
import setToLocalStorage from '../helpers/setToLocalStorage';
import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider';
import getFromLocalStorage from '../helpers/getFromLocalStorage';

export default function useUpdateUser() {
  const { setUserInfo } = useAuthenticationContext();
  const updatedUser = useMutation({
    mutationFn: (data) =>
      axiosInstance
        .post('/api/profile', data, {
          withCredentials: true,
        })
        .then((res) => res.data),
    onSuccess: (data) => {
      console.log(data);
      toast.success('Your profile details have been updated');
      setToLocalStorage('userInfo', {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      setUserInfo(getFromLocalStorage('userInfo'));
    },
  });
  return updatedUser;
}
