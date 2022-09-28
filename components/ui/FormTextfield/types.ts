import { KeyboardEvent } from 'react';
import { UseFormRegister } from 'react-hook-form';

import {
  TFormDataFields,
  FormData,
} from 'components/base/profile/components/UserForm/types';

type FormTextfieldProps = {
  register?: UseFormRegister<FormData>;
  name?: TFormDataFields;
  label: string;
  error?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
  required?: boolean;
  placeholder: string;
  rule?: Record<string, unknown>;
  disabled?: boolean;
  onClick?: () => void;
  errorMessage?: string;
  inputProps?: {
    readOnly: boolean;
  };
  onKeyPress?: (event: KeyboardEvent) => void;
};

export type { FormTextfieldProps };
