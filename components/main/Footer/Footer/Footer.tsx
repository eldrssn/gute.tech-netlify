import React from 'react';
import { Box, Container } from '@mui/material';

import styles from './footer.module.css';
import { FooterText } from '../FooterText';
import { FooterSocialLinks } from '../FooterSocialLinks';

export const Footer = () => (
  <Box component='footer' className={styles.wrap}>
    <Container
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row', md: 'row' },
        justifyContent: 'space-between',
      }}
    >
      <FooterText />
      <FooterSocialLinks />
    </Container>
  </Box>
);
