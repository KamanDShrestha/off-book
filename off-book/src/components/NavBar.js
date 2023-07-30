import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider';

import styles from './NavBar.module.css';
import { styled } from 'styled-components';
import { useLocation } from 'react-router-dom';
import CenteringComponent from './CenteringComponent';

const NavBar = () => {
  const { isInHome, setIsInHome } = useAuthenticationContext();
  const location = useLocation();
  useEffect(() => {
    setIsInHome(
      () => location.pathname !== '/signup' && location.pathname !== '/login'
    );
  }, [location, setIsInHome]);

  return (
    <StyledNavContainer>
      <FirstCenteredDiv>
        <img src={logo} alt='off-book' id='logo' />
      </FirstCenteredDiv>
      <SecondCenteredDiv>
        <StyledNavBar>
          <StyledNavLink to={'/'}>Books</StyledNavLink>
          {isInHome && (
            <>
              <StyledNavLink to={'/categories'}>Catgories</StyledNavLink>

              <StyledNavLink to={'/wishlist'}>Wishlist</StyledNavLink>

              <StyledNavLink to={'/blog'}>Blog</StyledNavLink>

              <StyledNavLink to={'/desc'}>About Us</StyledNavLink>

              <StyledNavLink to={'/login'}>Login</StyledNavLink>
            </>
          )}
        </StyledNavBar>
      </SecondCenteredDiv>
      <ThirdCenteredDiv>
        <SearchInput placeholder='Search for books...' />
      </ThirdCenteredDiv>
    </StyledNavContainer>
  );
};

const StyledNavContainer = styled.div`
  display: grid;
  grid-template-columns: auto-fill auto-fill auto-fill;
  margin: 10px;
`;

const StyledNavBar = styled.ul`
  margin: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    font-size: 1rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
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
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 2/3;
`;

const ThirdCenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 3/4;
`;
export default NavBar;
