import { UseFormSetValue } from 'react-hook-form';
import { TFormData as TFormDataUserForm } from 'components/base/profile/UserForm/types';

type TOuterProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setValue: UseFormSetValue<TFormDataUserForm>;
};

type TFormData = { email: string; code: string };

export type { TOuterProps, TFormData };
