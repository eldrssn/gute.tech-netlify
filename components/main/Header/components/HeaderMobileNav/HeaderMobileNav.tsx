import React, { FC } from 'react';

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import { HeaderLogo } from '../HeaderLogo';
import { HeaderCity } from '../HeaderCity';
import { SearchField } from '../SearchField';

import { HeaderMobileNavProps } from './types';

import styles from './headerMobileNav.module.scss';

const HeaderMobileNav: FC<HeaderMobileNavProps> = ({
  setIsFocusSearchField,
}) => (
  <>
    <Container className={styles.headerMobileContainer}>
      <HeaderLogo />
      <HeaderCity />
      <SearchField setIsFocusSearchField={setIsFocusSearchField} />
    </Container>
    <Divider />
  </>
);

export { HeaderMobileNav };
