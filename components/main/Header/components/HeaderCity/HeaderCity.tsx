import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from 'components/main/ModalCity';
import { cookieStorage } from 'utility/helpers';
import { selectRegion } from 'store/reducers/regions/actions';
import { selectCity } from 'store/reducers/regions/selectors';
import { CookieKey } from 'constants/types';

import styles from './headerCity.module.scss';

export const HeaderCity: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();
  const selectedCity = useSelector(selectCity);

  useEffect(() => {
    const selectedCity = cookieStorage.getItem(CookieKey.SELECTEDCITY);

    if (selectedCity) {
      dispatch(selectRegion(selectedCity));
    }
  }, [dispatch]);

  return (
    <Container className={styles.cityWrapper}>
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      <Box component='div' onClick={() => setIsOpenModal(true)}>
        <Typography className={styles.cityName}>
          {selectedCity.length
            ? 'Ваш город: ' + selectedCity
            : 'Выберите город'}
        </Typography>
      </Box>
    </Container>
  );
};
