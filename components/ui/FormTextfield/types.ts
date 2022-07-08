import { UseFormRegister } from 'react-hook-form';

import { TFormDataFields } from 'components/base/profile/UserForm/types';
import { ProfileResponseData } from 'api/models/user';

type FormTextfieldProps = {
  register?: UseFormRegister<ProfileResponseData>;
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
};

export type { FormTextfieldProps };
