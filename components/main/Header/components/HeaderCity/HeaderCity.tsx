import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import {
  selectSelectedCitySlug,
  selectBranches,
} from 'store/reducers/regions/selectors';
import { ModalCity } from 'components/main/ModalCity';

import { getCityTitle } from '../../helpers';
import styles from './headerCity.module.scss';

const HeaderCity: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const selectedCitySlug = useSelector(selectSelectedCitySlug);
  const { data: branches } = useSelector(selectBranches);

  const selectCityTitle = getCityTitle(branches, selectedCitySlug);

  return (
    <Container className={styles.cityWrapper} disableGutters>
      {isOpenModal && (
        <ModalCity isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      )}
      <Box component='div' onClick={() => setIsOpenModal(true)}>
        <Typography className={styles.cityName}>
          {selectCityTitle ? `Ваш город: ${selectCityTitle}` : 'Выберите город'}
        </Typography>
      </Box>
    </Container>
  );
};

export { HeaderCity };
