import React from 'react';
import useUsersDetails from '../hooks/useUsersDetails';
import UserCard from '../components/UserCard';
const Users = () => {
  const { data: users, isLoading } = useUsersDetails();

  return (
    <div>
      {users?.map((user) => (
        <UserCard user={user} />
      ))}
    </div>
  );
};

export default Users;
