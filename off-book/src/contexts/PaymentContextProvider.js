import { createContext, useContext, useState } from 'react';
import useAuthPayment from '../hooks/useAuthPayment';
import useUpdatePayment from '../hooks/useUpdatePayment';
import { useQueryClient } from '@tanstack/react-query';

const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {
  const [pidxOrder, setPidx] = useState({});
  const { mutate: updatePayment, isLoading: isUpdating } = useUpdatePayment();
  const { data: authentication, isLoading } = useAuthPayment(pidxOrder);
  const queryClient = useQueryClient();

  //   function usecheckForAuth(pidx, orderId) {
  //     if (authentication.status === 'Completed') {
  //       updatePayment(orderId, {
  //         onSuccess: () => {
  //           queryClient.invalidateQueries(`[order, ${orderId}]`);
  //         },
  //       });
  //     }
  //   }

  return (
    <PaymentContext.Provider value={{ pidxOrder, setPidx }}>
      {children}
    </PaymentContext.Provider>
  );
};

export function usePaymentContext() {
  return useContext(PaymentContext);
}

export default PaymentProvider;
