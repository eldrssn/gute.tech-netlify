import React, { useState, useEffect, KeyboardEvent } from 'react';
import { useForm, useController } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Map, Placemark } from '@pbe/react-yandex-maps';

import cn from 'classnames';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { getBranches, getBranch } from 'utility/helpers';

import { CloseIcon } from 'components/ui/CloseIcon';
import { CustomButton } from 'components/ui/CustomButton';
import { Loader } from 'components/ui/Loader';
import { ModalWrapper } from 'components/main/ModalWrapper';
import { FormInput } from 'components/main/FormInput';
import { filterRegionsOption } from 'utility/helpers';
import { handleEnterPress } from 'utility/utils';
import {
  selectBranches,
  selectSelectedBranchId,
  selectSelectedCitySlug,
} from 'store/reducers/regions/selectors';
import { setBranchId, setCitySlug } from 'store/reducers/regions/actions';

import { moscowGeoData } from './constants';
import { TFormData, OuterProps } from './types';
import styles from './styles.module.scss';

const ModalCity: React.FC<OuterProps> = ({ isOpen, setIsOpen }) => {
  const { control, reset } = useForm<TFormData>();
  const [geoData, setGeoData] = useState(moscowGeoData);
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
  const selectedBranchId = useSelector(selectSelectedBranchId);
  const selectedCitySlug = useSelector(selectSelectedCitySlug);

  const selectedBranches = getBranches(data, selectedCitySlug);
  const selectedBranch = getBranch(
    selectedBranches?.branches,
    selectedBranchId,
  );

  const selectedCityTitle = selectedBranches?.title;
  const selectedBranchStreet = selectedBranch?.street;

  const selectedCity = data.find((branch) => branch.slug === selectedCitySlug);

  useEffect(() => {
    if (!selectedCity) {
      setGeoData(moscowGeoData);
      return;
    }

    const selectedBranch = selectedCity.branches.find(
      (branch) => branch.id === selectedBranchId,
    );

    if (!selectedBranch) {
      setGeoData(moscowGeoData);
      return;
    }

    const longitude = Number(selectedBranch.longitude);
    const latitude = Number(selectedBranch.latitude);

    if (!longitude || !latitude) {
      setGeoData(moscowGeoData);
      return;
    }

    setGeoData([latitude, longitude]);
  }, [selectedBranchId, data, selectedCitySlug, selectedCity]);

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
      <Box className={styles.container}>
        <Box
          className={styles.closeModal}
          onClick={closeModal}
          onKeyPress={handlePress}
          tabIndex={0}
        >
          <CloseIcon />
        </Box>
        <Box component='div' className={styles.list}>
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
                        }}
                      >
                        <Box className={styles.branchInfo}>
                          <Typography className={styles.branchTitle}>
                            {branch.title}
                          </Typography>
                          <Typography className={styles.branchStreet}>
                            {branch.street}
                          </Typography>
                        </Box>
                      </ListItemButton>
                    </List>
                  ))}
                </List>
              ))
            )}
          </Box>
        </Box>
        <Box className={styles.mapBox}>
          <Map
            state={{ center: geoData, zoom: 9 }}
            className={styles.map}
            duration={1000}
          >
            {selectedCity?.branches.map((branch) => {
              const longitude = Number(branch.longitude);
              const latitude = Number(branch.latitude);

              return (
                <Placemark
                  onClick={() => dispatch(setBranchId(branch.id))}
                  modules={['geoObject.addon.balloon']}
                  key={latitude}
                  geometry={[latitude, longitude]}
                  properties={{
                    iconContent: branch.title,
                  }}
                  options={{
                    preset: 'islands#blueStretchyIcon',
                  }}
                />
              );
            })}
          </Map>
          <Typography className={styles.adress}>
            Адрес филиала: {selectedCityTitle}, {selectedBranchStreet}
          </Typography>
          <CustomButton
            onClick={() => {
              closeModal();
            }}
          >
            Подтвердить
          </CustomButton>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export { ModalCity };
