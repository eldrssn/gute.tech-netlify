import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { Button, Box, TextField, Typography } from '@mui/material';
import InputMask from 'react-input-mask';

import { getInputRules } from 'utility/helpers';
import { setItemQuantity } from 'store/reducers/cart/actions';
import { TCounterProps, TFormCountData } from 'components/base/cart/types';
import { inputMasks } from 'constants/patterns';

import styles from './Counter.module.scss';

const Counter: React.FC<TCounterProps> = ({
  item,
  removeCount,
  addCount,
  stockBalance,
}) => {
  const { handleSubmit, control, reset } = useForm<TFormCountData>();
  const dispatch = useDispatch();

  const [isOpenCountModal, setIsOpenCountModal] = useState(false);

  const isItemCountZero = item.count === 0;
  const isItemCountMax = item.count >= stockBalance;

  const onSubmit = handleSubmit((data) => {
    if (data.count) {
      dispatch(
        setItemQuantity({
          slug: item.slug,
          count: data.count,
        }),
      );
    }
    reset({ count: null });
    setIsOpenCountModal(false);
  });

  return (
    <Box className={styles.countContainer}>
      <Box
        component='div'
        className={cn(styles.countModal, {
          [styles.countModalOpen]: isOpenCountModal,
        })}
      >
        <form onSubmit={onSubmit} className={styles.form}>
          <Typography className={styles.titleModal}>
            Введите количество
          </Typography>
          <Controller
            name='count'
            control={control}
            rules={{ ...getInputRules(), max: stockBalance }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <InputMask
                mask={inputMasks.countMask}
                maskPlaceholder={null}
                value={value ? value : ''}
                onChange={onChange}
                autoComplete='off'
              >
                <TextField
                  className={styles.input}
                  variant='outlined'
                  error={Boolean(error)}
                  autoComplete='off'
                />
              </InputMask>
            )}
          />
          <Box className={styles.buttonContainer}>
            <Button
              className={cn(styles.btnSolution, styles.btnAccept)}
              onClick={onSubmit}
            >
              Применить
            </Button>
            <Button
              className={cn(styles.btnSolution, styles.btnReject)}
              onClick={() => setIsOpenCountModal(false)}
            >
              Отмена
            </Button>
          </Box>
        </form>
      </Box>

      <Button
        className={cn(styles.btnCount, styles.btnCountRemove, {
          [styles.btnCountInactive]: isItemCountZero,
        })}
        onClick={() => {
          removeCount(item);
        }}
      >
        -
      </Button>
      <Box
        onClick={() => setIsOpenCountModal(true)}
        component='div'
        className={styles.count}
      >
        {item.count}
      </Box>
      <Box component='div' className={styles.stockBalance}>
        На складе: {stockBalance}
      </Box>
      <Button
        className={cn(styles.btnCount, styles.btnCountAdd, {
          [styles.btnCountInactive]: isItemCountMax,
        })}
        onClick={() => {
          addCount(item);
        }}
      >
        +
      </Button>
    </Box>
  );
};

export { Counter };
