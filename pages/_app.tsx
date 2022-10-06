import { wrapper } from 'store';
import App, { AppContext } from 'next/app';
import { MainLayout } from 'layouts/MainLayout';
import { InitialLoader } from 'layouts/InitialLoader';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import { getShowcase } from 'api/routes/showcase';
import { MetrikScript } from 'utility/utils/metriks';

import 'styles/globals.scss';
import 'slick-carousel/slick/slick.scss';

import { ComponentWithPageLayout } from 'types';

const theme = createTheme();

const cache = createCache({
  key: 'css',
  prepend: true,
});

function MyApp({ Component, pageProps, metricID }: ComponentWithPageLayout) {
  const Wrapper = Component.PageLayout || MainLayout;

  return (
    <>
      <MetrikScript metricID={metricID} />
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <InitialLoader>
            <Wrapper>
              <Component {...pageProps} />
            </Wrapper>
          </InitialLoader>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const results = await getShowcase();
  const metrickID = results.metrics.metric_id;

  return { metricID: metrickID, appProps };
};

export default wrapper.withRedux(MyApp);
