import React from 'react';
import { Container, Box } from '@mui/material';

import Header from 'components/base/header/Header';

const MainLayout: React.FC = ({ children }) => (
  <Box sx={{ width: '100%', padding: 0 }}>
    <Header />
    <Container
      maxWidth={'lg'}
      sx={{
        minHeight: '100vh',
      }}
    >
      {children}
    </Container>
  </Box>
);

export { MainLayout };
