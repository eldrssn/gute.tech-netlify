import {
  FormProps,
  FilterInputName,
  inputStepId,
  StepInputs,
} from '../../types';

type FilterStepProps = {
  openPopoverId: StepInputs;
  setOpenPopoverId: React.Dispatch<React.SetStateAction<number>>;
  name: FilterInputName;
  inputStepId: inputStepId;
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
  placeholder: string;
  setTransportType: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTransportId: React.Dispatch<React.SetStateAction<string | undefined>>;
} & FormProps;

export type { FilterStepProps };
