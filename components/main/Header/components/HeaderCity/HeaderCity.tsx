import React, { FC, KeyboardEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import {
  selectSelectedCitySlug,
  selectSelectedBranchId,
  selectBranches,
} from 'store/reducers/regions/selectors';
import { setCitySlug, setBranchId } from 'store/reducers/regions/actions';
import { ModalCity } from 'components/main/ModalCity';
import { getBranches, getBranch } from 'utility/helpers';
import { handleEnterPress } from 'utility/utils';
import { CookieKey } from 'constants/types';
import { COOKIE_TTL, STRINGIFY_FALSE } from 'constants/variables';

import styles from './headerCity.module.scss';

const HeaderCity: FC = () => {
  const dispatch = useDispatch();

  const [cookie, setCookie] = useCookies();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const isFirstChangeCity = cookie.firstChageCity !== STRINGIFY_FALSE;

  const selectedCitySlug = useSelector(selectSelectedCitySlug);
  const selectedBranchId = useSelector(selectSelectedBranchId);
  const { data: branches } = useSelector(selectBranches);

  const selectedBranches = getBranches(branches, selectedCitySlug);
  const selectedBranch = getBranch(
    selectedBranches?.branches,
    selectedBranchId,
  );

  const handleCloseAttention = () => {
    const date = new Date();
    date.setTime(date.getTime() + COOKIE_TTL);

    setCookie(CookieKey.FIRST_CHANGE_CITY, STRINGIFY_FALSE, {
      path: '/',
      expires: date,
    });
  };
  const handleClick = () => {
    setIsOpenModal(true);
    handleCloseAttention();
  };
  const handleKeyDown = (event: KeyboardEvent) =>
    handleEnterPress(event, handleClick);

  const selectedCityTitle = selectedBranches?.title;
  const selectedBranchStreet = selectedBranch?.street;

  useEffect(() => {
    if (!isFirstChangeCity || branches.length <= 0) {
      return;
    }

    const firstCitySlug = branches[0].slug;
    const firstBranchId = branches[0].branches[0].id;

    dispatch(setCitySlug(firstCitySlug));
    dispatch(setBranchId(firstBranchId));
  }, [
    selectedCitySlug,
    selectedBranchId,
    branches,
    dispatch,
    isFirstChangeCity,
  ]);

  return (
    <>
      <Container className={styles.cityWrapper} disableGutters>
        <Box
          component='div'
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <Typography className={styles.cityName}>
            Филиал: {selectedCityTitle}, {selectedBranchStreet}
          </Typography>
        </Box>
        {isFirstChangeCity && (
          <Box className={styles.changeCityAttention}>
            <Typography className={styles.attentionInfo}>
              Ваш город: {selectedCityTitle}?
            </Typography>
            <Button
              onClick={handleCloseAttention}
              className={styles.buttonConfirm}
            >
              Да
            </Button>
            <Button onClick={handleClick} className={styles.buttonChange}>
              Изменить
            </Button>
          </Box>
        )}
      </Container>

      {isOpenModal && (
        <ModalCity isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      )}
    </>
  );
};

export { HeaderCity };
