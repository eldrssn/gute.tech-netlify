import React, { FC, useContext, useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useController } from 'react-hook-form';
import Step from '@mui/material/Step';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';

import { useWindowSize } from 'hooks/useWindowSize';
import {
  selectBrands,
  selectEngines,
} from 'store/reducers/transport/selectors';
import { fetchBrands } from 'store/reducers/transport/actions';
import { Loader } from 'components/ui/Loader';

import { FilterPopover } from '../FilterPopover';
import { HeaderContext } from '../HeaderContext';
import { FilterStepProps } from './types';
import { HandleClickProps, StepInputs } from '../../types';

import styles from './filterStep.module.scss';

const cn = classnames.bind(styles);

const FilterStep: FC<FilterStepProps> = ({
  openPopoverId,
  name,
  control,
  inputStepId,
  currentStep,
  placeholder,
  setOpenPopoverId,
  setValue,
  setCurrentStep,
  setTransportType,
  setCurrentTransportId,
  ...restProps
}) => {
  const dispatch = useDispatch();

  const input = useController({
    name: name,
    control,
    rules: { required: true },
  });
  const { isFullHeader } = useContext(HeaderContext);
  const { isTablet } = useWindowSize();
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isLoadingoptionList, setIsLoadingOptionList] = useState(false);

  const { searchValue, title, slug } = input.field.value;
  const inputNumber = inputStepId + 1;
  const isValue = Boolean(title !== '');
  const isDisable =
    !isValue && currentStep < inputStepId && inputStepId !== StepInputs.BRAND;
  const valueTextField =
    typeof searchValue === 'string' && isOpenPopover ? searchValue : title;

  const { data: engines } = useSelector(selectEngines);
  const { data: brands } = useSelector(selectBrands);

  useEffect(() => {
    setIsOpenPopover(openPopoverId === inputStepId);
  }, [openPopoverId, inputStepId]);

  const onClickStep = (inputStepId: number) => {
    if (!isDisable) {
      setOpenPopoverId(inputStepId);
    }
  };

  const handleClickButton = ({
    title,
    slug,
    inputStepId,
  }: HandleClickProps) => {
    setValue(name, { title, slug, searchValue: null });

    if (inputStepId === StepInputs.ENGINE) {
      const currentEngine = engines.find((engine) => engine.slug === slug);
      setCurrentTransportId(currentEngine?.transport_id);
    }

    setCurrentStep(
      inputStepId === StepInputs.ENGINE ? inputStepId : inputStepId + 1,
    );
    setOpenPopoverId(openPopoverId + 1);
  };

  const handleClosePopover = () => {
    setOpenPopoverId(StepInputs.INACTIVE);
    setValue(name, { title, slug, searchValue: null });
  };

  const onChangeTextField = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setCurrentStep(inputStepId);
    setValue(name, { title, slug, searchValue: event.target.value });
  };

  const handleLoadBrands = () => {
    if (brands.length > 0) {
      return;
    }

    dispatch(fetchBrands());
  };

  const handleClickCaret = () => {
    if (isActiveStep) {
      handleClosePopover();
      return;
    }

    onClickStep(inputStepId);
  };

  const isActiveStep = inputStepId === openPopoverId;

  return (
    <>
      <FilterPopover
        setIsLoadingOptionList={setIsLoadingOptionList}
        setOpenPopoverId={setOpenPopoverId}
        openPopoverId={openPopoverId}
        setIsOpenPopover={setIsOpenPopover}
        isOpenPopover={isOpenPopover}
        inputStepId={inputStepId}
        handleClick={handleClickButton}
        searchValue={searchValue}
        handleClosePopover={handleClosePopover}
        setTransportType={setTransportType}
        {...restProps}
      />
      <Step key={name} sx={{ width: '100%' }} onFocus={handleLoadBrands}>
        <div className={styles.stepWrap}>
          <Box
            className={cn(styles.stepNumber, {
              [styles.stepNumber_shortHeader]: !isFullHeader || isTablet,
              [styles.stepNumberDisable]: isDisable,
              [styles.stepNumberLoading]: isLoadingoptionList,
            })}
          >
            {isLoadingoptionList ? (
              <Loader size={25} />
            ) : isValue ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <span
                className={cn(styles.stepNumber_number, {
                  [styles.stepNumber_numberOne]: inputNumber === 1,
                })}
              >
                {inputNumber}
              </span>
            )}
          </Box>
          <TextField
            className={styles.stepField}
            autoComplete='off'
            inputProps={{ type: 'text' }}
            name={name}
            value={valueTextField}
            onChange={onChangeTextField}
            placeholder={placeholder}
            onClick={() => onClickStep(inputStepId)}
            disabled={isDisable}
          />
          {!isDisable && (
            <FontAwesomeIcon
              onClick={handleClickCaret}
              className={cn(styles.caret, {
                [styles.caretActive]: isActiveStep,
              })}
              icon={faCaretDown}
            />
          )}
        </div>
      </Step>
    </>
  );
};

export { FilterStep };
