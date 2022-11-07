import React, { FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useController } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import TextField from '@mui/material/TextField';
import Step from '@mui/material/Step';
import Box from '@mui/material/Box';
import classnames from 'classnames/bind';

import { Loader } from 'components/ui/Loader';
import {
  resetOptionsDataInBrandStep,
  resetOptionsDataInModelStep,
  resetOptionsDataInYearStep,
  setTransportYear,
} from 'store/reducers/transport/actions';
import { useWindowSize } from 'hooks/useWindowSize';
import { selectEngines } from 'store/reducers/transport/selectors';
import { CookieKey } from 'constants/types';
import { COOKIE_TTL } from 'constants/variables';

import { FilterStepProps } from './types';
import { FilterPopover } from '../FilterPopover';
import { HeaderContext } from '../HeaderContext';
import { setDefaultValueByName } from '../../helpers';
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
  getValues,
  ...restProps
}) => {
  const dispatch = useDispatch();

  const [, setCookieTransportYear] = useCookies();
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
  const isDisable = !isValue && currentStep < inputStepId;
  const valueTextField =
    typeof searchValue === 'string' && isOpenPopover ? searchValue : title;

  const { data: engines } = useSelector(selectEngines);

  const resetDataByStep = {
    [StepInputs.BRAND]: () => {
      dispatch(resetOptionsDataInBrandStep());
      const names = namesDefaultValueByStep[StepInputs.BRAND];
      setDefaultValueByName(names, setValue);
    },
    [StepInputs.MODEL]: () => {
      dispatch(resetOptionsDataInModelStep());
      const names = namesDefaultValueByStep[StepInputs.MODEL];
      setDefaultValueByName(names, setValue);
    },
    [StepInputs.YEAR]: () => {
      dispatch(resetOptionsDataInYearStep());
      const names = namesDefaultValueByStep[StepInputs.YEAR];
      setDefaultValueByName(names, setValue);
    },
    [StepInputs.ENGINE]: () => {
      const names = namesDefaultValueByStep[StepInputs.ENGINE];
      setDefaultValueByName(names, setValue);
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
    setIsOpenPopover(true);
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

    if (inputStepId === StepInputs.YEAR) {
      dispatch(setTransportYear(slug));

      const date = new Date();
      date.setTime(date.getTime() + COOKIE_TTL);

      setCookieTransportYear(CookieKey.TRANSPORT_YEAR, slug, {
        path: '/',
        expires: date,
      });
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
          onFocus={() => onClickStep(inputStepId)}
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
    </Step>
  );
};

export { FilterStep };
