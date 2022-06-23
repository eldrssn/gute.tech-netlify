import { UseFormSetValue } from 'react-hook-form';
import { TFormData } from 'components/base/profile/UserForm/types';

type TOuterProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setValue: UseFormSetValue<TFormData>;
};

export type { TOuterProps };
