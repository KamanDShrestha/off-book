import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthenticationContextProvider from './contexts/AuthenticationContextProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import WishListContextProvider from './contexts/WishListContextProvider';
import { ReactQueryDevtools } from 'react-query-devtools';
import FetchQueryProvider from './contexts/FetchQueryProvider';
import CartProvider from './contexts/CartContextProvider';
//making a query client for using react query and provide the values
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthenticationContextProvider>
        <WishListContextProvider>
          <CartProvider>
            <FetchQueryProvider>
              <App />
            </FetchQueryProvider>
          </CartProvider>
        </WishListContextProvider>
      </AuthenticationContextProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
