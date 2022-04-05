import { FormProps, FilterInputName, inputStepId } from '../../types';

export type Props = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  name: FilterInputName;
  inputStepId: inputStepId;
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
  placeholder: string;
} & FormProps;
