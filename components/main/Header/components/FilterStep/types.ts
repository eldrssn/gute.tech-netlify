import { FormProps, FilterInputName, inputStepId } from '../../types';

export type Props = {
  openPopoverId: number;
  setOpenPopoverId: React.Dispatch<React.SetStateAction<number>>;
  name: FilterInputName;
  inputStepId: inputStepId;
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
  placeholder: string;
} & FormProps;
