import React, { FC, KeyboardEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import {
  selectSelectedCitySlug,
  selectSelectedBranchId,
  selectBranches,
} from 'store/reducers/regions/selectors';
import { ModalCity } from 'components/main/ModalCity';
import { getBranches, getBranch } from 'utility/helpers';
import { handleEnterPress } from 'utility/utils';

import styles from './headerCity.module.scss';

const HeaderCity: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const selectedCitySlug = useSelector(selectSelectedCitySlug);
  const selectedBranchId = useSelector(selectSelectedBranchId);
  const { data: branches } = useSelector(selectBranches);

  const selectedBranches = getBranches(branches, selectedCitySlug);
  const selectedBranch = getBranch(
    selectedBranches?.branches,
    selectedBranchId,
  );
  const handleClick = () => setIsOpenModal(true);
  const handleKeyDown = (event: KeyboardEvent) =>
    handleEnterPress(event, handleClick);

  const selectedCityTitle = selectedBranches?.title;
  const selectedBranchStreet = selectedBranch?.street;

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
            {selectedCityTitle && selectedBranchStreet
              ? `Выбранный филиал: ${selectedCityTitle}, ${selectedBranchStreet}`
              : 'Выберите город'}
          </Typography>
        </Box>
      </Container>

      {isOpenModal && (
        <ModalCity isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      )}
    </>
  );
};

export { HeaderCity };
