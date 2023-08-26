import { useContext, createContext, useReducer, useEffect } from 'react';
import { useWishListContext } from './WishListContextProvider';

const CartContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'setBooksList':
      return {
        ...state,
        booksList: action.payload,
      };

    case 'setShippingAddress':
      return {
        ...state,
        shippingAddress: {
          district: action.payload.district,
          city: action.payload.city,
          address: action.payload.address,
          country: action.payload.country,
        },
      };
    case 'setPayment':
      return { ...state, payment: action.payload };
    default:
      return state;
  }
}

function CartProvider({ children }) {
  //taking the saved wishlist
  const { wishList } = useWishListContext();
  console.log('wishlist in cart context', wishList);
  const initalState = {
    booksList: wishList,
    shippingAddress: { district: '', city: '', address: '', country: '' },
  };

  const [cart, dispatch] = useReducer(reducer, initalState);

  useEffect(() => {
    dispatch({ type: 'setBooksList', payload: wishList });
  }, [wishList]);

  console.log(cart);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  return context;
}

export default CartProvider;
