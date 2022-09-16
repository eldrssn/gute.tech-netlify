import React, { FC, useContext, useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useController } from 'react-hook-form';
import Step from '@mui/material/Step';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from 'components/ui/Loader';
import {
  resetOptionsDataInBrandStep,
  resetOptionsDataInModelStep,
  resetOptionsDataInYearStep,
} from 'store/reducers/transport/actions';
import { useWindowSize } from 'hooks/useWindowSize';
import { selectEngines } from 'store/reducers/transport/selectors';

import { setDefaultValueByName } from './helpers';
import { FilterStepProps } from './types';
import { FilterPopover } from '../FilterPopover';
import { HeaderContext } from '../HeaderContext';
import { namesDefaultValueByStep } from '../../constants';
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
  transportType,
  setTransportType,
  setCurrentTransportId,
  valueForm,
  getValues,
  ...restProps
}) => {
  const dispatch = useDispatch();

  const { isFullHeader } = useContext(HeaderContext);
  const { isTablet } = useWindowSize();
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isLoadingoptionList, setIsLoadingOptionList] = useState(false);

  const input = useController({
    name: name,
    control,
    rules: { required: true },
  });

  const { searchValue, title, slug } = input.field.value;
  const inputNumber = inputStepId + 1;
  const isValue = Boolean(title !== '');
  const isDisable =
    !isValue && currentStep < inputStepId && inputStepId !== StepInputs.BRAND;
  const valueTextField =
    typeof searchValue === 'string' && isOpenPopover ? searchValue : title;

  const { data: engines } = useSelector(selectEngines);

  const resetDataByStep = {
    [StepInputs.BRAND]: () => {
      dispatch(resetOptionsDataInBrandStep());
      const names = namesDefaultValueByStep[StepInputs.BRAND];
      setDefaultValueByName(names, setValue, valueForm);
    },
    [StepInputs.MODEL]: () => {
      dispatch(resetOptionsDataInModelStep());
      const names = namesDefaultValueByStep[StepInputs.MODEL];
      setDefaultValueByName(names, setValue, valueForm);
    },
    [StepInputs.YEAR]: () => {
      dispatch(resetOptionsDataInYearStep());
      const names = namesDefaultValueByStep[StepInputs.YEAR];
      setDefaultValueByName(names, setValue, valueForm);
    },
    [StepInputs.ENGINE]: () => {
      const names = namesDefaultValueByStep[StepInputs.ENGINE];
      setDefaultValueByName(names, setValue, valueForm);
    },
    [StepInputs.INACTIVE]: () => {
      null;
    },
  };

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
    resetDataByStep[inputStepId]();

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
      {isActiveStep && (
        <FilterPopover
          setIsLoadingOptionList={setIsLoadingOptionList}
          openPopoverId={openPopoverId}
          setOpenPopoverId={setOpenPopoverId}
          setIsOpenPopover={setIsOpenPopover}
          isOpenPopover={isOpenPopover}
          inputStepId={inputStepId}
          handleClick={handleClickButton}
          searchValue={searchValue}
          handleClosePopover={handleClosePopover}
          transportType={transportType}
          setTransportType={setTransportType}
          getValues={getValues}
          {...restProps}
        />
      )}
      <Step key={name} sx={{ width: '100%' }}>
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
