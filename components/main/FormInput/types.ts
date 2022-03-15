import { Control, Path } from 'react-hook-form';

import { EPatternTypes } from 'consts/types';

type FormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  label: string;
  patternType: EPatternTypes;
};

export type { FormInputProps };
