import React from 'react';
import Header from '../components/Header';
import styles from './Signup.module.css';
import lively from '../assets/livelyBooks.jpg';
import stackDark from '../assets/stackDark.jpg';
import dark from '../assets/darkBooks.jpg';
import Button from '../components/Button';
import { NavLink } from 'react-router-dom';
import Input from '../components/Input';
import Card from '../components/Card';
import CenteringComponent from '../components/CenteringComponent';
import { useState } from 'react';
import ErrorText from '../components/ErrorText';
import useRegisterUser from '../hooks/useRegisterUser';
import { toast } from 'react-hot-toast';

const SignUp = () => {
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState({
    errorName: '',
    errorEmail: '',
    errorPassword: '',
    errorConfirmPassword: '',
  });

  const [isChecked, setIsChecked] = useState(false);

  const { mutate, isLoading, status, error } = useRegisterUser();

  function handleSubmit(e) {
    e.preventDefault();

    const firstName = formValue.name.split(' ')[0];
    const lastName = formValue.name.split(' ')[1] || '';

    if (formValue.password !== formValue.confirmPassword) {
      setErrorMessage({
        ...errorMessage,
        errorConfirmPassword: 'The provided password do not match.',
      });
      return;
    } else {
      setErrorMessage({
        ...errorMessage,
        errorConfirmPassword: '',
      });
    }
    mutate({
      firstName,
      lastName,
      password: formValue.password,
      email: formValue.email,
    });
  }

  return (
    <>
      <CenteringComponent styles={{ justifyContent: 'space-around' }}>
        <Card>
          <Header style={{ margin: 'auto' }}>Create your account</Header>
          <form className={styles.signUpForm} onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor='name'>Name</label>
            <div>
              <Input
                placeHolder='Enter your name'
                name='name'
                type='text'
                value={formValue.name}
                onTextChange={(e) => {
                  setFormValue({ ...formValue, name: e.target.value });
                  if (formValue.name.length < 2) {
                    setErrorMessage({
                      ...errorMessage,
                      errorName: 'Name should have more than 2 characters.',
                    });
                  } else {
                    setErrorMessage({
                      ...errorMessage,
                      errorName: '',
                    });
                  }
                }}
              />
              {errorMessage.errorName && (
                <ErrorText message={errorMessage.errorName} />
              )}
            </div>

            <label htmlFor='name'>Email</label>
            <div>
              <Input
                placeHolder='Enter your email'
                name='email'
                type='email'
                value={formValue.email}
                onTextChange={(e) =>
                  setFormValue({ ...formValue, email: e.target.value })
                }
              />

              {errorMessage.errorEmail && (
                <ErrorText message={errorMessage.errorEmail} />
              )}
            </div>

            <label htmlFor='name'>Password</label>
            <div>
              <Input
                placeHolder='Enter your password'
                name='password'
                type='password'
                value={formValue.password}
                onTextChange={(e) => {
                  setFormValue({ ...formValue, password: e.target.value });
                  if (formValue.password.length < 4) {
                    setErrorMessage({
                      ...errorMessage,
                      errorPassword:
                        'Password should be longer than 5 characters.',
                    });
                  } else {
                    setErrorMessage({
                      ...errorMessage,
                      errorPassword: '',
                    });
                  }
                }}
              />
              {errorMessage.errorPassword && (
                <ErrorText message={errorMessage.errorPassword} />
              )}
            </div>

            <label htmlFor='name'>Confirm Password</label>
            <div>
              <Input
                placeHolder='Enter your password'
                name='confirmPassword'
                type='password'
                value={formValue.confirmPassword}
                onTextChange={(e) => {
                  setFormValue({
                    ...formValue,
                    confirmPassword: e.target.value,
                  });
                }}
              />
              {errorMessage.errorConfirmPassword && (
                <ErrorText message={errorMessage.errorConfirmPassword} />
              )}
            </div>

            <div>
              <Input
                type='checkbox'
                name='terms'
                checked={isChecked}
                onTextChange={() => setIsChecked((isChecked) => !isChecked)}
              />
              <span>I agree to all terms and conditions</span>
            </div>
            <Button
              disabled={
                !isChecked ||
                !!errorMessage.errorName ||
                !!errorMessage.errorEmail ||
                !!errorMessage.errorPassword ||
                isLoading
              }
            >
              {isLoading ? 'Registering' : 'Sign up'}
            </Button>
          </form>
          <span>
            Already have an account? <NavLink to={'/login'}>Log in</NavLink>
          </span>
        </Card>
        <div className={styles.signUpPhoto}>
          <img src={lively} alt='book-store' className={styles.lively} />
          <img src={dark} alt='book-store' className={styles.dark} />
        </div>
      </CenteringComponent>
    </>
  );
};

export default SignUp;
