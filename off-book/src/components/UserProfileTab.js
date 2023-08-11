import React from 'react';
import { FaPersonBooth } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const UserProfileTab = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  function handleSelect(e) {
    console.log(e.target.value);
    if (e.target.value === 'logout') {
      localStorage.removeItem('userInfo');
    }
    navigate('/login');
  }

  return (
    <div>
      👦🏻
      <StyledSelect defaultValue={userInfo.name} onChange={handleSelect}>
        <option value='name'>{userInfo.name}</option>
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
