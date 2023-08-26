import getFromLocalStorage from './getFromLocalStorage';

export default function getWishListFromLocalStorage() {
  const userInfo = getFromLocalStorage('userInfo');
  return getFromLocalStorage(`${userInfo.email.split('@')[0]}-wishlist`);
}
