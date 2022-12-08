/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import App, { AppProps } from 'next/app';

import { wrapper } from 'store';
import { fetchShowcase } from 'store/reducers/showcase/actions';

import { InitialLoader } from 'layouts/InitialLoader';
import { MetrikScript } from 'utility/utils/metriks';

import 'slick-carousel/slick/slick.scss';
import 'styles/globals.scss';

import axios from 'axios';
import { DEV_HOST } from 'constants/variables';
import { ShowcaseResponseData } from 'api/models/showcase';

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
    const { ctx } = context;
    const isServer = !!ctx.req;

    // const api = axios.create({
    //   baseURL: process.env.NEXT_PUBLIC_API_URL,
    //   headers: {
    //     'content-type': 'application/json',
    //     'X-Client-Host':
    //       process.env.NODE_ENV === 'production' && ctx.req?.headers.host
    //         ? ctx.req.headers.host
    //         : DEV_HOST,
    //   },
    // });

    if (isServer) {
      const showcase = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/showcase/`,
        {
          headers: {
            'content-type': 'application/json',
            'X-Client-Host':
              process.env.NODE_ENV === 'production' && ctx.req?.headers.host
                ? ctx.req.headers.host
                : DEV_HOST,
          },
        },
      ).then((response) => {
        // console.log(response.json());
        return response.json();
      });

      console.log('SHOWCASE', showcase);

      store.dispatch(fetchShowcase(showcase));
    }

    return {
      pageProps: {
        ...(await App.getInitialProps(context)).pageProps,
        appProp: context.ctx.pathname,
      },
    };
  },
);

export default wrapper.withRedux(MyApp);
