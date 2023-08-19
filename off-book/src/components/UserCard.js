import React from 'react';
import { styled } from 'styled-components';
import { ProfilePic } from '../pages/Profile';
import useDeleteUser from '../hooks/useDeleteUser';
const UserCard = ({ user }) => {
  const { mutate, isLoading: isDeleting } = useDeleteUser();
  function handleDelete() {
    console.log('Deleting');
    mutate(user.email);
  }
  return (
    <>
      {user.role !== 'admin' && (
        <>
          <UserCardContainer
            style={
              isDeleting
                ? { filter: 'grayscale(100%)', cursor: 'not-allowed' }
                : {}
            }
          >
            <ProfilePic>
              <span style={{ fontSize: '200px' }}>👦🏻</span>
            </ProfilePic>
            <UserDetails>
              <div>
                <span style={{ fontSize: '15px', fontWeight: 'bolder' }}>
                  First Name:{' '}
                </span>
                <span style={{ fontSize: '15px' }}>{user.firstName}</span>
              </div>
              <div>
                <span style={{ fontSize: '15px', fontWeight: 'bolder' }}>
                  Last Name:{' '}
                </span>
                <span style={{ fontSize: '15px' }}>{user.lastName}</span>
              </div>
              <div
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 'bolder' }}>
                  Email:{' '}
                </span>
                <span style={{ fontSize: '15px' }}>{user.email}</span>
              </div>
              <div
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 'bolder' }}>
                  Role:{' '}
                </span>
                <span style={{ fontSize: '15px' }}>{user.role}</span>
              </div>
              <StyledDeleteSpan onClick={handleDelete}>
                Delete 🗑️{' '}
              </StyledDeleteSpan>
            </UserDetails>
          </UserCardContainer>
        </>
      )}
    </>
  );
};

const UserCardContainer = styled.div`
  display: grid;
  background-color: #fffdf6;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 20px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const StyledDeleteSpan = styled.span`
  margin-top: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export default UserCard;
