import React, { useState, useEffect } from 'react';
import { useForm, useController } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import {
  Container,
  Box,
  Typography,
  Divider,
  List,
  ListItemButton,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Loader } from 'components/ui/Loader';
import { ModalWrapper } from 'components/main/ModalWrapper';
import { FormInput } from 'components/main/FormInput';
import { filterRegionsOption } from 'utility/helpers';
import { selectBranches } from 'store/reducers/regions/selectors';
import { setCitySlug } from 'store/reducers/regions/actions';

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

  const selectCity = (slug: string) => {
    dispatch(setCitySlug(slug));
    reset({ cityName: '' });
  };

  useEffect(() => {
    setDesiredСity(cityInput.field.value);
  }, [cityInput.field.value]);

  const regionsClassName = cn({ [styles.loader]: isLoading }, styles.regions);

  return (
    <ModalWrapper isOpen={isOpen} setIsOpen={closeModal}>
      <Container fixed sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box component='div' className={styles.container}>
          <Box className={styles.closeModal} onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
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
            />
            <Box className={styles.resetField} onClick={resetInput}>
              <FontAwesomeIcon icon={faTimes} />
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
                  <ListItemButton
                    className={styles.regionTitle}
                    onClick={() => {
                      selectCity(region.slug);
                      closeModal();
                    }}
                  >
                    {region.title}
                  </ListItemButton>
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
