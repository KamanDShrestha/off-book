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

const Login = () => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formValue);
  }

  return (
    <>
      <CenteringComponent styles={{ justifyContent: 'space-around' }}>
        <Card>
          <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e)}>
            <Header style={{ margin: 'auto' }}>Login to your account</Header>

            <label htmlFor='name'>Email</label>
            <Input
              placeHolder='Enter your email'
              name='email'
              type='email'
              value={formValue.email}
              onTextChange={(e) =>
                setFormValue({ ...formValue, email: e.target.value })
              }
            />

            <label htmlFor='name'>Password</label>
            <Input
              placeHolder='Enter your password'
              name='password'
              type='password'
              value={formValue.password}
              onTextChange={(e) =>
                setFormValue({ ...formValue, password: e.target.value })
              }
            />

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

export default Login;
