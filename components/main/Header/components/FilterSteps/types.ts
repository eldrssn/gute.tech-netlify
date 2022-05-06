import { FormProps, FilterInputName } from '../../types';

type FilterStepsProps = {
  openPopoverId: number;
  setOpenPopoverId: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
} & FormProps;

type filterStepsData = {
  name: FilterInputName;
  inputStepId: number;
};

export type { FilterStepsProps, filterStepsData };
