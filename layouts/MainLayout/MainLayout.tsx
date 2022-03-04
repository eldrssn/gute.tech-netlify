import React from 'react';

import { Container } from '@mui/material';

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

export { MainLayout };
