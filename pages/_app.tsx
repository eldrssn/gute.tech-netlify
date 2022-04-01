import type { AppProps } from 'next/app';

import { wrapper } from 'store';
import { MainLayout } from 'layouts/MainLayout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import 'styles/globals.scss';
import 'slick-carousel/slick/slick.scss';

const theme = createTheme();

// TODO: types -> types.ts
type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout: React.ComponentType;
  };
};

const cache = createCache({
  key: 'css',
  prepend: true,
});

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  const Wrapper = Component.PageLayout || MainLayout;

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default wrapper.withRedux(MyApp);
