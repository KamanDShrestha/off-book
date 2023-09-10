import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../services/axiosInstance';

function useUpdatePayment() {
  const updatedOrder = useMutation({
    mutationFn: (id) =>
      axiosInstance
        .put(`/api/orders/${id}/pay`, {}, { withCredentials: true })
        .then((res) => res.data),
  });
  return updatedOrder;
}
export default useUpdatePayment;
