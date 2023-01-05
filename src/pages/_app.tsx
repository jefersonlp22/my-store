import { ThemeProvider, createGlobalStyle } from 'styled-components';

import { ProviderLayout } from '~/contexts/layoutContexts';

import theme from '../styles/theme';
import { RouteGuard } from './routesController';

import '../styles/vendor/tailwind.generated.css';

import 'tailwindcss/tailwind.css';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #E5E5E5;
  }
`;
function MyApp(props: any) {
  const { Component, pageProps } = props;
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ProviderLayout>
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </ProviderLayout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
