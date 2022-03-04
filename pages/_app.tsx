import type { AppProps } from 'next/app';

import { MainLayout } from 'layouts/MainLayout';

import '../styles/globals.css';

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout: React.ComponentType;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  if (Component.PageLayout) {
    return (
      <Component.PageLayout>
        <Component {...pageProps} />
      </Component.PageLayout>
    )
  } else {
    return (
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    )
  }
}

export default MyApp;
