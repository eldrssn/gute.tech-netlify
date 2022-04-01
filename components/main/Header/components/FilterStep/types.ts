import { FormProps, FilterInputName } from '../../types';

export type Props = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  name: FilterInputName;
  currentStep: number;
  step: number;
} & FormProps;
