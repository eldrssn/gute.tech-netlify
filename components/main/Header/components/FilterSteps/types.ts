import { FormProps, FilterInputName, StepInputs } from '../../types';

type FilterStepsProps = {
  openPopoverId: StepInputs;
  setOpenPopoverId: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
  setTransportType: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTransportId: React.Dispatch<React.SetStateAction<string | undefined>>;
} & FormProps;

type filterStepsData = {
  name: FilterInputName;
  inputStepId: number;
};

export type { FilterStepsProps, filterStepsData };
