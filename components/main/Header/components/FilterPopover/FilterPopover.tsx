/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useScrollbarSize from 'react-scrollbar-size';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Divider } from '@mui/material';
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
  resetFilterForm,
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

  const brandSlugValue = getValues('brand.slug');
  const modelSlugValue = getValues('model.slug');
  const yearSlugValue = getValues('year.slug');

  const fetchDataByStepId = {
    [StepInputs.BRAND]: () => dispatch(fetchBrands()),
    [StepInputs.MODEL]: () =>
      dispatch(
        fetchModels({
          brandSlug: brandSlugValue,
          transportType,
        }),
      ),
    [StepInputs.YEAR]: () =>
      dispatch(
        fetchYears({
          brandSlug: brandSlugValue,
          modelSlug: modelSlugValue,
          transportType,
        }),
      ),
    [StepInputs.ENGINE]: () =>
      dispatch(
        fetchEngines({
          brandSlug: brandSlugValue,
          modelSlug: modelSlugValue,
          yearSlug: yearSlugValue,
          transportType,
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
      return;
    }

    document.body.style.overflow = 'auto';
    document.body.style.marginRight = '0px';
  }, [isOpenPopover, widthScrollBar]);

  const handleTransportTypeButton = (slug: string) => () => {
    setTransportType(slug);
    resetFilterForm();
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
