import React from 'react';
import { FaPersonBooth } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useWishListContext } from '../contexts/WishListContextProvider';
import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import useLogoutUser from '../hooks/useLogoutUser';

const UserProfileTab = () => {
  const navigate = useNavigate();
  const userInfo = getFromLocalStorage('userInfo');
  const { removeWishList } = useWishListContext();
  const { mutate } = useLogoutUser();

  console.log(userInfo);
  function handleSelect(e) {
    console.log(e.target.value);
    if (e.target.value === 'logout') {
      localStorage.removeItem('userInfo');
      removeWishList();
      mutate();
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
