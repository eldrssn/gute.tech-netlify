import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames/bind';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { clearTransportId } from 'store/reducers/transport/actions';
import { selectTransportInfo } from 'store/reducers/transport/selectors';
import { CustomButton } from 'components/ui/CustomButton';
import { useWindowSize } from 'hooks/useWindowSize';

import { HeaderContext } from '../HeaderContext';
import styles from './styles.module.scss';
import { HeaderFiltersTextProps } from './types';
import { StepInputs } from '../../types';

const cn = classnames.bind(styles);

const HeaderFiltersText: FC<HeaderFiltersTextProps> = ({
  setValue,
  reset,
  setCurrentStep,
  setTransportType,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isMobile } = useWindowSize();

  const { transportText, isFullHeader } = useContext(HeaderContext);

  const { data: TransportInfo } = useSelector(selectTransportInfo);

  const resetFilter = () => {
    router.push('/');
    reset();
    dispatch(clearTransportId());
    setCurrentStep(StepInputs.YEAR);
  };

  const editFilter = () => {
    if (!TransportInfo) {
      return null;
    }

    const { brand, engine, model, years, type } = TransportInfo;

    setTransportType(type.slug);
    setValue('brand', {
      title: brand.title,
      slug: brand.slug,
      searchValue: null,
    });
    setValue('engine', {
      title: engine.title,
      slug: engine.slug,
      searchValue: null,
    });
    setValue('model', {
      title: model.title,
      slug: model.slug,
      searchValue: null,
    });
    setValue('year', {
      title: years[0].toString(),
      slug: years[0].toString(),
      searchValue: null,
    });
    setCurrentStep(StepInputs.ENGINE);
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
        })}
      >
        Сбросить фильтр
      </CustomButton>

      <CustomButton
        onClick={editFilter}
        customStyles={cn(styles.stepButtonSubmit, styles.editButton, {
          [styles.stepButtonSubmitShortHeader]: !isFullHeader,
        })}
      >
        Редактировать фильтр
      </CustomButton>
    </Box>
  );
};

export { HeaderFiltersText };
