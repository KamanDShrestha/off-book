import { useQuery } from '@tanstack/react-query';

import { axiosInstance } from '../services/axiosInstance';

function useGetOrderById(id) {
  const order = useQuery({
    queryKey: ['order', id],
    queryFn: () =>
      axiosInstance
        .get(`/api/orders/${id}`, { withCredentials: true })
        .then((res) => res.data),
    staleTime: 4 * 1000 * 60,
  });
  return order;
}

export default useGetOrderById;
