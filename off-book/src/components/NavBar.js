import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider';

import styles from './NavBar.module.css';
import { styled } from 'styled-components';
import { useLocation } from 'react-router-dom';
import CenteringComponent from './CenteringComponent';
import UserProfileTab from './UserProfileTab';
import { FaBookOpen, FaSearch } from 'react-icons/fa';
const NavBar = () => {
  const { isInHome, setIsInHome } = useAuthenticationContext();
  const location = useLocation();
  useEffect(() => {
    setIsInHome(
      () => location.pathname !== '/signup' && location.pathname !== '/login'
    );
  }, [location, setIsInHome]);

  const userInfo = localStorage.getItem('userInfo') || null;

  return (
    <StyledNavContainer>
      <FirstCenteredDiv>
        <img src={logo} alt='off-book' id='logo' />
      </FirstCenteredDiv>

      <SecondCenteredDiv>
        <StyledNavBar>
          <StyledNavLink to={'/'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <FaBookOpen /> Books
            </div>
          </StyledNavLink>
          {isInHome && (
            <>
              <StyledNavLink to={'/categories'}>Catgories</StyledNavLink>

              <StyledNavLink to={'/wishlist'}>Wishlist</StyledNavLink>

              <StyledNavLink to={'/blog'}>Blog</StyledNavLink>

              <StyledNavLink to={'/desc'}>About Us</StyledNavLink>

              {userInfo ? (
                <UserProfileTab />
              ) : (
                <StyledNavLink to={'/login'}>Login</StyledNavLink>
              )}
              <FaSearch />
            </>
          )}
        </StyledNavBar>
      </SecondCenteredDiv>

      {/* <ThirdCenteredDiv>
        <SearchInput placeholder='Search for books...' />
      </ThirdCenteredDiv> */}
    </StyledNavContainer>
  );
};

const StyledNavContainer = styled.div`
  display: flex;
  /* grid-template-columns: repeat(2, 1fr); */
  justify-content: space-between;
  margin: 10px;
  gap: 20px;
  padding: 10px 30px;
`;

const StyledNavBar = styled.div`
  margin: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    font-size: 1rem;
    font-weight: 500;
    /* padding: 1.2rem 2.4rem; */
    color: grey;
    text-decoration: none;
  }
  &:active,
  &.active {
    font-weight: 500;
    color: black;
    text-decoration: underline;
    transition: all 0.3s;
    transition-duration: 0.3s;
  }
`;

const SearchInput = styled.input`
  padding: 0.2rem 1rem;
  width: 300px;
  outline: none;
`;

export const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FirstCenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1/2;
`;

const SecondCenteredDiv = styled.div`
  width: 60vw;
`;

const ThirdCenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 3/4;
`;
export default NavBar;
