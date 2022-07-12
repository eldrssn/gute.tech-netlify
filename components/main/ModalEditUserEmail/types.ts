import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { ProfileResponseData } from 'api/models/user';

type TOuterProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setValue: UseFormSetValue<ProfileResponseData>;
  getValues: UseFormGetValues<ProfileResponseData>;
};

type TFormData = { email: string; code: string };
type TFormDataKeys = keyof TFormData;

export type { TOuterProps, TFormData, TFormDataKeys };
