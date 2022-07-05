import { UseFormRegister } from 'react-hook-form';

import {
  TFormData,
  TFormDataFields,
} from 'components/base/profile/UserForm/types';

type FormTextfieldProps = {
  register: UseFormRegister<TFormData>;
  name: TFormDataFields;
  label: string;
  error?: boolean;
  onChange?: () => Promise<void>;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
  required?: boolean;
  placeholder: string;
  rule?: Record<string, unknown>;
  disabled?: boolean;
  onClick?: () => void;
  errorMessage?: string;
};

export type { FormTextfieldProps };
