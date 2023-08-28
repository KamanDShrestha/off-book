import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthenticationContext } from '../contexts/AuthenticationContextProvider';
import { styled } from 'styled-components';
import { useLocation } from 'react-router-dom';
import UserProfileTab from './UserProfileTab';
import { FaBookOpen, FaSearch } from 'react-icons/fa';
import { useWishListContext } from '../contexts/WishListContextProvider';
import getFromLocalStorage from '../helpers/getFromLocalStorage';

import { useFetchContext } from '../contexts/FetchQueryProvider';
const NavBar = () => {
  const [showSearch, setShowSearch] = useState(false);

  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { isInHome, setIsInHome } = useAuthenticationContext();
  const location = useLocation();
  const { fetchQuery, setFetchQuery } = useFetchContext();
  useEffect(() => {
    setIsInHome(
      () => location.pathname !== '/signup' && location.pathname !== '/login'
    );
  }, [location, setIsInHome]);

  useEffect(() => {
    function setSearch(e) {
      if (e.key === 'Enter') {
        setFetchQuery(() => ({
          ...fetchQuery,
          searchQuery: inputRef.current.value,
        }));
        navigate('/categories');
      }
    }

    document.addEventListener('keydown', setSearch);
  }, []);

  const userInfo = getFromLocalStorage('userInfo') || null;
  const { wishList } = useWishListContext();

  const isAdmin = userInfo ? (userInfo.role === 'admin' ? true : false) : false;

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

          {isInHome && !showSearch && (
            <>
              {isAdmin ? (
                <StyledNavLink to={'/booksAdd'}>Books➕➕</StyledNavLink>
              ) : (
                <StyledNavLink to={'/categories'}>Categories</StyledNavLink>
              )}

              {!isAdmin ? (
                <StyledNavLink to={'/wishlist'}>
                  {wishList.length !== 0 && (
                    <span
                      style={{
                        backgroundColor: 'red',
                        paddingLeft: '0.3rem',
                        paddingRight: '0.3rem',
                        borderRadius: '10px',
                        color: 'white',
                        marginRight: '4px',
                      }}
                    >
                      {wishList.length}
                    </span>
                  )}
                  Wishlist
                </StyledNavLink>
              ) : (
                <StyledNavLink to={'/users'}>Users</StyledNavLink>
              )}

              <StyledNavLink to={'/blog'}>Blog</StyledNavLink>

              <StyledNavLink to={'/desc'}>About Us</StyledNavLink>

              {userInfo ? (
                <UserProfileTab />
              ) : (
                <StyledNavLink to={'/login'}>Login</StyledNavLink>
              )}
            </>
          )}

          <SearchDiv>
            {showSearch && <input ref={inputRef} />}
            <FaSearch onClick={() => setShowSearch((search) => !search)} />
          </SearchDiv>
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
  align-items: center;
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

const SearchDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
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
