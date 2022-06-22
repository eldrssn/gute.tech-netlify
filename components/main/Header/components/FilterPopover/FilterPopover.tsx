import React, { FC, useEffect, useState } from 'react';
import useScrollbarSize from 'react-scrollbar-size';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Divider } from '@mui/material';
import cn from 'classnames';

import {
  selectBrands,
  selectModels,
  selectYears,
  selectEngines,
} from 'store/reducers/transport/selectors';
import { useWindowSize } from 'hooks/useWindowSize';

import { checkBrandsList } from './helpers';
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
  setTransportType,
}) => {
  const { isMobile } = useWindowSize();
  const { width: widthScrollBar } = useScrollbarSize();
  const [activeOptionList, setActiveOptionsList] = useState<ListOptionsItem>({
    data: [],
    isLoading: false,
    error: {
      name: '',
      message: '',
    },
  });
  const [activeTransportType, setActiveTransportType] = useState<string>('');

  const { isLoading, data } = activeOptionList;

  const brands = useSelector(selectBrands);
  const models = useSelector(selectModels);
  const years = useSelector(selectYears);
  const engines = useSelector(selectEngines);

  const handleTransportTypeButton = (slug: string) => () => {
    setActiveTransportType(slug);
    setTransportType(slug);
  };

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

  useEffect(() => {
    if (isOpenPopover) {
      document.body.style.marginRight = `${widthScrollBar}px`;
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'auto';
    document.body.style.marginRight = '0px';
  }, [isOpenPopover, widthScrollBar]);

  useEffect(() => {
    if (openPopoverId !== StepInputs.BRAND || activeTransportType) {
      return;
    }

    setActiveTransportType(brands.data[0].slug);
  }, [openPopoverId, brands.data, activeTransportType]);

  const wrapperClassName = cn(
    { [styles.isOpen]: isOpenPopover },
    styles.wrapper,
  );

  const widthList = widthListByStep[openPopoverId];
  const widthButton = widthButtonByStep[openPopoverId];
  const transportTypes = brands.data;

  const isBrand = inputStepId === StepInputs.BRAND;

  const filteredData = searchValue
    ? filterData(searchValue, checkBrandsList(data, activeTransportType))
    : checkBrandsList(data, activeTransportType);

  return (
    <Box component='div' className={wrapperClassName}>
      <Box
        component='div'
        className={styles.background}
        onClick={handleClosePopover}
      />
      <Box
        component='div'
        className={cn({
          [styles.listContainer]: !isMobile,
          [styles.listContainerMobile]: isMobile,
        })}
        sx={{ width: isMobile ? '100%' : widthList }}
      >
        {!isLoading && (
          <>
            {isBrand && (
              <>
                <Box className={styles.transportTypeContainer}>
                  {transportTypes.map((transportType) => (
                    <Button
                      className={cn(styles.transportTypeButton, {
                        [styles.transportTypeButtonActive]:
                          activeTransportType === transportType.slug,
                        [styles.transportTypeButtonMobile]: isMobile,
                      })}
                      key={transportType.slug}
                      onClick={handleTransportTypeButton(transportType.slug)}
                    >
                      {transportType.title}
                    </Button>
                  ))}
                </Box>
                {!isMobile && <Divider className={styles.divider} />}
              </>
            )}
            <Box
              className={cn(styles.list, {
                [styles.brandList]: isBrand,
              })}
              sx={{ width: isMobile ? '100%' : widthList }}
            >
              {filteredData.map((item) => (
                <Button
                  sx={{ width: isMobile ? '100%' : widthButton }}
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
          </>
        )}
      </Box>
    </Box>
  );
};

export { FilterPopover };
