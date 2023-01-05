import React from 'react';

import Head from 'next/head';

import { useLayout } from '~/contexts/layoutContexts';
import { Store } from '~/interfaces';

import { NavMenu } from '../NavMenu';
import { Container, Content } from './styles';

type Props = {
  children?: any;
  title?: string;
  store?: Store;
  type?: 'shop' | 'dashboard' | 'default';
};

function Layout({ children, title = 'Minha Lojinha', store, type }: Props) {
  const { ownerStore } = useLayout();

  return (
    <Container>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{title}</title>
      </Head>
      <header>
        <NavMenu type={type} ownerStore={ownerStore} store={store} />
      </header>
      <Content>{children}</Content>
      <footer>
        <span>Todos os direitos reservados Jerferson Borges</span>
      </footer>
    </Container>
  );
}

export { Layout };
