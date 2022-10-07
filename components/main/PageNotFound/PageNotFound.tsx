import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import styles from './styles.module.scss';

const PageNotFound: FC = () => {
  const router = useRouter();

  const handleClickButton = () => {
    router.push('/');
  };

  return (
    <Container className={styles.mainContainer} disableGutters>
      <Box className={styles.box}>
        <h1>Страница не найдена..</h1>
        <Button onClick={handleClickButton}>перейти на главную страницу</Button>
      </Box>
    </Container>
  );
};

export { PageNotFound };
