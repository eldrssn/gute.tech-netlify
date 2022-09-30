import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputMask from 'react-input-mask';

import {
  addItemQuantity,
  removeItemQuantity,
  setItemQuantity,
} from 'store/reducers/order/actions';
import { getInputRules } from 'utility/helpers';
import { inputMasks } from 'constants/patterns';

import { MIN_COUNT } from './constants';
import { CounterProps, FormCountData } from '../../types';
import styles from './Counter.module.scss';

const Counter: React.FC<CounterProps> = ({ item, stockBalance }) => {
  const { handleSubmit, control, reset } = useForm<FormCountData>();
  const dispatch = useDispatch();

  const [isOpenCountModal, setIsOpenCountModal] = useState(false);

  const isItemCountZero = item.quantity <= 1;
  const isItemCountMax = item.quantity >= stockBalance;

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

  const addCount = () => {
    dispatch(addItemQuantity(item.slug));
  };
  const removeCount = () => {
    dispatch(removeItemQuantity(item.slug));
  };

  const openModal = () => {
    setIsOpenCountModal(true);
  };

  const closeModal = () => {
    setIsOpenCountModal(false);
  };

  return (
    <Box className={styles.countContainer}>
      <Box
        className={cn(styles.modalBackground, {
          [styles.countModalOpen]: isOpenCountModal,
        })}
        onClick={closeModal}
      />
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
            rules={{
              ...getInputRules(),
              max: stockBalance,
              min: MIN_COUNT,
            }}
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
              onClick={closeModal}
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
          removeCount();
        }}
      >
        -
      </Button>
      <Box onClick={openModal} component='div' className={styles.count}>
        {item.quantity}
      </Box>
      <Box component='div' className={styles.stockBalance}>
        На складе: {stockBalance}
      </Box>
      <Button
        className={cn(styles.btnCount, styles.btnCountAdd, {
          [styles.btnCountInactive]: isItemCountMax,
        })}
        onClick={() => {
          addCount();
        }}
      >
        +
      </Button>
    </Box>
  );
};

export { Counter };
