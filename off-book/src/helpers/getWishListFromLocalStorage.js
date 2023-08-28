import getFromLocalStorage from './getFromLocalStorage';

export default function getWishListFromLocalStorage() {
  const userInfo = getFromLocalStorage('userInfo');
  const wishlist =
    getFromLocalStorage(`${userInfo.email.split('@')[0]}-wishlist`) || '';
  return wishlist;
}
