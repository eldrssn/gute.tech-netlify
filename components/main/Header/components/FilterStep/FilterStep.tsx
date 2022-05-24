import React, { FC, useContext, useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import { useController } from 'react-hook-form';
import Step from '@mui/material/Step';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { TailSpin } from 'react-loader-spinner';

import { FilterPopover } from '../FilterPopover';
import { HeaderContext } from '../HeaderContext';
import { FilterStepProps } from './types';
import { HandleClickProps, StepInputs } from '../../types';
import styles from './filterSteps.module.scss';

import colors from 'styles/_export.module.scss';

const loaderColor = colors.blue;

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
  ...restProps
}) => {
  const input = useController({
    name: name,
    control,
    rules: { required: true },
  });
  const { isFullHeader, isTabletView } = useContext(HeaderContext);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isLoadingoptionList, setIsLoadingOptionList] = useState(false);

  const { searchValue, title, slug } = input.field.value;
  const inputNumber = inputStepId + 1;
  const isValue = Boolean(title !== '');
  const isDisable =
    !isValue && currentStep < inputStepId && inputStepId !== StepInputs.BRAND;
  const valueTextField =
    typeof searchValue === 'string' && isOpenPopover ? searchValue : title;

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
    setOpenPopoverId(openPopoverId + 1);
    setCurrentStep(
      inputStepId === StepInputs.ENGINE ? StepInputs.ENGINE : inputStepId + 1,
    );
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
        {...restProps}
      />
      <Step key={name} sx={{ width: '100%' }}>
        <div className={styles.stepWrap}>
          <Box
            className={cn(styles.stepNumber, {
              [styles.stepNumber_shortHeader]: !isFullHeader || isTabletView,
              [styles.stepNumberDisable]: isDisable,
              [styles.stepNumberLoading]: isLoadingoptionList,
            })}
          >
            {isLoadingoptionList ? (
              <TailSpin height={25} width={25} color={loaderColor} />
            ) : isValue ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              inputNumber
            )}
          </Box>
          <TextField
            className={styles.stepField}
            autoComplete='off'
            name={name}
            value={valueTextField}
            onChange={onChangeTextField}
            placeholder={placeholder}
            onClick={() => onClickStep(inputStepId)}
            disabled={isDisable}
          />
        </div>
      </Step>
    </>
  );
};

export { FilterStep };
