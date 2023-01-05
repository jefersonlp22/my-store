import React, { useState, useEffect } from 'react';

import { TextField, Button } from '@material-ui/core';
import Router from 'next/router';

import { useLayout } from '~/contexts/layoutContexts';
import { useOwnerStore } from '~/hooksApi/useOwner';
import { User } from '~/interfaces/user';

import { Authetication } from '../../authAuthetication';
import { firebase } from '../../firebase/config';
import * as S from './styles';

export interface LoginFormProps {
  setLoadLogin: (value: boolean) => void;
}

export function LoginForm({ setLoadLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUserStorage, handleSetOwnerStore } = useLayout();
  const { getOwnerById } = useOwnerStore();

  const loginUser = async () => {
    setLoadLogin(true);
    try {
      const { user } = await Authetication(email, password);
      if (setUserStorage) {
        setUserStorage({ email: user?.email, id: user?.uid } as User);
      }
      handleRedirect(user?.uid as string);
      setError('');
    } catch (error) {
      console.log('error', error);
      setError('Email ou senha incorreto');
      setLoadLogin(false);
    }
  };

  const handleRedirect = async (id: string) => {
    const data = await getOwnerById(id);
    if (handleSetOwnerStore) {
      handleSetOwnerStore(data);
    }
    setLoadLogin(false);
    if (data) {
      Router.push('/dashboard');
    } else {
      Router.push('/register');
    }
  };

  useEffect(() => {
    firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD;
  }, []);

  return (
    <S.Container className="formBox md:mt-10 mb-5">
      <p className="title">Já tenho cadastro</p>
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        variant="standard"
        helperText={error}
        error={error !== ''}
      />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        label="Senha"
        variant="standard"
        helperText={error}
        error={error !== ''}
      />
      <div className="mt-10">
        <Button
          onClick={loginUser}
          color="primary"
          variant="outlined"
          size="large"
        >
          Entar
        </Button>
      </div>
    </S.Container>
  );
}
