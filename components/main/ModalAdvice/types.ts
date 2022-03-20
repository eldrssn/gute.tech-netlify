type TOuterProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type TFormData = {
  nameValue: string;
  phoneNumber: string;
};

export type { TFormData, TOuterProps };
