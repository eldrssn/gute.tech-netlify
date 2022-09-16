import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import classnames from 'classnames/bind';

import { HeaderContext } from '../HeaderContext';
import { clearTransportId } from 'store/reducers/transport/actions';
import { selectTransportInfo } from 'store/reducers/transport/selectors';
import { CustomButton } from 'components/ui/CustomButton';
import { useWindowSize } from 'hooks/useWindowSize';

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

  const { transportText } = useContext(HeaderContext);

  const { data: TransportInfo } = useSelector(selectTransportInfo);

  const resetFilter = () => {
    router.push('/');
    reset();
    dispatch(clearTransportId());
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
      <div className={styles.choosenTransport}>
        <p className={styles.choosenTransport_label}>
          Показаны товары для: &nbsp;
        </p>
        <p className={styles.choosenTransport_text}>{transportText}</p>
      </div>

      <CustomButton
        onClick={resetFilter}
        customStyles={styles.stepButtonSubmit}
      >
        Сбросить фильтр
      </CustomButton>

      <CustomButton
        onClick={editFilter}
        customStyles={cn(styles.stepButtonSubmit, styles.editButton)}
      >
        редактировать фильтр
      </CustomButton>
    </Box>
  );
};

export { HeaderFiltersText };
