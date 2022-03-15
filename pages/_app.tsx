import type { AppProps } from 'next/app';

import { MainLayout } from 'layouts/MainLayout';

import 'styles/globals.css';

// TODO: types -> types.ts
type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout: React.ComponentType;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  const Wrapper = Component.PageLayout || MainLayout;

  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  )
}

export default MyApp;
