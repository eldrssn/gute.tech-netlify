import { UseFormGetValues } from 'react-hook-form';

import {
  FormProps,
  FilterInputName,
  inputStepId,
  StepInputs,
  WatchFormData,
  FormData,
} from '../../types';

type FilterStepProps = {
  resetFilterForm: () => void;
  openPopoverId: StepInputs;
  setOpenPopoverId: React.Dispatch<React.SetStateAction<number>>;
  name: FilterInputName;
  inputStepId: inputStepId;
  currentStep: StepInputs;
  setCurrentStep: (currentStep: number) => void;
  placeholder: string;
  transportType: string;
  setTransportType: React.Dispatch<React.SetStateAction<string>>;
  setCurrentTransportId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  valueForm: WatchFormData | undefined;
  getValues: UseFormGetValues<FormData>;
} & FormProps;

export type { FilterStepProps };
