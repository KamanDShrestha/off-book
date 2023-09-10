import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';

function usePayKhalti() {
  const paidBill = useMutation({
    mutationFn: (orderDetails) =>
      axiosInstance
        .post(`/api/pay/${orderDetails._id}`, orderDetails, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });
  return paidBill;
}

export default usePayKhalti;
