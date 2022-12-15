/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { AppProps } from 'next/app';

import { wrapper } from 'store';

import { InitialLoader } from 'layouts/InitialLoader';
import { MetrikScript } from 'utility/utils/metriks';

import 'slick-carousel/slick/slick.scss';
import 'styles/globals.scss';

const theme = createTheme();

const cache = createCache({
  key: 'css',
  prepend: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <InitialLoader>
            <Component {...pageProps} />
          </InitialLoader>
        </ThemeProvider>
      </CacheProvider>
      <MetrikScript />
    </>
  );
}

export default wrapper.withRedux(MyApp);
