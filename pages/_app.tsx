import '../styles/globals.css';
import type { AppProps } from 'next/app';
import MainLayout from '../layouts/index';

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout: React.ComponentType;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  return Component.PageLayout ? (
    <Component.PageLayout>
      <Component {...pageProps} />
    </Component.PageLayout>
  ) : (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
