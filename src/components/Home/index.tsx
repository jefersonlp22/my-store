import React, { useState } from 'react';

import { Backdrop, CircularProgress } from '@material-ui/core';

import { Store } from '~/interfaces';

import { LoginForm } from '../LoginForm';
import * as S from './styles';

export interface HomeProps {
  stores?: Store[];
}

export function Home({ stores }: HomeProps) {
  const [loading, setLoading] = useState(false);

  return (
    <S.Container className=" md:grid flex-col w-full h-full">
      <div className="flex items-start p-6 h-full users justify-start">
        {stores?.map((store) => (
          <S.CardStore className="md:w-64 w-full" key={store?.id}>
            <div className="items-center border-r-2 border-gray-400 mr-2">
              <img
                src={store?.picture_url}
                alt="Loja"
                width="120px"
                height="100%"
              />
            </div>
            <div className="flex items-center">
              <p>Lojinha: </p>
              <p className="title">{store?.name}</p>
            </div>
          </S.CardStore>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <LoginForm setLoadLogin={(value) => setLoading(value)} />
      </div>
      <Backdrop open={loading} onClick={() => setLoading(!loading)}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </S.Container>
  );
}
