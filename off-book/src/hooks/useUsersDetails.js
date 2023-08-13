import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';

function useUsersDetails() {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      axiosInstance
        .get('/api/users', { withCredentials: true })
        .then((res) => res.data),
  });
  return users;
}

export default useUsersDetails;
