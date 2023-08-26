import React, { useEffect } from 'react';
import { FaPersonBooth } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useWishListContext } from '../contexts/WishListContextProvider';
import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import useLogoutUser from '../hooks/useLogoutUser';
import useWishlists from '../hooks/useWishlists';
import useWishlistAdd from '../hooks/useWishlistAdd';
import getWishListFromLocalStorage from '../helpers/getWishListFromLocalStorage';

const UserProfileTab = () => {
  const navigate = useNavigate();
  const userInfo = getFromLocalStorage('userInfo');
  const { dispatch } = useWishListContext();
  const { mutate } = useLogoutUser();
  const { mutate: addToWishlist, status } = useWishlistAdd();
  console.log('in userprofiletab userinfo', userInfo);
  console.log(userInfo.id);
  const { data: wishlist } = useWishlists(userInfo.id);

  console.log('in userprofile tab', wishlist);

  useEffect(() => {
    dispatch({
      type: 'setWishList',
      payload: { wishlist: wishlist?.addedBooks, user: userInfo },
    });
  }, [wishlist]);

  console.log(userInfo);
  function handleSelect(e) {
    console.log(e.target.value);
    if (e.target.value === 'logout') {
      const recentWishlist = getWishListFromLocalStorage();
      console.log('recent wishlist', recentWishlist);
      addToWishlist({ user: userInfo.id, addedBooks: recentWishlist });
      localStorage.removeItem('userInfo');
      // removeWishList();
      dispatch({
        type: 'saveToSpecific',
        payload: userInfo.email.split('@')[0],
      });

      if (status === 'success') {
        mutate();
      }
      navigate('/login');
    } else {
      navigate('/profile');
    }
  }

  return (
    <div>
      👦🏻
      <StyledSelect defaultValue={userInfo.firstName} onChange={handleSelect}>
        <option value='name'>{userInfo.firstName}</option>
        <option value='profile'>Profile</option>
        <option value='logout'>Log out</option>
      </StyledSelect>
    </div>
  );
};

const StyledSelect = styled.select`
  font-size: 1rem;
  font-weight: 900;
  margin-right: 9px;
  color: grey;
  border: none;
`;

export default UserProfileTab;
