import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { AsideNavigation } from 'components/ui/AsideNavigation';

import { selectUserProfile } from 'store/reducers/user/selectors';

import { UserForm } from './components/UserForm';
import { UserActionButtons } from './components/UserActionButtons';

import styles from './profilePage.module.scss';

const ProfilePage = () => {
  const { isLoading: isLoadingUserProfile } = useSelector(selectUserProfile);

  return (
    <Container disableGutters className={styles.mainContainer}>
      <Box>
        <h1>Профиль</h1>
      </Box>

      <Box className={styles.mainBox}>
        <AsideNavigation />

        {!isLoadingUserProfile && (
          <Box className={styles.userInfo}>
            <UserForm />
            <UserActionButtons />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export { ProfilePage };
