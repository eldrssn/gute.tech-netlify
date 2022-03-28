import type { AppProps } from 'next/app';

import { MainLayout } from 'layouts/MainLayout';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { wrapper } from 'store';

import 'styles/globals.css';

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
