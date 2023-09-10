import { useMutation, useQuery } from '@tanstack/react-query';

import axios from 'axios';
import { usePaymentContext } from '../contexts/PaymentContextProvider';
import useUpdatePayment from './useUpdatePayment';
import { useQueryClient } from '@tanstack/react-query';

const options = {
  headers: {
    Authorization: 'Key 08b8356ee1a84d0e87f1c9b69bf3a838',
    'Content-Type': 'application/json',
  },
};

function useAuthPayment(pidxOrder) {
  // const { pidx } = usePaymentContext();
  const { mutate: updatePayment, isLoading: isUpdating } = useUpdatePayment();
  const queryClient = useQueryClient();

  const paymentStatus = useQuery({
    queryKey: ['payment', pidxOrder],
    queryFn: () =>
      axios
        .post(
          'https://a.khalti.com/api/v2/epayment/lookup/',
          { pidx: pidxOrder.pidx },
          options
        )
        .then((res) => res.data),
    onSuccess: (data) => {
      if (data.status === 'Completed') {
        updatePayment(pidxOrder.orderId, {
          onSuccess: () => {
            queryClient.invalidateQueries(`[order, ${pidxOrder.orderId}]`);
            pidxOrder({ pidx: '', orderId: '' });
          },
        });
      }
    },
    refetchInterval: 10 * 60 * 1000,
  });
  return paymentStatus;
}

export default useAuthPayment;
