import React from 'react';
import Container from '@mui/material/Container';

import { Header } from 'components/main/Header';
import { Footer } from 'components/main/Footer';
import { MobileMenu } from 'components/main/MobileMenu';
import { useWindowSize } from 'hooks/useWindowSize';

const MainLayout: React.FC = ({ children }) => {
  const { isMobile } = useWindowSize();

  return (
    <>
      <Header />
      <Container
        component='main'
        maxWidth={'lg'}
        sx={{
          minHeight: '100vh',
        }}
      >
        {children}
      </Container>
      <Footer />
      {isMobile && <MobileMenu />}
    </>
  );
};

export { MainLayout };
