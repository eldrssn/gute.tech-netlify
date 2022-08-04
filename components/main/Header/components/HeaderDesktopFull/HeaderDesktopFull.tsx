import React, { FC } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { HeaderLogo } from '../HeaderLogo';
import { HeaderAsideNav } from '../HeaderAsideNav';
import { HeaderCity } from '../HeaderCity';
import { SearchField } from '../SearchField';

import { HeaderDesktopFullProps } from './types';
import styles from './headerDesktopFull.module.scss';

const HeaderDesktopFull: FC<HeaderDesktopFullProps> = ({
  setIsFocusSearchField,
}) => (
  <>
    <Container className={styles.mainContainer}>
      <HeaderCity />

      <Box className={styles.headerDesktopFull}>
        <HeaderLogo />
        <SearchField setIsFocusSearchField={setIsFocusSearchField} />
        <HeaderAsideNav />
      </Box>
    </Container>
    <Divider />
  </>
);

export { HeaderDesktopFull };
