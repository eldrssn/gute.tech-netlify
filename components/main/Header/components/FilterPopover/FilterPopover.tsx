/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useScrollbarSize from 'react-scrollbar-size';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import cn from 'classnames';

import {
  fetchBrands,
  fetchModels,
  fetchYears,
  fetchEngines,
  resetTransportInfo,
} from 'store/reducers/transport/actions';
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
import { StepInputs } from '../../types';
import styles from './styles.module.scss';

const FilterPopover: FC<FilterPopoverProps> = ({
  resetFilterFormFromBrand,
  isOpenPopover,
  getValues,
  handleClosePopover,
  inputStepId,
  handleClick,
  setIsLoadingOptionList,
  searchValue,
  transportType,
  setTransportType,
}) => {
  const dispatch = useDispatch();

  const { isMobile } = useWindowSize();
  const { width: widthScrollBar } = useScrollbarSize();
  const isBrand = inputStepId === StepInputs.BRAND;

  const selectorsByStepId = {
    [StepInputs.BRAND]: selectBrands,
    [StepInputs.MODEL]: selectModels,
    [StepInputs.YEAR]: selectYears,
    [StepInputs.ENGINE]: selectEngines,
  };

  const { isLoading, data } = useSelector(selectorsByStepId[inputStepId]);

  const brandSlug = getValues('brand.slug');
  const modelSlug = getValues('model.slug');
  const yearSlug = getValues('year.slug');
  const transportTypeSlug = transportType;

  const fetchDataByStepId = {
    [StepInputs.YEAR]: () => dispatch(fetchYears()),
    [StepInputs.BRAND]: () => dispatch(fetchBrands({ yearSlug })),
    [StepInputs.MODEL]: () =>
      dispatch(
        fetchModels({
          brandSlug,
          yearSlug,
          transportTypeSlug,
        }),
      ),
    [StepInputs.ENGINE]: () =>
      dispatch(
        fetchEngines({
          brandSlug,
          modelSlug,
          yearSlug,
          transportTypeSlug,
        }),
      ),
  };

  useEffect(() => {
    if (data.length <= 0) {
      fetchDataByStepId[inputStepId]();
    }
  }, [inputStepId]);

  useEffect(() => {
    setIsLoadingOptionList(isLoading);
  }, [isLoading, setIsLoadingOptionList]);

  useEffect(() => {
    if (isOpenPopover) {
      document.body.style.marginRight = `${widthScrollBar}px`;
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.marginRight = '0px';
    };
  }, [isOpenPopover, widthScrollBar]);

  const handleTransportTypeButton = (slug: string) => () => {
    setTransportType(slug);
    resetFilterFormFromBrand();
    dispatch(resetTransportInfo());
  };

  const filteredData = searchValue
    ? filterData(searchValue, checkBrandsList(data, transportType))
    : checkBrandsList(data, transportType);

  const widthList = widthListByStep[inputStepId];
  const widthButton = widthButtonByStep[inputStepId];

  const wrapperClassName = cn(
    { [styles.isOpen]: isOpenPopover },
    styles.wrapper,
  );

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
                  {data.map((transportTypeData) => (
                    <Button
                      className={cn(styles.transportTypeButton, {
                        [styles.transportTypeButtonActive]:
                          transportType === transportTypeData.slug,
                        [styles.transportTypeButtonMobile]: isMobile,
                      })}
                      key={transportTypeData.slug}
                      onClick={handleTransportTypeButton(
                        transportTypeData.slug,
                      )}
                    >
                      {transportTypeData.title}
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
