// @flow
import * as React from 'react';
import LoginUI from '../../Views/LoginUI';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mapFromQueryString } from '../../../helpers';
import { useState } from 'react';
import { useEffect } from 'react';

import { signInWithPopup } from 'firebase/auth';
import {
  auth,
  firebaseApp,
  logout,
  googleProvider,
} from '../../../utils/firebase';

import { loginUser } from '../../../store/appSlice';
import useLoader from '../../../helpers/hooks/useLoader';
import toasts from '../../../constants/toasts';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Login = () => {
  const dispatch = useDispatch();
  const loader = useLoader();
  const history = useHistory();
  const [user, loading, error] = useAuthState(auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (loading) return loader('Loading...');
    console.log('Loading ended, now redirectiong to dashboard');
    const redirectTo =
      mapFromQueryString()['redirectTo'] || '/dashboard?page=projects';
    if (user) history.replace(redirectTo);
    loader();
  }, [user, loading]);

  useEffect(() => {
    if (loading || !error) return;
    toasts.generateError(error?.message);
    const redirectTo =
      mapFromQueryString()['redirectTo'] || '/dashboard?page=projects';
    if (user) history.replace(redirectTo);
  }, [error, loading]);

  const handleEmailLogin = async (event) => {
    try {
      console.log('email: ', email);
      loader('Logging in...');
      await auth.signInWithEmailAndPassword(email, password);
      history.replace('/dashboard');
      loader();
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInWithGoogle = async (event) => {
    event.preventDefault();
    loader('Logging in...');
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      console.log('signed - in: ', user);
      if (user) {
        const redirectTo =
          mapFromQueryString()['redirectTo'] || '/dashboard?page=projects';
        dispatch(
          loginUser({
            displayName: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
          })
        );
        loader();
        history.replace(redirectTo);
      }
    } catch (error) {
      console.log(error);
      loader();

      toasts.generateError(error.message);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    console.log('name: ', name, 'value: ', value);
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <LoginUI
      handleOnChange={handleOnChange}
      handleEmailLogin={handleEmailLogin}
      password={password}
      email={email}
      signInWithGoogle={signInWithGoogle}
    />
  );
};
