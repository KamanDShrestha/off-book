import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';

function useGenres() {
  const genres = useQuery({
    queryKey: ['genres'],
    queryFn: () => axiosInstance.get('/api/genres').then((res) => res.data),
  });
  return genres;
}

export default useGenres;
