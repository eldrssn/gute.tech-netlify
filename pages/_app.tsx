/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import App, { AppProps } from 'next/app';

import { wrapper } from 'store';
import { fetchShowcase } from 'store/reducers/showcase/actions';
import { fetchBranches, fetchRegions } from 'store/reducers/regions/actions';
import { fetchCategoriesTreeList } from 'store/reducers/catalog/actions';

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

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (context) => {
    const { ctx } = context;
    const isServer = !!ctx.req;

    if (isServer) {
      await store.dispatch(fetchShowcase() as any);
      await store.dispatch(fetchBranches() as any);
      await store.dispatch(fetchRegions() as any);
      await store.dispatch(fetchCategoriesTreeList() as any);
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
