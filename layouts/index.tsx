import { Container } from '@mui/material';
import React from 'react';

const MainLayout: React.FC = ({ children }) => (
  <Container
    maxWidth={'lg'}
    sx={{
      minHeight: '100vh',
    }}
  >
    {children}
  </Container>
);

export default MainLayout;
