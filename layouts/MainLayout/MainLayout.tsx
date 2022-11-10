import React from 'react';
import dynamic from 'next/dynamic';
import Container from '@mui/material/Container';

import { Header } from 'components/main/Header';

import { useWindowSize } from 'hooks/useWindowSize';

const MobileMenu = dynamic(() => import('components/main/MobileMenu'));
const Footer = dynamic(() => import('components/main/Footer'));

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
