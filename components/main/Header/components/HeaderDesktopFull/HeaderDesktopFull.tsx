import React, { FC, useContext } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { HeaderLogo } from '../HeaderLogo';
import { HeaderAsideNav } from '../HeaderAsideNav';
import { HeaderCity } from '../HeaderCity';
import { HeaderContext } from '../HeaderContext';
import { SearchField } from '../SearchField';

import styles from './headerDesktopFull.module.css';
import { HeaderDesktopFullProps } from './types';

const HeaderDesktopFull: FC<HeaderDesktopFullProps> = ({
  setIsFocusSearchField,
}) => {
  const { isFullHeader } = useContext(HeaderContext);

  if (!isFullHeader) {
    return null;
  }

  return (
    <>
      <Container
        sx={{
          flexWrap: isFullHeader ? 'wrap' : 'nowrap',
          flexDirection: isFullHeader ? 'column' : 'row',
        }}
      >
        <HeaderCity />

        <Box
          className={styles.headerDesktopFull}
          sx={{
            width: isFullHeader ? '100%' : 'auto',
          }}
        >
          <HeaderLogo />
          <SearchField setIsFocusSearchField={setIsFocusSearchField} />
          <HeaderAsideNav />
        </Box>
      </Container>
      <Divider />
    </>
  );
};

export { HeaderDesktopFull };
