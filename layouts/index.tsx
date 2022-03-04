import React from 'react';
import { Container } from '@mui/material';

import Header from 'components/base/header/Header';

const MainLayout: React.FC = ({ children }) => (
  <Container
    maxWidth={'lg'}
    sx={{
      minHeight: '100vh',
    }}
  >
    <Header />
    {children}
  </Container>
);

export default MainLayout;
