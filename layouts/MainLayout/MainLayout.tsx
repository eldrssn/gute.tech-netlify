import React from 'react';
import { Container } from '@mui/material';

import { Header } from 'components/main/Header';
import { Footer } from 'components/main/Footer';

const MainLayout: React.FC = ({ children }) => (
  <>
    <Header />
    <Container
      maxWidth={'lg'}
      sx={{
        minHeight: '100vh',
      }}
    >
      {children}
    </Container>
    <Footer />
  </>
);

export { MainLayout };
