import { UseFormGetValues } from 'react-hook-form';

import {
  FormProps,
  FilterInputName,
  StepInputs,
  WatchFormData,
  FormData,
} from '../../types';

type FilterStepsProps = {
  resetFilterFormFromBrand: () => void;
  openPopoverId: StepInputs;
  setOpenPopoverId: React.Dispatch<React.SetStateAction<number>>;
  currentStep: StepInputs;
  setCurrentStep: (currentStep: number) => void;
  transportType: string;
  setTransportType: React.Dispatch<React.SetStateAction<string>>;
  setCurrentTransportId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  valueForm: WatchFormData | undefined;
  getValues: UseFormGetValues<FormData>;
} & FormProps;

type filterStepsData = {
  name: FilterInputName;
  inputStepId: number;
};

export type { FilterStepsProps, filterStepsData };
