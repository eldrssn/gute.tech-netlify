import { FormProps, FilterInputName } from '../../types';

export type Props = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  name: FilterInputName;
  inputStepId: number;
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
  placeholder: string;
} & FormProps;
