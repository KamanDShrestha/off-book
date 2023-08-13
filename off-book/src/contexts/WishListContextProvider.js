import React, { useContext, useEffect, useRef, useState } from 'react';
import { createContext } from 'react';
import Wishlist from '../pages/Wishlist';

const WishListContext = createContext();

const WishListContextProvider = ({ children }) => {
  const wishList = useRef(
    localStorage.getItem('wishlist')
      ? JSON.parse(localStorage.getItem('wishlist'))
      : []
  );
  const [numberWishList, setNumberWishList] = useState(
    wishList?.current.length || 0
  );

  function saveWishList(book) {
    const alreadyExists = wishList.current.find(
      (inBook) => inBook._id === book._id
    );

    if (alreadyExists) {
      return;
    }
    wishList.current = [...wishList.current, book];
    localStorage.setItem('wishlist', JSON.stringify([...wishList.current]));

    setNumberWishList(wishList.current.length);
  }

  function removeWishList() {
    wishList.current = [];
    localStorage.removeItem('wishlist');
    setNumberWishList(0);
  }

  return (
    <WishListContext.Provider
      value={{ wishList, saveWishList, numberWishList, removeWishList }}
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
