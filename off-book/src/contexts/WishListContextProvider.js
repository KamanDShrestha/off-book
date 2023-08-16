import React, { useContext, useReducer } from 'react';
import { createContext } from 'react';
import { useAuthenticationContext } from './AuthenticationContextProvider';
import setToLocalStorage from '../helpers/setToLocalStorage';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import { toast } from 'react-hot-toast';

const WishListContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'setWishList':
      state = localStorage.getItem(
        `${action.payload.user.email.split('@')[0]}-wishlist`
      )
        ? getFromLocalStorage(
            `${action.payload.user.email.split('@')[0]}-wishlist`
          )
        : [];
      return state;
    case 'increaseQuantity':
      state = state.map((book) =>
        book.isbn === action.payload.book.isbn
          ? { ...book, quantity: book.quantity + 1 }
          : book
      );
      setToLocalStorage(`${action.payload.email}-wishlist`, state);
      return state;
    case 'decreaseQuantity':
      if (action.payload.book.quantity <= 1) {
        return state;
      }
      state = state.map((book) =>
        book.isbn === action.payload.book.isbn
          ? { ...book, quantity: book.quantity - 1 }
          : book
      );
      console.log(state);
      setToLocalStorage(`${action.payload.email}-wishlist`, state);
      return state;

    case 'saveWishList':
      const alreadyExists = state.find(
        (inBook) => inBook._id === action.payload.book._id
      );
      if (alreadyExists) {
        toast.error(
          'The book has already been added to wishlist. You can change the quantity from Wishlist page.'
        );
        return state;
      }
      state = [...state, { ...action.payload.book, quantity: 1 }];
      setToLocalStorage(`${action.payload.email}-wishlist`, state);
      toast.success('The book has been added to wishlist.');
      return state;
    case 'saveToSpecific':
      setToLocalStorage(`${action.payload}-wishlist`, state);
      return [];
    default:
      return state;
  }
}

const WishListContextProvider = ({ children }) => {
  const { userInfo } = useAuthenticationContext();

  console.log('inWishListContext', userInfo);
  const initialState = localStorage.getItem(
    `${userInfo.email?.split('@')[0]}-wishlist`
  )
    ? JSON.parse(
        localStorage.getItem(`${userInfo.email?.split('@')[0]}-wishlist`)
      )
    : [];
  const [wishList, dispatch] = useReducer(reducer, initialState);

  console.log(wishList);
  //   useEffect(() => {
  //     const wishListStorage = localStorage.getItem(
  //       `${userInfo.email?.split('@')[0]}-wishlist`
  //     )
  //       ? JSON.parse(
  //           localStorage.getItem(`${userInfo.email?.split('@')[0]}-wishlist`)
  //         )
  //       : [];
  //     dispatch({ type: 'setWishList', payload: wishListStorage });
  //   }, [userInfo.email]);

  //   function setWishList() {
  //     const wishListStorage = localStorage.getItem(
  //       `${userInfo.email?.split('@')[0]}-wishlist`
  //     )
  //       ? JSON.parse(
  //           localStorage.getItem(`${userInfo.email?.split('@')[0]}-wishlist`)
  //         )
  //       : [];
  //     dispatch({ type: 'setWishList', payload: wishListStorage });
  //   }

  //   useEffect(() => {
  //     const handleStorageChange = (event) => {
  //       console.log('checking if it event triggering');
  //       console.log(event.key);
  //       if (event.key === `${userInfo.email?.split('@')[0]}-wishlist`) {
  //         const updatedWishList = JSON.parse(event.newValue);
  //         console.log('listening to addition of the new key');
  //         dispatch({ type: 'setWishList', payload: updatedWishList });
  //       }
  //     };

  //     window.addEventListener('custom-storage-event-name', handleStorageChange);
  //     // window.addEventListener('storage', handleStorageChange);

  //     return () => {
  //       window.removeEventListener(
  //         'custom-storage-event-name',
  //         handleStorageChange
  //       );
  //     };
  //   }, [userInfo.email]);

  return (
    <WishListContext.Provider
      value={{
        wishList,
        dispatch,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export function useWishListContext() {
  const context = useContext(WishListContext);
  return context;
}

export default WishListContextProvider;
