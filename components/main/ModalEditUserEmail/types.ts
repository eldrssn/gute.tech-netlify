import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { FormData } from 'components/base/profile/components/UserForm/types';

type TOuterProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setValue: UseFormSetValue<FormData>;
  getValues: UseFormGetValues<FormData>;
};

type TFormData = { email: string; code: string };
type TFormDataKeys = keyof TFormData;

export type { TOuterProps, TFormData, TFormDataKeys };
