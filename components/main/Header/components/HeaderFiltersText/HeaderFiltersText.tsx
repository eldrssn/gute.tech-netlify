import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import {
  clearTransportId,
  clearTransportYear,
  resetOptionsWhenEditFilter,
} from 'store/reducers/transport/actions';
import { selectTransportInfo } from 'store/reducers/transport/selectors';
import {
  selectTransportYear,
  selectTransportId,
} from 'store/reducers/transport/selectors';
import { CustomButton } from 'components/ui/CustomButton';
import { useWindowSize } from 'hooks/useWindowSize';

import { StepInputs } from '../../types';
import { HeaderContext } from '../HeaderContext';
import { HeaderFiltersTextProps } from './types';
import styles from './styles.module.scss';

const cn = classnames.bind(styles);

const HeaderFiltersText: FC<HeaderFiltersTextProps> = ({
  setValue,
  reset,
  setCurrentStep,
  setTransportType,
  setCurrentTransportId,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isMobile } = useWindowSize();

  const { transportText, isFullHeader } = useContext(HeaderContext);

  const transportYear = useSelector(selectTransportYear);
  const transportId = useSelector(selectTransportId);
  const { data: TransportInfo, isLoading: isLoadingTransportInfo } =
    useSelector(selectTransportInfo);

  const resetFilter = () => {
    if (isLoadingTransportInfo) {
      return;
    }

    router.push('/');
    reset();
    dispatch(clearTransportId());
    dispatch(clearTransportYear());
    setCurrentStep(StepInputs.YEAR);
  };

  const editFilter = () => {
    if (isLoadingTransportInfo) {
      return;
    }

    if (!TransportInfo) {
      return null;
    }

    dispatch(resetOptionsWhenEditFilter());
    const { brand, engine, model, years, type } = TransportInfo;

    setTransportType(type.slug);
    setValue('brand', {
      title: brand.title,
      slug: brand.slug,
      searchValue: '',
    });
    setValue('engine', {
      title: engine.title,
      slug: engine.slug,
      searchValue: '',
    });
    setValue('model', {
      title: model.title,
      slug: model.slug,
      searchValue: '',
    });
    setValue('year', {
      title: transportYear ? transportYear : years[0].toString(),
      slug: transportYear ? transportYear : years[0].toString(),
      searchValue: '',
    });

    setCurrentStep(StepInputs.ENGINE);
    setCurrentTransportId(transportId);

    router.push('/');
    dispatch(clearTransportId());
  };

  return (
    <Box
      className={cn(styles.choosenTransport_container, {
        [styles.choosenTransport_container_mobile]: isMobile,
      })}
    >
      <div
        className={cn(styles.choosenTransport, {
          [styles.choosenTransportShortHeader]: !isFullHeader,
        })}
      >
        <Typography className={styles.choosenTransport_label} component='h3'>
          Показаны товары для:
        </Typography>
        <Tooltip title={transportText} placement='top'>
          <Typography
            className={cn(styles.choosenTransport_text, {
              [styles.choosenTransportTextShortHeader]: !isFullHeader,
            })}
            gutterBottom
            component='h3'
          >
            {transportText}
          </Typography>
        </Tooltip>
      </div>

      <CustomButton
        onClick={resetFilter}
        customStyles={cn(styles.stepButtonSubmit, {
          [styles.stepButtonSubmitShortHeader]: !isFullHeader,
          [styles.stepButtonSubmitDisable]: isLoadingTransportInfo,
        })}
      >
        Сбросить фильтр
      </CustomButton>

      <CustomButton
        onClick={editFilter}
        customStyles={cn(styles.stepButtonSubmit, styles.editButton, {
          [styles.stepButtonSubmitShortHeader]: !isFullHeader,
          [styles.stepButtonSubmitDisable]: isLoadingTransportInfo,
        })}
      >
        Редактировать фильтр
      </CustomButton>
    </Box>
  );
};

export { HeaderFiltersText };
