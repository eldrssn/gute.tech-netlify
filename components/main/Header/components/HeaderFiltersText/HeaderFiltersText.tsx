import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import classnames from 'classnames/bind';

import { clearTransportId } from 'store/reducers/transport/actions';
import { CustomButton } from 'components/ui/CustomButton';
import { useWindowSize } from 'hooks/useWindowSize';

import { HeaderFiltersTextProps } from './types';

import styles from '../HeaderFilters/headerFilters.module.scss';

const cn = classnames.bind(styles);

const HeaderFiltersText: FC<HeaderFiltersTextProps> = ({ transportText }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isMobile } = useWindowSize();

  const resetFilter = () => {
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
    </Box>
  );
};

export { HeaderFiltersText };
