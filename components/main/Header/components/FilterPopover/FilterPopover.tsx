import React, { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import cn from 'classnames';

import {
  selectBrands,
  selectModels,
  selectYears,
  selectEngines,
} from 'store/reducers/transport/selectors';
import { checkBrandsList } from 'utility/helpers';
import { useWindowSize } from 'hooks/useWindowSize';
import { checkMobileView } from 'utility/helpers/checkViewType';

import { filterData } from './helpers';
import { widthListByStep, widthButtonByStep } from '../../constants';
import { FilterPopoverProps } from './types';
import { ListOptionsItem } from 'api/models/transport';
import { StepInputs } from '../../types';

import styles from './styles.module.scss';

const FilterPopover: FC<FilterPopoverProps> = ({
  isOpenPopover,
  handleClosePopover,
  inputStepId,
  handleClick,
  setIsLoadingOptionList,
  openPopoverId,
  searchValue,
}) => {
  const { windowWidth } = useWindowSize();
  const [activeOptionList, setActiveOptionsList] = useState<ListOptionsItem>({
    data: [],
    isLoading: false,
    error: {
      name: '',
      message: '',
    },
  });
  const { isLoading, data } = activeOptionList;

  const brands = useSelector(selectBrands);
  const models = useSelector(selectModels);
  const years = useSelector(selectYears);
  const engines = useSelector(selectEngines);

  useEffect(() => {
    const dataByStepId = {
      [StepInputs.BRAND]: brands,
      [StepInputs.MODEL]: models,
      [StepInputs.YEAR]: years,
      [StepInputs.ENGINE]: engines,
    };

    const data: ListOptionsItem = dataByStepId[inputStepId];

    setActiveOptionsList(data);
  }, [inputStepId, brands, models, years, engines]);

  useEffect(() => {
    setIsLoadingOptionList(isLoading);
  }, [isLoading, setIsLoadingOptionList]);

  const wrapperClassName = cn(
    { [styles.isOpen]: isOpenPopover },
    styles.wrapper,
  );

  const cancelBodyScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const backBodyScroll = () => {
    document.body.style.overflow = 'auto';
  };

  const widthList = widthListByStep[openPopoverId];
  const widthButton = widthButtonByStep[openPopoverId];
  const isMobileView = checkMobileView(windowWidth);

  const filteredData = searchValue
    ? filterData(searchValue, checkBrandsList(data))
    : checkBrandsList(data);

  return (
    <Box
      component='div'
      className={wrapperClassName}
      onMouseOver={cancelBodyScroll}
      onMouseLeave={backBodyScroll}
    >
      <Box
        component='div'
        className={styles.background}
        onClick={handleClosePopover}
      />
      <Box
        component='div'
        className={cn({
          [styles.list]: !isMobileView,
          [styles.listMobile]: isMobileView,
        })}
        sx={{ width: isMobileView ? '100%' : widthList }}
      >
        {isLoading
          ? null
          : filteredData.map((item) => (
              <Button
                sx={{ width: isMobileView ? '100%' : widthButton }}
                className={styles.button}
                onClick={() => {
                  handleClick({
                    title: item.title,
                    slug: item.slug,
                    searchValue: null,
                    inputStepId,
                  });
                }}
                key={item.slug}
              >
                {item.title}
              </Button>
            ))}
      </Box>
    </Box>
  );
};

export { FilterPopover };
