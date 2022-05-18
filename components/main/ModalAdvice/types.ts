type TOuterProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type TFormData = {
  nameValue: string | null;
  phoneNumber: string | null;
  message: string | null;
};

export type { TFormData, TOuterProps };
