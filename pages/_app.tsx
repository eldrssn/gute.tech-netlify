import type { AppProps } from 'next/app';

import { wrapper } from 'store';
import { MainLayout } from 'layouts/MainLayout';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import 'styles/globals.scss';
import 'slick-carousel/slick/slick.scss';

const theme = createTheme();

// TODO: types -> types.ts
type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout: React.ComponentType;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  const Wrapper = Component.PageLayout || MainLayout;

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
