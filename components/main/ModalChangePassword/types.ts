import { ChangePasswordRequestData } from 'api/models/user';

type TOuterProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type TFormData = ChangePasswordRequestData;

export type { TOuterProps, TFormData };
