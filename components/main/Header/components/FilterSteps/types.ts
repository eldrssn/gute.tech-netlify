import { FormProps, FilterInputName } from '../../types';

export type Props = {
  openPopoverId: number;
  setOpenPopoverId: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
} & FormProps;

export type filterStepsData = {
  name: FilterInputName;
  inputStepId: number;
};
