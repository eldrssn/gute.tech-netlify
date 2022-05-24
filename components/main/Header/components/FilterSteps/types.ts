import { FormProps, FilterInputName, StepInputs } from '../../types';

type FilterStepsProps = {
  openPopoverId: StepInputs;
  setOpenPopoverId: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
} & FormProps;

type filterStepsData = {
  name: FilterInputName;
  inputStepId: number;
};

export type { FilterStepsProps, filterStepsData };
