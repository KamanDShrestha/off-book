import React from 'react';
import { useForm } from 'react-hook-form';
import { styled } from 'styled-components';
import Button from '../components/Button';
import Header from '../components/Header';
import { useState } from 'react';
import useUpdateUser from '../hooks/useUpdateUser';
const Profile = () => {
  const [isChanging, setIsChanging] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { register, handleSubmit } = useForm({
    defaultValues: { ...userInfo },
  });
  const { mutate, isLoading } = useUpdateUser();
  function handleUpdate(data) {
    console.log(data);
    if (data.password) {
      mutate({
        firstName: data.firstName,
        email: data.email,
        lastName: data.lastName,
        password: data.password,
      });
    } else {
      mutate({
        firstName: data.firstName,
        email: data.email,
        lastName: data.lastName,
      });
    }
  }

  return (
    <>
      <Header>Your Profile</Header>
      <ProfileDiv>
        <ProfilePic>
          <span style={{ fontSize: '200px' }}>👦🏻</span>
        </ProfilePic>

        <ProfileForm onSubmit={handleSubmit(handleUpdate)}>
          <div>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              {...register('firstName')}
              onSelect={() => setIsChanging(true)}
            />
          </div>
          <div>
            <label htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              {...register('lastName')}
              onSelect={() => setIsChanging(true)}
            />
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              {...register('email')}
              onSelect={() => setIsChanging(true)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='text'
              placeholder='Fill in to change the password'
              {...register('password')}
              onSelect={() => setIsChanging(true)}
            />
          </div>
          {/* <div>
          <label htmlFor='firstName'>FirstName</label>
          <input type='text' {...register('firstName')} />
        </div> */}
          <Button disabled={!isChanging || isLoading}>
            {!isLoading ? 'Update Profile' : 'Updating'}
          </Button>
        </ProfileForm>
      </ProfileDiv>
    </>
  );
};

const ProfileDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 70vh;
  margin: auto;
  margin-top: 30px;
  gap: 60px;
`;

const ProfilePic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Profile;
