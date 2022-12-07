import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { AsideNavigation } from 'components/ui/AsideNavigation';

import { selectUserProfile } from 'store/reducers/user/selectors';

import { UserActionButtons } from './components/UserActionButtons';

import styles from './profilePage.module.scss';
import { Loader } from 'components/ui/Loader';
import dynamic from 'next/dynamic';

const UserForm = dynamic(() => import('./components/UserForm'), {
  loading: () => (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <Loader size={70} />
    </Box>
  ),
});

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
