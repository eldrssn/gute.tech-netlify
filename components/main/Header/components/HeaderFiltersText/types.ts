import { FormProps, StepInputs, FormData } from '../../types';
import { UseFormReset } from 'react-hook-form';

type HeaderFiltersTextProps = {
  setTransportType: (transportType: string) => void;
  setCurrentStep: (number: StepInputs) => void;
  reset: UseFormReset<FormData>;
  setCurrentTransportId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
} & FormProps;

export type { HeaderFiltersTextProps };
