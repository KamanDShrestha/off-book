import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';

function useGenreAdd() {
  const addedGenre = useMutation({
    mutationFn: (data) =>
      axiosInstance
        .post('/api/genres', data, { withCredentials: true })
        .then((res) => res.data),
  });
  return addedGenre;
}

export default useGenreAdd;
