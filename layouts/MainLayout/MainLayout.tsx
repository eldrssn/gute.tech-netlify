import React from 'react';
import { Container, Box } from '@mui/material';

import Header from 'components/base/header/Header';
import { Footer } from 'components/main/Footer';

const MainLayout: React.FC = ({ children }) => (
  <>
    <Container
      maxWidth={'lg'}
      sx={{
        minHeight: '100vh',
      }}
    >
      <Header />
      {children}
    </Container>
    <Footer />
  </>
);

export { MainLayout };
