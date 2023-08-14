import React from 'react';
import useUsersDetails from '../hooks/useUsersDetails';
import UserCard from '../components/UserCard';
import { Loader } from '../components/Loader';
const Users = () => {
  const { data: users, isLoading } = useUsersDetails();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {users?.map((user) => (
            <UserCard user={user} />
          ))}
        </>
      )}
    </div>
  );
};

export default Users;
