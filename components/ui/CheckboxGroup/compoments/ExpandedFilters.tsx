import React, { FC, useMemo, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useRouter } from 'next/router';

import { useRouterQuery } from 'hooks/useRouterQuery';

import { Filters } from './Filters';
import { SmallButton } from './SmallButton';

import { checkIsAllFiltersChoosen, chooseAllFilters } from '../helpers';
import { ExpandedFilterProps } from '../types';
import styles from '../checkboxGroup.module.scss';

const ExpandedFilters: FC<ExpandedFilterProps> = ({
  slug,
  filters,
  setOnChange,
  getIsChecked,
  handleAnchorClick,
}) => {
  const router = useRouter();
  const { removeQuery, getQueryOption } = useRouterQuery();
  const [searchValue, setSearchValue] = useState('');

  const isAllFiltersChoosen = useMemo(
    () => checkIsAllFiltersChoosen(slug, getQueryOption, filters),
    [slug, getQueryOption, filters],
  );

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
  };

  const handleClickReset = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    removeQuery(slug, undefined, false);
    handleAnchorClick(event);
  };

  const handleClickChooseAllFilters = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    handleAnchorClick(event);
    chooseAllFilters(router, slug, filters);
  };

  return (
    <>
      <TextField
        className={styles.textfield}
        placeholder='Найти'
        onChange={(event) => handleChangeInput(event)}
        value={searchValue}
      />
      {isAllFiltersChoosen ? (
        <SmallButton onClick={handleClickReset}>Снять все</SmallButton>
      ) : (
        <SmallButton onClick={handleClickChooseAllFilters}>
          Выбрать все
        </SmallButton>
      )}
      <Box className={styles.expandFilterList}>
        <Filters
          filters={filters}
          setOnChange={setOnChange}
          getIsChecked={getIsChecked}
          handleAnchorClick={handleAnchorClick}
          searchValue={searchValue}
        />
      </Box>
    </>
  );
};

export { ExpandedFilters };