import React, { useState, useEffect, KeyboardEvent } from 'react';
import { useForm, useController } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

import { CloseIcon } from 'components/ui/CloseIcon';
import { Loader } from 'components/ui/Loader';
import { ModalWrapper } from 'components/main/ModalWrapper';
import { FormInput } from 'components/main/FormInput';
import { filterRegionsOption } from 'utility/helpers';
import { handleEnterPress } from 'utility/utils';
import { selectBranches } from 'store/reducers/regions/selectors';
import { setBranchId, setCitySlug } from 'store/reducers/regions/actions';

import { TFormData, OuterProps } from './types';
import styles from './styles.module.scss';

const ModalCity: React.FC<OuterProps> = ({ isOpen, setIsOpen }) => {
  const { control, reset } = useForm<TFormData>();
  const [desiredСity, setDesiredСity] = useState<string>('');
  const dispatch = useDispatch();
  const cityInput = useController({
    name: 'cityName',
    control,
    rules: {
      required: 'Обязательное поле',
    },
  });
  const { data, isLoading } = useSelector(selectBranches);

  const searchedRegionsOption = filterRegionsOption(data, desiredСity);

  const closeModal = () => {
    setIsOpen(false);
    reset({ cityName: '' });
  };

  const resetInput = () => {
    reset({ cityName: '' });
  };

  const selectBranch = (branchId: number, slugCity: string) => {
    dispatch(setCitySlug(slugCity));
    dispatch(setBranchId(branchId));
    reset({ cityName: '' });
  };

  useEffect(() => {
    setDesiredСity(cityInput.field.value);
  }, [cityInput.field.value]);

  const handlePress = (event: KeyboardEvent) =>
    handleEnterPress(event, closeModal);

  const regionsClassName = cn({ [styles.loader]: isLoading }, styles.regions);

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={closeModal}
      modalTitle='city'
      initialFocus='#enter-city'
    >
      <Container fixed sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box component='div' className={styles.container}>
          <Box
            className={styles.closeModal}
            onClick={closeModal}
            onKeyPress={handlePress}
            tabIndex={0}
          >
            <CloseIcon />
          </Box>
          <Typography
            className={styles.title}
            id='modal-modal-title'
            variant='h6'
            component='h2'
            mb={1}
          >
            ВЫБОР ГОРОДА
          </Typography>
          <Divider className={styles.divider} />
          <Box className={styles.inputContainer}>
            <FormInput
              helperText={cityInput.fieldState.error?.message}
              onChange={cityInput.field.onChange}
              value={cityInput.field.value}
              label='Введите город'
              isError={Boolean(cityInput.fieldState.error)}
              id='enter-city'
            />
            <Box className={styles.resetField} onClick={resetInput}>
              <CloseIcon fillColor='black' />
            </Box>
          </Box>
          <Box component='div' className={regionsClassName}>
            {isLoading ? (
              <Loader size={60} />
            ) : (
              searchedRegionsOption.map((region) => (
                <List
                  component='div'
                  className={styles.region}
                  key={region.title}
                >
                  <Typography className={styles.regionTitle}>
                    {region.title}
                  </Typography>
                  {region.branches.map((branch) => (
                    <List
                      component='div'
                      className={styles.region}
                      key={branch.street}
                    >
                      <ListItemButton
                        className={styles.branch}
                        onClick={() => {
                          selectBranch(branch.id, region.slug);
                          closeModal();
                        }}
                      >
                        {branch.street}
                      </ListItemButton>
                    </List>
                  ))}
                </List>
              ))
            )}
          </Box>
        </Box>
      </Container>
    </ModalWrapper>
  );
};

export { ModalCity };
