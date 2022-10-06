import { wrapper } from 'store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import { MainLayout } from 'layouts/MainLayout';
import { InitialLoader } from 'layouts/InitialLoader';
import { MetrikScript } from 'utility/utils/metriks';

import 'styles/globals.scss';
import 'slick-carousel/slick/slick.scss';

import { ComponentWithPageLayout } from 'types';

const theme = createTheme();

const cache = createCache({
  key: 'css',
  prepend: true,
});

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  const Wrapper = Component.PageLayout || MainLayout;

  return (
    <>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <InitialLoader>
            <Wrapper>
              <Component {...pageProps} />
            </Wrapper>
          </InitialLoader>
        </ThemeProvider>
      </CacheProvider>
      <MetrikScript />
    </>
  );
}

export default wrapper.withRedux(MyApp);
