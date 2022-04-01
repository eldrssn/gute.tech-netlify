import { FormProps, FilterInputName } from '../../types';

export type Props = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
} & FormProps;

export type filterStepsData = {
  name: FilterInputName;
  step: number;
};

export enum StepInputs {
  BRAND = 0,
  MODEL = 1,
  YEAR = 2,
  ENGINE = 3,
}
