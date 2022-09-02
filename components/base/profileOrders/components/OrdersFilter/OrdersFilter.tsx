/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { DateRange } from 'react-date-range';
import { ru } from 'date-fns/locale';
import cn from 'classnames';
import Box from '@mui/material/Box';
import { Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import useScrollbarSize from 'react-scrollbar-size';

import { useWindowSize } from 'hooks/useWindowSize';
import { useRouterQuery } from 'hooks/useRouterQuery';
import { formatStringifiedDate, getFullDate } from 'utility/helpers';

import {
  CREATED_AFTER_QUERY,
  CREATED_BEFORE_QUERY,
  DateRangeInitialState,
} from '../../constants';
import styles from './styles.module.scss';
import { OrdersFilterProps } from '../../types';

const OrdersFilter: FC<OrdersFilterProps> = ({
  isOpenDatePicker,
  setIsOpenDatePicker,
}) => {
  const [dateRange, setDateRange] = useState<Range[]>([DateRangeInitialState]);

  const { width: widthScrollBar } = useScrollbarSize();
  const { isMobile } = useWindowSize();
  const router = useRouter();
  const routerQuery = useRouterQuery();

  const { created_after, created_before, ordering } = router.query;

  useEffect(() => {
    if (
      !Array.isArray(created_after) &&
      created_after &&
      created_before &&
      !Array.isArray(created_before)
    ) {
      setDateRange([
        {
          startDate: new Date(created_before),
          endDate: new Date(created_after),
          key: 'selection',
        },
      ]);
    }
  }, [created_after, created_before]);

  const handleCloseDateRangePopover = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsOpenDatePicker(false);
  };

  const handleOpenDateRangePopover = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsOpenDatePicker(true);
  };

  useEffect(() => {
    if (isMobile && isOpenDatePicker) {
      document.body.style.marginRight = `${widthScrollBar}px`;
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'auto';
    document.body.style.marginRight = '0px';
  }, [isMobile, isOpenDatePicker, widthScrollBar]);

  const handleClearDateRange = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    router.replace(`orders/?ordering=${ordering}`);
    setDateRange([
      {
        startDate: undefined,
        endDate: undefined,
        key: 'selection',
      },
    ]);
  };

  const handleChangeDateRange = (range: Range) => {
    const dateAfter = range.startDate;
    const dateBefore = range.endDate;

    if (!dateAfter || !dateBefore) {
      return;
    }

    const fullDateAfter = getFullDate(dateAfter);
    const fullDateBefore = getFullDate(dateBefore);

    routerQuery.setQueryOption({
      [CREATED_AFTER_QUERY]: fullDateAfter,
      [CREATED_BEFORE_QUERY]: fullDateBefore,
    });
  };

  const isDateRange =
    created_after &&
    created_before &&
    !Array.isArray(created_after) &&
    !Array.isArray(created_before);

  const dateRangeButtonTitle = isDateRange
    ? `Выбранный период: ${formatStringifiedDate(
        created_after,
      )} - ${formatStringifiedDate(created_before)}`
    : `Выбрать период`;

  return (
    <>
      <span
        className={styles.dateRangeButton}
        onClick={handleOpenDateRangePopover}
      >
        {dateRangeButtonTitle}
        {isDateRange && (
          <Box className={styles.clearDateRange} onClick={handleClearDateRange}>
            <FontAwesomeIcon icon={faTimes} />
          </Box>
        )}

        <Box
          className={cn(styles.dateRangePopover, {
            [styles.dateRangeOpenPopover]: isOpenDatePicker,
          })}
        >
          <Box
            className={styles.closeDateRangePopover}
            onClick={handleCloseDateRangePopover}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Box>
          <DateRange
            className={styles.dateRangePicker}
            editableDateInputs={false}
            onChange={(item) => handleChangeDateRange(item.selection)}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            locale={ru}
            showDateDisplay={false}
          />
        </Box>
      </span>
      {isOpenDatePicker && (
        <>
          <Box
            component='div'
            className={styles.backgroundDateRangePopover}
            onClick={handleCloseDateRangePopover}
          />
        </>
      )}
    </>
  );
};

export { OrdersFilter };
