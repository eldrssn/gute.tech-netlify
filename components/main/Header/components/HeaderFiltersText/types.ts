import { FormProps, StepInputs, FormData } from '../../types';
import { UseFormReset } from 'react-hook-form';

type HeaderFiltersTextProps = {
  setTransportType: (transportType: string) => void;
  setCurrentStep: (number: StepInputs) => void;
  reset: UseFormReset<FormData>;
} & FormProps;

export type { HeaderFiltersTextProps };
