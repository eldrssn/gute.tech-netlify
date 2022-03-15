import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

import { CitiesOption } from 'mock/CitiesOption';

import ModalComponent from 'components/main/Modal';
import FormInput from 'components/main/FormInput';

import { EPatternTypes } from 'consts/types';

import { TCitiesOption, TFormData } from './types';

import styles from './styles.module.css';

const ModalCity: React.FC = () => {
  const { watch, control, reset } = useForm<TFormData>({
    defaultValues: {
      cityName: '',
    },
  });
  const [desiredСity, setDesiredСity] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const filterCitiesOption = (CitiesOption: TCitiesOption) => {
    const searchedRegionOptions = CitiesOption.regions.filter((region) =>
      region.cities.some(({ cityName }) => cityName.indexOf(desiredСity) >= 0),
    );
    const searchedCityOption = searchedRegionOptions.map((region) => {
      const filteredCity = region.cities.filter(
        ({ cityName }) => cityName.indexOf(desiredСity) >= 0,
      );

      return { ...region, cities: filteredCity };
    });

    return searchedCityOption;
  };

  const searchedCitiesOption = filterCitiesOption(CitiesOption);
  const closeModal = () => {
    setIsOpen(false);
  };
  const resetInput = () => {
    reset({ cityName: '' });
  };

  useEffect(() => {
    const subscription = watch((value) => {
      setDesiredСity(value.cityName);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  return (
    <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
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
            <FormInput<TFormData>
              name='cityName'
              control={control}
              label='Введите название города'
              patternType={EPatternTypes.ANY}
            />
            <Box className={styles.resetField} onClick={resetInput}>
              <FontAwesomeIcon icon={faTimes} />
            </Box>
          </Box>
          <Box component='div' className={styles.regions}>
            {searchedCitiesOption.map((region) => {
              return (
                <Box component='div' className={styles.region} key={region.id}>
                  <Typography className={styles.regionTitle}>
                    {region.regionName}
                  </Typography>
                  <List>
                    {region.cities.map((city) => {
                      return (
                        <ListItemButton key={city.id}>
                          {/* TODO: диспач id */}
                          {city.cityName}
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </ModalComponent>
  );
};

export default ModalCity;
