import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';
import { toast } from 'react-hot-toast';

function usePlaceOrder() {
  const placedOrder = useMutation({
    mutationFn: (data) =>
      axiosInstance
        .post('/api/newOrder', data, { withCredentials: true })
        .then((res) => res.data),
    onSuccess: (data) => toast.success(data.message),
  });
  return placedOrder;
}

export default usePlaceOrder;
