import React from 'react';
import { Container, Box } from '@mui/material';
import { AsideNavigation } from 'components/ui/AsideNavigation';
import styles from './profilePage.module.scss';
import { UserForm } from '../UserForm';
import { UserActionButtons } from '../UserActionButtons';

const ProfilePage = () => {
  return (
    <Container className={styles.mainContainer}>
      <Box>
        <h1>Профиль</h1>

        <AsideNavigation />
      </Box>

      <Box className={styles.userInfo}>
        <UserForm />
        <UserActionButtons />
      </Box>
    </Container>
  );
};

export { ProfilePage };
