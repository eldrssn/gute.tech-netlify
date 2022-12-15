/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import App, { AppProps } from 'next/app';

import { wrapper } from 'store';

import { InitialLoader } from 'layouts/InitialLoader';
import { MetrikScript } from 'utility/utils/metriks';

import 'slick-carousel/slick/slick.scss';
import 'styles/globals.scss';
import { DEV_HOST } from 'constants/variables';
import { fetchShowcase } from 'store/reducers/showcase/actions';

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

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (context) => {
    // const { ctx } = context;
    // const isServer = !!ctx.req;

    // if (isServer) {
    const showcase = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/showcase/`,
      {
        headers: {
          'content-type': 'application/json',
          'X-Client-Host': DEV_HOST,
        },
      },
    ).then((response) => {
      return response.json();
    });

    store.dispatch(fetchShowcase(showcase));
    // }

    return {
      pageProps: {
        ...(await App.getInitialProps(context)).pageProps,
        appProp: context.ctx.pathname,
      },
    };
  },
);

export default wrapper.withRedux(MyApp);
