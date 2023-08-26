import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';
import { toast } from 'react-hot-toast';

function useWishlistAdd() {
  const wishlists = useMutation({
    mutationFn: (data) =>
      axiosInstance
        .post('/api/addWishList', data, { withCredentials: true })
        .then((res) => res.data),
    onSuccess: (data) => toast.success(data.message),
  });
  return wishlists;
}

export default useWishlistAdd;
