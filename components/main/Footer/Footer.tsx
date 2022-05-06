import React, { FC } from 'react';
import { Box, Container } from '@mui/material';

import { FooterText } from './components/FooterText';
import { FooterSocialLinks } from './components/FooterSocialLinks';

import styles from './footer.module.scss';

const Footer: FC = () => (
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

export { Footer };
