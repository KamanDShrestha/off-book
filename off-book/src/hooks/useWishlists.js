import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';

function useWishlists(id) {
  console.log('provided wishlist', id);
  const wishlist = useQuery({
    queryKey: ['wishlist', id],
    queryFn: () =>
      axiosInstance
        .get(`/api/wishlist/${id}`, { withCredentials: true })
        .then((res) => res.data),
  });
  return wishlist;
}

export default useWishlists;
