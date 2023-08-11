import React, { useState } from 'react';
import styles from './Login.module.css';
import Header from '../components/Header';
import Button from '../components/Button';
import { NavLink } from 'react-router-dom';
import singleBook from '../assets/singleBook.jpg';
import Input from '../components/Input';
import Card from '../components/Card';
import CenteringComponent from '../components/CenteringComponent';
import bookStack from '../assets/bookStack.jpg';
import { useForm } from 'react-hook-form';
import ErrorText from '../components/ErrorText';
import useAuthUser from '../hooks/useAuthUser';

const Login = () => {
  const { mutate, isLoading, error } = useAuthUser();
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(register);
  console.log(errors);

  function onSubmit(data) {
    console.log(data);
    mutate(data);
  }

  function handleVisibility(e) {
    e.preventDefault();
    setIsVisible((isVisible) => !isVisible);
  }
  return (
    <>
      <CenteringComponent styles={{ justifyContent: 'space-around' }}>
        <Card>
          <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <Header style={{ margin: 'auto' }}>Login to your account</Header>

            <label htmlFor='name'>Email</label>
            <input
              placeholder='Enter your email'
              type='email'
              {...register('email', { required: 'Please provide the email' })}
            />
            {errors.email && <ErrorText message={errors?.email.message} />}

            <label htmlFor='name'>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                placeholder='Enter your password'
                type={isVisible ? 'text' : 'password'}
                {...register('password', { required: true, minLength: 5 })}
              />
              {errors.password?.type === 'required' && (
                <ErrorText message={'Please provide a password'} />
              )}
              {errors.password?.type === 'minLength' && (
                <ErrorText
                  message={'Password should have at least 5 characters.'}
                />
              )}
              <button style={{ ...visibiltyStyles }} onClick={handleVisibility}>
                {isVisible ? (
                  <span style={{ fontSize: '15px' }}> 👀 </span>
                ) : (
                  <span style={{ fontSize: '15px' }}>🕶️</span>
                )}
              </button>
            </div>

            <Button>Login</Button>
          </form>
          <span>
            Haven't got an account?{' '}
            <NavLink to={'/signup'}> Sign up now!</NavLink>
          </span>
        </Card>
        {/* <img src={singleBook} alt='single-book' /> */}
        <div className={styles.signUpPhoto}>
          {/* <img src={lively} alt='book-store' className={styles.lively} /> */}
          <img src={bookStack} alt='book-store' className={styles.dark} />
        </div>
      </CenteringComponent>
    </>
  );
};

const visibiltyStyles = {
  position: 'absolute',
  right: '5px',
  top: '8px',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  background: 'none',
};

export default Login;
